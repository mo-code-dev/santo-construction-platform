export const projects = [
  {id:'PRJ-104',name:'Downtown Residence',client:'Nile Living',location:'New Cairo',manager:'Omar Khaled',progress:82,budget:'$1.20M',spent:'$910K',deadline:'Oct 26, 2026',status:'On Track'},
  {id:'PRJ-108',name:'West Gate Business Center',client:'West Gate Holdings',location:'Sheikh Zayed',manager:'Mariam Samir',progress:64,budget:'$1.65M',spent:'$1.06M',deadline:'Nov 12, 2026',status:'At Risk'},
  {id:'PRJ-111',name:'North District Apartments',client:'Cairo Development',location:'6th of October',manager:'Mahmoud Adel',progress:51,budget:'$980K',spent:'$570K',deadline:'Dec 04, 2026',status:'Delayed'},
  {id:'PRJ-114',name:'Al Noor Villa',client:'Private Client',location:'New Cairo',manager:'Youssef Ali',progress:91,budget:'$480K',spent:'$430K',deadline:'Oct 16, 2026',status:'Near Completion'},
  {id:'PRJ-118',name:'Harbor Medical Offices',client:'Harbor Group',location:'New Capital',manager:'Ahmed Nabil',progress:37,budget:'$2.10M',spent:'$640K',deadline:'Mar 18, 2027',status:'On Track'},
];
export const tasks = [
  {id:'TSK-224',title:'Approve steel reinforcement drawings',project:'West Gate Business Center',assignee:'Mariam Samir',priority:'High',status:'Review',due:'Oct 08'},
  {id:'TSK-225',title:'Complete ground floor concrete pour',project:'Downtown Residence',assignee:'Youssef Ali',priority:'High',status:'In Progress',due:'Oct 09'},
  {id:'TSK-228',title:'Update material delivery schedule',project:'North District Apartments',assignee:'Omar Khaled',priority:'Medium',status:'To Do',due:'Oct 10'},
  {id:'TSK-231',title:'Final lighting inspection',project:'Al Noor Villa',assignee:'Ahmed Nabil',priority:'Low',status:'Completed',due:'Oct 11'},
];
export const employees = [
  {id:'EMP-001',name:'Ahmed Mahmoud',role:'Project Manager',department:'Projects',project:'Downtown Residence',status:'Active'},
  {id:'EMP-014',name:'Mariam Samir',role:'Site Engineer',department:'Engineering',project:'West Gate Business Center',status:'Active'},
  {id:'EMP-022',name:'Youssef Ali',role:'Supervisor',department:'Field Operations',project:'Al Noor Villa',status:'Active'},
  {id:'EMP-031',name:'Mahmoud Adel',role:'Site Engineer',department:'Engineering',project:'North District Apartments',status:'On Leave'},
];
export const materials = [
  {id:'MAT-040',name:'Steel Rebar 16mm',category:'Steel',project:'West Gate Business Center',qty:86,unit:'tons',stock:34,status:'Low Stock',supplier:'Delta Steel'},
  {id:'MAT-047',name:'Cement 42.5',category:'Concrete',project:'Downtown Residence',qty:420,unit:'bags',stock:280,status:'In Stock',supplier:'Nile Cement'},
  {id:'MAT-053',name:'Electrical Cable 4mm',category:'Electrical',project:'Al Noor Villa',qty:1250,unit:'m',stock:910,status:'In Stock',supplier:'PowerLine'},
];
export const suppliers = [
  {name:'Delta Steel',category:'Steel',orders:7,rating:4.7,status:'Active'},
  {name:'Nile Cement',category:'Concrete',orders:12,rating:4.5,status:'Active'},
  {name:'PowerLine',category:'Electrical',orders:4,rating:4.3,status:'Active'},
  {name:'BuildPro Equipment',category:'Equipment',orders:2,rating:4.1,status:'Under Review'},
];
export const equipment = [
  {id:'EQ-102',name:'CAT 320 Excavator',type:'Excavator',site:'North District Apartments',status:'In Use',utilization:78,nextMaintenance:'Oct 18'},
  {id:'EQ-118',name:'Liebherr 50T Crane',type:'Crane',site:'West Gate Business Center',status:'Available',utilization:61,nextMaintenance:'Nov 02'},
  {id:'EQ-121',name:'Atlas Generator 250kVA',type:'Generator',site:'Downtown Residence',status:'Maintenance',utilization:43,nextMaintenance:'Oct 09'},
];
export const invoices = [
  {no:'INV-2026-041',client:'Nile Living',project:'Downtown Residence',amount:'$145,000',due:'Oct 14',status:'Pending'},
  {no:'INV-2026-044',client:'West Gate Holdings',project:'West Gate Business Center',amount:'$220,000',due:'Oct 05',status:'Overdue'},
  {no:'INV-2026-046',client:'Private Client',project:'Al Noor Villa',amount:'$48,000',due:'Oct 19',status:'Paid'},
];
export const documents = [
  {name:'Structural Drawings — Rev 04',type:'Drawing',project:'West Gate Business Center',updated:'Oct 06, 2026',version:'v4',status:'Approved'},
  {name:'Main Contract — Downtown Residence',type:'Contract',project:'Downtown Residence',updated:'Oct 04, 2026',version:'v2',status:'Active'},
  {name:'Daily Site Report — Oct 06',type:'Report',project:'Al Noor Villa',updated:'Oct 06, 2026',version:'v1',status:'Filed'},
];
