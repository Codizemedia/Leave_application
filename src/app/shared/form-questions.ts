
export const choicesA: Array<any> = [
  {
    type: 'checkbox', 
    description: 'Vacation Leave', 
    value: false,
    name: "vacationLeave"
  },
  {
    type: 'checkbox', 
    description: "Mandatory/Force Leave", 
    value: false,
    name: "mandatoryOrForceLeave"
  },
  {
    type: 'checkbox', 
    description: "Sick Leave", 
    value: false,
    name: "sickLeave"
  },
  {
    type: 'checkbox', 
    description: "Maternity Leave", 
    value: false,
    name: "maternityLeave"
  },
  {
    type: 'checkbox', 
    description: "Paternity Leave", 
    value: false,
    name: "paternityLeave"
  },
  {
    type: 'checkbox', 
    description: "Special Privilege Leave", 
    value: false,
    name: "specialPrivilege"
  },
  {
    type: 'checkbox', 
    description: "Solo Parent Leave", 
    value: false,
    name: "soloParentLeave"
  },
  {
    type: 'checkbox', 
    description: "Study Leave", 
    value: false,
    name: "studyLeave"
  },
  {
    type: 'checkbox', 
    description: "10-Day VAWC Leave", 
    value: false,
    name: "tenDayVAWCLeave"
  },
  {
    type: 'checkbox', 
    description: "Rehabilitation Privilege", 
    value: false,
    name: "rehabilitationPrivilege"
  },
  {
    type: 'checkbox', 
    description: "Special Leave Benefits for Women", 
    value: false,
    name: "specialLeaveBenefitsForWomen"
  },
  {
    type: 'checkbox', 
    description: "Special Emergency", 
    value: false,
    name: "specialEmergency"
  },
  {
    type: 'checkbox', 
    description: "Adoption Leave", 
    value: false,
    name: "adoptionLeave"
  },
  {
    type: 'space', 
    description: '', 
    value: null
  },
  {
    type: 'label', 
    description: 'Others:', 
    value: null
  },
  {
    type: 'underline-label', 
    description: 'TLB (Termianl Leave Benefits)', 
    value: null
  },
  
];

export const choicesB: Array<any> = [
  {
    type: 'italic-label', 
    description: 'In case of VAcation/Special Privelege Leave:', 
    value: null
  },
  {
    type: 'checkbox-input', 
    description: 'Within the Philippines', 
    value: false,
    name: "withinThePhilippines",
    input: "withinThePhilippinesInput"
  },
  {
    type: 'checkbox-input', 
    description: 'Abroad (Specify)', 
    value: false,
    name: "abroad",
    input: "abroadInput"
  },
  {
    type: 'italic-label', 
    description: 'In case of Sick Leave:', 
    value: null
  },
  {
    type: 'checkbox-input', 
    description: 'In Hospital (Specify Illness)', 
    value: false,
    name: "inHospital",
    input: "inHospitalInput"
  },
  {
    type: 'checkbox-input', 
    description: 'Out Patient (Specify Illness)', 
    value: false,
    name: "outPatient",
    input: "outPatientInput"
  },
  {
    type: 'italic-label', 
    description: 'In case of Special Leave Benefits for Women:', 
    value: null,
  },
  {
    type: 'italic-label-input', 
    description: '(Specify Illnes)',
    value: null,
    input: "incaseOfLeaveForWomen"
  },
  {
    type: 'italic-label', 
    description: 'Incase of Study Leave:', 
    value: null
  },
  {
    type: 'checkbox', 
    description: "Completion of Master's Degree", 
    value: false,
    name: "completionOfMastersDegree"
  },
  {
    type: 'checkbox', 
    description: 'Bar/Board Examination Review', 
    value: false,
    name: "barOrBoardExaminationReview"
  },
  {
    type: 'label', 
    description: 'Other Purpose:', 
    value: null,
  },
  {
    type: 'checkbox', 
    description: 'Monetization of Leave Credits', 
    value: false,
    name: "monetizationOfLeaveCredits"
  },
  {
    type: 'checkbox', 
    description: 'Terminal Leave', 
    value: false,
    name: "terminalLeave"
  },
  {
    type: 'space', 
    description: '', 
    value: null
  },
  
  
];

export const choicesC: Array<any> = [
  {
    type: 'label', 
    description: '6. C. NUMBER OF WORKING DAYS APPLIED FOR', 
    value: null
  },
  {
    type: 'input', 
    description: '', 
    value: null,
    input: "numberOfWorkingDays"
  },
  {
    type: 'label', 
    description: 'INCLUSIVE DATES', 
    value: null
  },
  {
    type: 'input', 
    description: '', 
    value: null,
    input: "inclusiveDates"
  },
];

export const choicesD: Array<any> = [
  {
    type: 'label', 
    description: '6. D. COMMUTATION', 
    value: null
  },
  {
    type: 'checkbox', 
    description: 'Not Requested', 
    value: false,
    name: "notRequested"
  },
  {
    type: 'checkbox', 
    description: 'Requested', 
    value: false,
    name: "requested"
  }
]