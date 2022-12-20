
export const choicesA: Array<any> = [
  {
    type: 'checkbox', 
    description: 'Vacation Leave', 
    value: true,
    name: "vacationLeave"
  },
  {
    type: 'checkbox', 
    description: "Mandatory/Force Leave", 
    value: true,
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
    value: true,
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
    value: true,
    name: "specialPrivilege"
  },
  {
    type: 'checkbox', 
    description: "Solo Parent Leave", 
    value: true,
    name: "soloParentLeave"
  },
  {
    type: 'checkbox', 
    description: "Study Leave", 
    value: true,
    name: "studyLeave"
  },
  {
    type: 'checkbox', 
    description: "10-Day VAWC Leave", 
    value: true,
    name: "tenDayVAWCLeave"
  },
  {
    type: 'checkbox', 
    description: "Rehabilitation Privilege", 
    value: true,
    name: "rehabilitationPrivilege"
  },
  {
    type: 'checkbox', 
    description: "Special Leave Benefits for Women", 
    value: true,
    name: "specialLeaveBenefitsForWomen"
  },
  {
    type: 'checkbox', 
    description: "Special Emergency", 
    value: true,
    name: "specialEmergency"
  },
  {
    type: 'checkbox', 
    description: "Adoption Leave", 
    value: true,
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
    value: true,
    name: "withinThePhilippines",
    input: "withinThePhilippinesInput"
  },
  {
    type: 'checkbox-input', 
    description: 'Abroad (Specify)', 
    value: true,
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
    value: true,
    name: "inHospital",
    input: "inHospitalInput"
  },
  {
    type: 'checkbox-input', 
    description: 'Out Patient (Specify Illness)', 
    value: true,
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
    value: true,
    name: "completionOfMastersDegree"
  },
  {
    type: 'checkbox', 
    description: 'Bar/Board Examination Review', 
    value: true,
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
    value: true,
    name: "monetizationOfLeaveCredits"
  },
  {
    type: 'checkbox', 
    description: 'Terminal Leave', 
    value: true,
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
    value: true,
    name: "notRequested"
  },
  {
    type: 'checkbox', 
    description: 'Requested', 
    value: true,
    name: "requested"
  }
]