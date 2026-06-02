module.exports = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.json({ success: true, message: 'iPROFIXER API is running', timestamp: new Date().toISOString() });
};
