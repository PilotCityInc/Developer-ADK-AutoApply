// export const HEADER = [
//   { text: 'Activity or Deliverable', align: 'start', value: 'activities', width: '10%' },
//   { text: 'Completion Strength', align: 'start', value: 'strength', width: '70%' },
//   { text: 'Edit', align: 'start', value: 'edit', sortable: false, width: '10%' }
// ];

// export const items = [
//   { activities: 'Demo Video' },
//   { activities: 'Process Log' },
//   { activities: 'Research' },
//   { activities: 'Train' },
//   { activities: 'RFP' }
// ];

export const HEADER = [
  { text: 'Group', align: 'center', value: 'group', sortable: false, width: '10%' },
  { text: 'Order', align: 'center', value: 'index', sortable: false, width: '5%' },

  { text: 'Activity', align: 'start', value: 'activity', sortable: false, width: '45%' },

  { text: 'Type', align: 'center', value: 'type', sortable: false, width: '15%' },

  { text: 'Status', align: 'center', value: 'status', sortable: false, width: '5%' },

  { text: 'Update', align: 'center', value: 'click', sortable: false, width: '20%' }
];

export const items = [
  {
    // need to ask
    index: '1',
    activity: 'Join',
    completion: '100%',
    updated: 'Today at 7:30pm',
    type: 'Activities',
    group: 'Research'
  },
  {
    index: '2',
    activity: 'Request for Projects',
    completion: '100%',
    updated: 'Yesterday at 12:30pm',
    type: 'Activities',
    group: 'Research'
  },
  {
    // need to ask
    index: '3',
    activity: 'Team',
    completion: '100%',
    updated: 'Jul 12 at 3:30pm',
    type: 'Activities',
    group: 'Research'
  },
  {
    index: '4',
    activity: 'Discord',
    completion: '100%',
    updated: 'Oct 10 at 7:30pm',
    type: 'Activities',
    group: 'Research'
  },
  {
    index: '5',
    activity: 'Train',
    completion: '100%',
    updated: 'Oct 15 at 3:30pm',
    type: 'Activities',
    group: 'Research'
  },
  {
    index: '6',
    activity: 'Research',
    completion: '100%',
    updated: 'Oct 16 at 3:30pm',
    type: 'Activities',
    group: 'Research'
  },
  {
    index: '7',
    activity: 'Practice',
    completion: '0%',
    updated: 'Oct 2 at 7:30pm',
    type: 'Activities',
    group: 'Research'
  },
  {
    index: '8',
    activity: 'Ideate',
    completion: '0%',
    updated: 'Oct 23 at 9:30pm',
    type: 'Deliverables',
    group: 'Research'
  },
  {
    index: '9',
    activity: 'Pitches',
    completion: '0%',
    updated: 'Oct 5 at 8:30pm',
    type: 'Deliverables',
    group: 'Design'
  },
  {
    index: '10',
    activity: 'Interact',
    completion: '0%',
    updated: 'Oct 4 at 7:30pm',
    type: 'Activities',
    group: 'Design'
  },
  {
    index: '11',
    activity: 'Design & Prototype',
    completion: '0%',
    updated: 'Oct 23 at 7:30pm',
    type: 'Deliverables',
    group: 'Prototype'
  },
  {
    index: '12',
    activity: 'Prospect',
    completion: '0%',
    updated: 'Oct 9 at 8:30pm',
    type: 'Activities',
    group: 'Prototype'
  },
  {
    index: '13',
    activity: 'Demonstration',
    completion: '0%',
    updated: 'Oct 31 at 4:30pm',
    type: 'Deliverables',
    group: 'Prototype'
  },
  {
    index: '14',
    activity: 'Present',
    completion: '0%',
    updated: 'Oct 20 at 3:30pm',
    type: 'Deliverables',
    group: 'Prototype'
  },
  {
    index: '15',
    activity: 'Auto-Apply',
    completion: '0%',
    updated: 'Oct 40 at 2:30pm',
    type: 'Activities',
    group: 'Screeing'
  },
  {
    index: '16',
    activity: 'Interview',
    completion: '0%',
    updated: 'Oct 20 at 1:30pm',
    type: 'Activities',
    group: 'Screeing'
  },
  {
    index: '17',
    activity: 'Offer',
    completion: '0%',
    updated: 'Oct 11 at 8:30pm',
    type: 'Activities',
    group: 'Screeing'
  },
  {
    index: '18',
    activity: 'Results',
    completion: '0%',
    updated: 'Oct 16 at 8:30pm',
    type: 'Activities',
    group: 'Screeing'
  }
];

export const group = ['Setup', 'Project', 'Screening', 'Internship'];
export const required = ['Creator requires this activity', 'Yes', 'No'];
export const lockOrder = ['Creator locked activity group and placement order', 'Yes', 'No'];
export const deliverable = ['Yes', 'No'];
export const notifications = ['Creator turned on by default', 'Turn on', 'Turn off'];
export const accessibility = [
  'Creator has turned off accessibility anytime',
  'Creator has turned on accessibility anytime',
  'Yes',
  'No'
];
export const endEarly = [
  'Creator has not allowed participants to end early after this activity',
  'Creator has allow end early option only at preset order placement',
  'Yes',
  'No'
];
