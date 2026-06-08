const express = require('express');
const router = express.Router();
const { getDb } = require('../middleware/db.js');
const { requireAuth } = require('../middleware/auth.js');

// GET /api/withdrawals - Get withdrawal requests for current professional
router.get('/', requireAuth, async (req, res) => {
  try {
    const sql = getDb();
    const user = req.user;

    if (user.type !== 'professional') {
      return res.status(403).json({ success: false, error: 'Only professionals can view withdrawals' });
    }

    const withdrawals = await sql`
      SELECT w.*, u.name as professional_name
      FROM withdrawals w
      JOIN users u ON u.id = w.professional_id
      WHERE w.professional_id = ${user.id}
      ORDER BY w.created_at DESC
    `;

    return res.status(200).json({ success: true, withdrawals });
  } catch (err) {
    console.error('Withdrawals get error:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/withdrawals/summary - Get withdrawal summary for professional
router.get('/summary', requireAuth, async (req, res) => {
  try {
    const sql = getDb();
    const user = req.user;

    if (user.type !== 'professional') {
      return res.status(403).json({ success: false, error: 'Only professionals can view withdrawal summary' });
    }

    // Calculate available balance from completed transactions (payout type)
    const completedPayouts = await sql`
      SELECT COALESCE(SUM(amount), 0) as total
      FROM transactions
      WHERE payee_id = ${user.id} AND type = 'payout' AND status = 'completed'
    `;

    // Calculate pending withdrawals
    const pendingWithdrawals = await sql`
      SELECT COALESCE(SUM(amount), 0) as total
      FROM withdrawals
      WHERE professional_id = ${user.id} AND status = 'pending'
    `;

    // Calculate paid withdrawals
    const paidWithdrawals = await sql`
      SELECT COALESCE(SUM(amount), 0) as total
      FROM withdrawals
      WHERE professional_id = ${user.id} AND status = 'paid'
    `;

    const availableBalance = parseFloat(completedPayouts[0].total) - parseFloat(pendingWithdrawals[0].total);

    return res.status(200).json({
      success: true,
      summary: {
        availableBalance: availableBalance,
        pendingAmount: parseFloat(pendingWithdrawals[0].total),
        paidAmount: parseFloat(paidWithdrawals[0].total),
      }
    });
  } catch (err) {
    console.error('Withdrawals summary error:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/withdrawals - Create withdrawal request
router.post('/', requireAuth, async (req, res) => {
  try {
    const sql = getDb();
    const user = req.user;
    const { amount, method, account_name, account_number, bank_name } = req.body;

    if (user.type !== 'professional') {
      return res.status(403).json({ success: false, error: 'Only professionals can request withdrawals' });
    }

    if (!amount || amount <= 0) {
      return res.status(400).json({ success: false, error: 'Amount must be greater than 0' });
    }

    if (!account_name || !account_number || !bank_name) {
      return res.status(400).json({ success: false, error: 'Bank details are required' });
    }

    // Calculate available balance
    const completedPayouts = await sql`
      SELECT COALESCE(SUM(amount), 0) as total
      FROM transactions
      WHERE payee_id = ${user.id} AND type = 'payout' AND status = 'completed'
    `;

    const pendingWithdrawals = await sql`
      SELECT COALESCE(SUM(amount), 0) as total
      FROM withdrawals
      WHERE professional_id = ${user.id} AND status = 'pending'
    `;

    const availableBalance = parseFloat(completedPayouts[0].total) - parseFloat(pendingWithdrawals[0].total);

    if (amount > availableBalance) {
      return res.status(400).json({ success: false, error: 'Insufficient balance. Available: RM ' + availableBalance.toFixed(2) });
    }

    // Create withdrawal request
    await sql`
      INSERT INTO withdrawals (
        id, professional_id, amount, method, account_name, account_number, bank_name, status
      ) VALUES (
        gen_random_uuid()::text, ${user.id}, ${amount}, ${method || 'bank_transfer'}, 
        ${account_name}, ${account_number}, ${bank_name}, 'pending'
      )
    `;

    return res.status(201).json({
      success: true,
      message: 'Withdrawal request submitted successfully'
    });
  } catch (err) {
    console.error('Withdrawals create error:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/withdrawals/admin - Admin gets all withdrawal requests
router.get('/admin', async (req, res) => {
  try {
    const sql = getDb();
    const withdrawals = await sql`
      SELECT w.*, u.name as professional_name, u.email as professional_email
      FROM withdrawals w
      JOIN users u ON u.id = w.professional_id
      ORDER BY w.created_at DESC
    `;
    return res.status(200).json({ success: true, withdrawals });
  } catch (err) {
    console.error('Withdrawals admin error:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

// PUT /api/withdrawals/:id - Admin approves/rejects/marks paid
router.put('/:id', async (req, res) => {
  try {
    const sql = getDb();
    const { id } = req.params;
    const { action, admin_note } = req.body;

    if (!action || !['approve', 'reject', 'mark_paid'].includes(action)) {
      return res.status(400).json({ success: false, error: 'Invalid action' });
    }

    const withdrawal = await sql`SELECT * FROM withdrawals WHERE id = ${id}`;
    if (withdrawal.length === 0) {
      return res.status(404).json({ success: false, error: 'Withdrawal not found' });
    }

    if (action === 'approve') {
      await sql`
        UPDATE withdrawals SET 
          status = 'approved',
          admin_note = ${admin_note || ''},
          updated_at = NOW()
        WHERE id = ${id}
      `;
      return res.status(200).json({ success: true, message: 'Withdrawal approved' });
    } else if (action === 'reject') {
      await sql`
        UPDATE withdrawals SET 
          status = 'rejected',
          admin_note = ${admin_note || ''},
          updated_at = NOW()
        WHERE id = ${id}
      `;
      return res.status(200).json({ success: true, message: 'Withdrawal rejected' });
    } else if (action === 'mark_paid') {
      await sql`
        UPDATE withdrawals SET 
          status = 'paid',
          admin_note = ${admin_note || ''},
          updated_at = NOW()
        WHERE id = ${id}
      `;
      return res.status(200).json({ success: true, message: 'Withdrawal marked as paid' });
    }

    return res.status(400).json({ success: false, error: 'Invalid action' });
  } catch (err) {
    console.error('Withdrawals update error:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
