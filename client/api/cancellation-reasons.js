// Cancellation Reasons Constants
// These are used for structured cancellation reason selection

const CUSTOMER_CANCELLATION_REASONS = [
  { value: 'schedule_changed', label: 'Schedule changed' },
  { value: 'no_longer_needed', label: 'No longer needed' },
  { value: 'booked_by_mistake', label: 'Booked by mistake' },
  { value: 'found_another_provider', label: 'Found another provider' },
  { value: 'other', label: 'Other' }
];

const PROFESSIONAL_CANCELLATION_REASONS = [
  { value: 'emergency', label: 'Emergency' },
  { value: 'not_available', label: 'Not available' },
  { value: 'outside_coverage_area', label: 'Outside coverage area' },
  { value: 'safety_concern', label: 'Safety concern' },
  { value: 'other', label: 'Other' }
];

const RESCHEDULE_REASONS = [
  { value: 'schedule_conflict', label: 'Schedule conflict' },
  { value: 'emergency', label: 'Emergency' },
  { value: 'weather', label: 'Weather conditions' },
  { value: 'other', label: 'Other' }
];

module.exports = {
  CUSTOMER_CANCELLATION_REASONS,
  PROFESSIONAL_CANCELLATION_REASONS,
  RESCHEDULE_REASONS
};
