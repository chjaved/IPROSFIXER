// Default cleaning checklist templates based on service category
const CHECKLIST_TEMPLATES = {
  cleaning: [
    { title: 'Sweep floors', required: true },
    { title: 'Mop floors', required: true },
    { title: 'Dust surfaces', required: true },
    { title: 'Clean mirrors', required: true },
    { title: 'Empty trash', required: true },
    { title: 'Final inspection', required: true },
  ],
  deep_cleaning: [
    { title: 'Deep floor cleaning', required: true },
    { title: 'Kitchen degreasing', required: true },
    { title: 'Bathroom sanitizing', required: true },
    { title: 'Window cleaning', required: true },
    { title: 'Dusting all surfaces', required: true },
    { title: 'Final inspection', required: true },
  ],
  post_renovation: [
    { title: 'Dust removal', required: true },
    { title: 'Floor cleaning', required: true },
    { title: 'Surface wipe down', required: true },
    { title: 'Debris collection', required: true },
    { title: 'Final inspection', required: true },
  ],
  repair: [
    { title: 'Diagnosis completed', required: true },
    { title: 'Repair work completed', required: true },
    { title: 'Safety check performed', required: true },
    { title: 'Area cleaned up', required: true },
    { title: 'Final inspection', required: true },
  ],
  maid: [
    { title: 'General cleaning', required: true },
    { title: 'Dusting', required: true },
    { title: 'Mopping', required: true },
    { title: 'Kitchen cleaning', required: true },
    { title: 'Bathroom cleaning', required: true },
    { title: 'Final inspection', required: true },
  ],
  laundry: [
    { title: 'Items sorted', required: true },
    { title: 'Washing completed', required: true },
    { title: 'Drying completed', required: true },
    { title: 'Folding completed', required: true },
    { title: 'Quality check', required: true },
  ],
  care: [
    { title: 'Personal care provided', required: true },
    { title: 'Medication administered', required: false },
    { title: 'Meal preparation', required: false },
    { title: 'Hygiene assistance', required: true },
    { title: 'Safety check performed', required: true },
  ],
};

function getTemplateForService(serviceSlug, serviceCategory) {
  // Map service slugs to template types
  const slugToTemplate = {
    'home-deep-cleaning': 'deep_cleaning',
    'sofa-carpet-clean': 'deep_cleaning',
    'post-event-cleanup': 'post_renovation',
    'ac-service-repair': 'repair',
    'electrical-works': 'repair',
    'plumbing-repair': 'repair',
    'appliance-repair': 'repair',
    'part-time-maid': 'maid',
    'laundry-service': 'laundry',
    'caregiver': 'care',
  };

  const templateType = slugToTemplate[serviceSlug] || serviceCategory;
  return CHECKLIST_TEMPLATES[templateType] || CHECKLIST_TEMPLATES.cleaning;
}

module.exports = { CHECKLIST_TEMPLATES, getTemplateForService };
