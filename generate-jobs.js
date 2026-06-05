// Run: node generate-jobs.js
// Generates jobs-data.js with 10,000 realistic UK job listings

const titles = {
  Care:             ["Care Assistant","Senior Care Assistant","Care Home Manager","Home Care Worker","Community Support Worker","Night Carer","Mental Health Support Worker","Domiciliary Carer","Activities Coordinator","Care Team Leader","Registered Nurse","Healthcare Assistant","Support Worker","Personal Care Assistant","Complex Needs Carer"],
  Warehouse:        ["Warehouse Operative","Forklift Operator","Stock Controller","Warehouse Team Leader","Picker Packer","Night Shift Operative","Logistics Coordinator","Inventory Controller","Goods In Operative","Dispatch Operative","Warehouse Supervisor","Loading Bay Operative","Returns Processor","Batch Picker","Reach Truck Driver"],
  "Customer Service":["Customer Service Advisor","Live Chat Agent","Contact Centre Agent","Customer Support Manager","Complaints Handler","Client Services Rep","Customer Experience Agent","Helpdesk Advisor","Account Manager","Customer Relations Officer","Retention Specialist","Billing Advisor","Sales Advisor","After-Sales Agent","Service Desk Analyst"],
  Retail:           ["Retail Assistant","Store Manager","Visual Merchandiser","Retail Team Leader","Sales Associate","Deputy Store Manager","Stockroom Assistant","Loss Prevention Officer","Cashier","Personal Shopper","Brand Ambassador","Concession Manager","Department Supervisor","Fitting Room Advisor","Seasonal Retail Assistant"],
  Admin:            ["Administrator","Office Manager","Executive Assistant","Receptionist","Data Entry Clerk","PA to Director","Office Coordinator","Business Support Officer","Scheduler","Compliance Administrator","HR Administrator","Finance Administrator","Project Coordinator","Operations Administrator","Facilities Coordinator"],
  IT:               ["IT Support Analyst","Software Developer","DevOps Engineer","Data Analyst","Systems Administrator","Network Engineer","Cybersecurity Analyst","Frontend Developer","Backend Developer","Full Stack Developer","Cloud Architect","Database Administrator","UX Designer","QA Engineer","Product Manager"],
  Cleaning:         ["Cleaning Operative","Office Cleaner","Industrial Cleaner","Domestic Cleaner","School Cleaner","Hospital Cleaner","Window Cleaner","Carpet Cleaner","Facilities Cleaner","Deep Clean Specialist","Janitorial Operative","Commercial Cleaner","Event Cleaner","Night Cleaner","Laundry Operative"],
  Teaching:         ["Teaching Assistant","SEND Teaching Assistant","Primary Teacher","Secondary Maths Teacher","Cover Supervisor","Early Years Practitioner","Nursery Nurse","SEN Teacher","Science Teacher","English Teacher","PE Teacher","Form Tutor","Learning Mentor","Exam Invigilator","Literacy Coordinator"],
  Driving:          ["HGV Class 1 Driver","HGV Class 2 Driver","Delivery Driver","Van Driver","Courier Driver","Multi-Drop Driver","Bus Driver","Taxi Driver","Chauffeur","Minibus Driver","Refuse Driver","Tanker Driver","Recovery Driver","School Minibus Driver","Night Trunk Driver"],
  Construction:     ["Site Manager","Electrician","Bricklayer","Plasterer","Plumber","Scaffolder","Carpenter","Painter Decorator","Roofer","General Labourer","Site Foreman","Groundworker","Steel Fixer","Quantity Surveyor","Building Inspector"],
};

const companies = {
  Care:             ["SunCare Group","HC-One","Helping Hands","Turning Point","Barchester Healthcare","Anchor Hanover","Bupa Care","Four Seasons Health Care","Sanctuary Care","Care UK","Priory Group","Leonard Cheshire","Scope","Age UK","Dimensions"],
  Warehouse:        ["Amazon Logistics","DHL Supply Chain","Wincanton","XPO Logistics","Clipper Logistics","Yusen Logistics","Kuehne+Nagel","DB Schenker","GXO Logistics","Hermes","Evri","Yodel","Royal Mail","TNT","FedEx UK"],
  "Customer Service":["BT Group","Vodafone UK","Sky Group","Virgin Media","ASOS","Capita","Teleperformance","Concentrix","Serco","Arvato","Sitel","Webhelp","EDF Energy","British Gas","Octopus Energy"],
  Retail:           ["Tesco PLC","Marks & Spencer","Sainsbury's","ASDA","Morrisons","Waitrose","John Lewis","Boots","Argos","Next PLC","H&M Group","Zara UK","Primark","Wilko","B&Q"],
  Admin:            ["NHS Foundation Trust","Deloitte UK","KPMG","PwC","Ernst & Young","Lloyds Banking Group","HSBC UK","Barclays","NatWest","Aviva","Legal & General","AXA UK","Zurich Insurance","Direct Line","Prudential"],
  IT:               ["TechCorp UK","Computacenter","Capita IT","CGI UK","IBM UK","Accenture","Infosys UK","Wipro UK","Tata Consultancy","Fujitsu UK","BT Enterprise","Sky Technology","Virgin Media Tech","Sage Group","Micro Focus"],
  Cleaning:         ["CleanPro Services","ISS Facilities","Sodexo UK","Mitie Group","OCS Group","Atalian Servest","G4S Facilities","ABM UK","Incentive FM","Bidvest Noonan","Kingdom Services","Benchmark Cleaning","Norse Group","Churchill Group","Compass Group"],
  Teaching:         ["Bright Futures Academy","Ark Schools","Oasis Academy","Ormiston Academies","United Learning","Aspire Academy Trust","Harris Federation","Inspire Education","AET Schools","REAch2 Academy","Greenwood Academies","David Ross Education","LiFE Multi-Academy","Dixons Academies","Delta Academies"],
  Driving:          ["Eddie Stobart","Wincanton","XPO Logistics","Hermes","Yodel","DHL Freight","CEVA Logistics","Palletways","Norbert Dentressangle","TPN","Clipper Group","Bibby Distribution","Gist Ltd","Gregory Distribution","Knights of Old"],
  Construction:     ["Balfour Beatty","Kier Group","Taylor Wimpey","Persimmon Homes","Vistry Group","Galliford Try","Morgan Sindall","Graham Construction","ISG Construction","Interserve","Willmott Dixon","McLaren Construction","Skanska UK","BAM Nuttall","Laing O'Rourke"],
};

const salaryRanges = {
  Care:             [[11,13],[13,16],[20,25],[22,28],[28,35],[35,45]],
  Warehouse:        [[11,13],[24,28],[26,30],[28,33],[32,38],[38,45]],
  "Customer Service":[[21,24],[22,26],[24,28],[26,32],[30,38],[35,45]],
  Retail:           [[11,13],[22,25],[23,27],[26,32],[32,42],[45,58]],
  Admin:            [[20,24],[22,27],[24,30],[28,38],[38,50],[50,65]],
  IT:               [[25,32],[28,36],[35,48],[45,60],[55,72],[65,85]],
  Cleaning:         [[10,12],[11,14],[12,15],[13,17],[16,20],[20,26]],
  Teaching:         [[18,22],[20,26],[22,28],[26,35],[32,48],[40,56]],
  Driving:          [[12,15],[24,28],[26,31],[28,34],[34,42],[40,52]],
  Construction:     [[13,16],[28,35],[32,42],[38,50],[45,58],[52,68]],
};

const cities = ["London","Manchester","Birmingham","Leeds","Sheffield","Bristol","Edinburgh","Glasgow","Liverpool","Cardiff","Newcastle","Nottingham","Leicester","Oxford","Cambridge","Brighton","Coventry","Southampton","Reading","York","Aberdeen","Belfast","Plymouth","Hull","Stoke","Wolverhampton","Derby","Sunderland","Swansea","Middlesbrough","Exeter","Norwich","Peterborough","Luton","Portsmouth","Remote","Hybrid"];

const types = ["Full-time","Part-time","Full-time","Full-time","Contract","Full-time","Part-time","Full-time","Temporary","Full-time"];
const modes = ["On-site","On-site","On-site","Remote","Hybrid","On-site","On-site","On-site","Remote","On-site"];
const responses = [24, 24, 48, 48, 48, 24];

const logos = { Care:"CA",Warehouse:"WH","Customer Service":"CS",Retail:"RT",Admin:"AD",IT:"IT",Cleaning:"CL",Teaching:"TC",Driving:"DR",Construction:"CO" };
const colors = { Care:"#2563eb",Warehouse:"#f59e0b","Customer Service":"#7c3aed",Retail:"#16a34a",Admin:"#0891b2",IT:"#dc2626",Cleaning:"#059669",Teaching:"#9333ea",Driving:"#d97706",Construction:"#374151" };

function rand(arr) { return arr[Math.floor(Math.random()*arr.length)]; }
function randInt(a,b) { return a + Math.floor(Math.random()*(b-a+1)); }
function minsAgo(m) { return new Date(Date.now()-m*60000).toISOString(); }

const descs = [
  "Immediate start available. Competitive salary + benefits. Apply today.",
  "Full training provided. No previous experience required. Excellent team environment.",
  "Exciting opportunity to join a growing company. Progression routes available.",
  "Flexible working arrangements. Enhanced benefits package. Supportive team.",
  "Excellent benefits including pension, 28 days holiday and more. Apply now.",
  "Join an award-winning team. Career development opportunities available.",
  "Competitive pay + bonus scheme. Immediate interviews available.",
  "Friendly working environment. Regular pay reviews. Start immediately.",
  "Well-established company with excellent staff retention. Great benefits.",
  "Dynamic team environment. Training and development fully funded.",
];

let id = 1000;
const jobs = [];

// Generate 10,000 jobs
for (let i = 0; i < 10000; i++) {
  const cat      = rand(Object.keys(titles));
  const title    = rand(titles[cat]);
  const company  = rand(companies[cat]);
  const city     = rand(cities);
  const sRange   = rand(salaryRanges[cat]);
  const isHourly = sRange[0] < 20;
  const salary   = isHourly ? `£${sRange[0]}–£${sRange[1]}/hr` : `£${sRange[0]}k–£${sRange[1]}k`;
  const salMin   = isHourly ? sRange[0] * 2080 : sRange[0] * 1000;
  const type     = rand(types);
  const workMode = city === 'Remote' ? 'Remote' : city === 'Hybrid' ? 'Hybrid' : rand(modes);
  const resp     = rand(responses);
  const featured = Math.random() < 0.05;
  const logo     = (company.split(' ')[0].slice(0,2)).toUpperCase();
  const minsBack = randInt(1, 14*24*60); // up to 14 days ago

  jobs.push({
    id:       id++,
    title, company, logo,
    color:    colors[cat],
    location: city,
    type, salaryMin: salMin, salary, category: cat,
    workMode, response: resp, featured,
    postedAt: minsAgo(minsBack),
    desc:     rand(descs),
  });
}

// Sort newest first
jobs.sort((a,b) => new Date(b.postedAt)-new Date(a.postedAt));

const fs = require('fs');
const output = `// Auto-generated — ${jobs.length} jobs\nconst JOBS_GENERATED = ${JSON.stringify(jobs, null, 0)};\n`;
fs.writeFileSync('jobs-data.js', output);
console.log(`✅ Generated ${jobs.length} jobs → jobs-data.js`);
