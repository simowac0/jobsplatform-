// ─── PROCEDURAL JOB ENGINE ───────────────────────────────────
// Generates jobs on-demand by index. No huge file needed.
// Base: 40,000 jobs. +500 new jobs every day automatically.
;(function() {
  function seeded(n) {
    var s = (n * 2654435761) >>> 0;
    return function() {
      s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
      return s / 4294967296;
    };
  }
  function pick(rng, arr) { return arr[Math.floor(rng() * arr.length)]; }

  var POOL = {
    Care: {
      titles:    ['Care Assistant','Senior Care Assistant','Care Home Manager','Home Care Worker','Night Carer','Mental Health Support Worker','Domiciliary Carer','Activities Coordinator','Care Team Leader','Healthcare Assistant','Support Worker','Complex Needs Carer','Dementia Specialist','Waking Night Carer','Supported Living Worker','Community Support Worker','Personal Care Assistant','Registered Nurse','Respite Carer','Care Home Deputy Manager'],
      companies: ['SunCare Group','HC-One','Helping Hands','Turning Point','Barchester Healthcare','Anchor Hanover','Bupa Care','Four Seasons Health Care','Sanctuary Care','Care UK','Priory Group','Leonard Cheshire','Scope','Age UK','Dimensions','Voyage Care','Community Integrated Care','Creative Support','Lifeways Group','Mencap'],
      bands: [[11,13,1],[13,16,1],[20,25,0],[22,28,0],[25,32,0],[28,38,0],[35,45,0]],
      color: '#2563eb'
    },
    Warehouse: {
      titles:    ['Warehouse Operative','Forklift Operator','Stock Controller','Warehouse Team Leader','Picker Packer','Night Shift Operative','Logistics Coordinator','Inventory Controller','Dispatch Operative','Warehouse Supervisor','Loading Bay Operative','Returns Processor','Reach Truck Driver','Warehouse Manager','Goods In Clerk','Batch Picker','Quality Control Inspector','Warehouse Administrator','Shift Manager','Inbound Receiving Operative'],
      companies: ['Amazon Logistics','DHL Supply Chain','Wincanton','XPO Logistics','Clipper Logistics','Yusen Logistics','DB Schenker','GXO Logistics','Hermes','Evri','Yodel','Royal Mail','TNT','FedEx UK','UPS UK','Whistl','Parcelforce','Ceva Logistics','ID Logistics','Kuehne+Nagel'],
      bands: [[11,13,1],[24,28,0],[26,30,0],[28,33,0],[30,36,0],[32,38,0],[38,48,0]],
      color: '#f59e0b'
    },
    'Customer Service': {
      titles:    ['Customer Service Advisor','Live Chat Agent','Contact Centre Agent','Customer Support Manager','Complaints Handler','Client Services Rep','Customer Experience Agent','Helpdesk Advisor','Account Manager','Customer Relations Officer','Retention Specialist','Billing Advisor','Sales Advisor','Service Desk Analyst','Escalations Handler','Customer Success Manager','First Response Advisor','CRM Specialist','Social Media Agent','Quality Assurance Analyst'],
      companies: ['BT Group','Vodafone UK','Sky Group','Virgin Media','ASOS','Capita','Teleperformance','Concentrix','Serco','Webhelp','EDF Energy','British Gas','Octopus Energy','Hive','E.ON UK','Scottish Power','OVO Energy','Three UK','EE Limited','TalkTalk'],
      bands: [[21,24,0],[22,26,0],[24,28,0],[26,32,0],[30,38,0],[35,45,0],[40,52,0]],
      color: '#7c3aed'
    },
    Retail: {
      titles:    ['Retail Assistant','Store Manager','Visual Merchandiser','Retail Team Leader','Sales Associate','Deputy Store Manager','Stockroom Assistant','Loss Prevention Officer','Cashier','Personal Shopper','Brand Ambassador','Concession Manager','Department Supervisor','Pharmacy Dispenser','Fresh Food Operative','Kiosk Operator','Beauty Advisor','Seasonal Retail Assistant','Self-Checkout Supervisor','Retail Buyer'],
      companies: ['Tesco PLC','Marks and Spencer','Sainsburys','ASDA','Morrisons','Waitrose','John Lewis','Boots','Argos','Next PLC','H and M','Zara UK','Primark','Wilko','B and Q','Homebase','Currys','Halfords','Sports Direct','JD Sports'],
      bands: [[11,13,1],[22,25,0],[23,27,0],[26,32,0],[30,40,0],[40,52,0],[45,58,0]],
      color: '#16a34a'
    },
    Admin: {
      titles:    ['Administrator','Office Manager','Executive Assistant','Receptionist','Data Entry Clerk','PA to Director','Office Coordinator','Business Support Officer','Scheduler','Compliance Administrator','HR Administrator','Finance Administrator','Project Coordinator','Operations Administrator','Facilities Coordinator','Payroll Administrator','Legal Secretary','Medical Secretary','School Administrator','Team Secretary'],
      companies: ['NHS Foundation Trust','Deloitte UK','KPMG','PwC','Ernst and Young','Lloyds Banking Group','HSBC UK','Barclays','NatWest','Aviva','Legal and General','AXA UK','Zurich Insurance','Direct Line','Prudential','Standard Life','RSA Group','Hiscox','Covea Insurance','Allianz UK'],
      bands: [[20,24,0],[22,27,0],[24,30,0],[28,38,0],[35,46,0],[42,55,0],[50,65,0]],
      color: '#0891b2'
    },
    IT: {
      titles:    ['IT Support Analyst','Software Developer','DevOps Engineer','Data Analyst','Systems Administrator','Network Engineer','Cybersecurity Analyst','Frontend Developer','Backend Developer','Full Stack Developer','Cloud Architect','Database Administrator','UX Designer','QA Engineer','Product Manager','Data Engineer','Machine Learning Engineer','Mobile Developer','Scrum Master','IT Project Manager'],
      companies: ['TechCorp UK','Computacenter','Capita IT','CGI UK','IBM UK','Accenture','Infosys UK','Wipro UK','Tata Consultancy','Fujitsu UK','BT Enterprise','Sky Technology','Sage Group','Sopra Steria','Atos UK','DXC Technology','Leidos UK','BAE Systems Digital','Micro Focus','Methods Group'],
      bands: [[25,32,0],[28,38,0],[35,50,0],[45,60,0],[55,72,0],[65,85,0],[80,110,0]],
      color: '#dc2626'
    },
    Cleaning: {
      titles:    ['Cleaning Operative','Office Cleaner','Industrial Cleaner','Domestic Cleaner','School Cleaner','Hospital Cleaner','Window Cleaner','Carpet Cleaner','Facilities Cleaner','Deep Clean Specialist','Janitorial Operative','Commercial Cleaner','Event Cleaner','Night Cleaner','Laundry Operative','Hygiene Technician','Waste Operative','Grounds Keeper','Street Cleaner','Sanitation Operative'],
      companies: ['CleanPro Services','ISS Facilities','Sodexo UK','Mitie Group','OCS Group','Atalian Servest','G4S Facilities','ABM UK','Incentive FM','Bidvest Noonan','Kingdom Services','Benchmark Cleaning','Norse Group','Churchill Group','Compass Group','Pristine Clean','Cleanology','Jani-King UK','ServiceMaster','Initial Facilities'],
      bands: [[10,12,1],[11,14,1],[12,15,1],[13,17,1],[14,18,1],[16,20,1],[20,26,0]],
      color: '#059669'
    },
    Teaching: {
      titles:    ['Teaching Assistant','SEND Teaching Assistant','Primary Teacher','Secondary Maths Teacher','Cover Supervisor','Early Years Practitioner','Nursery Nurse','SEN Teacher','Science Teacher','English Teacher','PE Teacher','Learning Mentor','Exam Invigilator','Literacy Coordinator','Design Technology Teacher','Music Teacher','Geography Teacher','History Teacher','RE Teacher','School Librarian'],
      companies: ['Bright Futures Academy','Ark Schools','Oasis Academy','Ormiston Academies','United Learning','Aspire Academy Trust','Harris Federation','AET Schools','REAch2 Academy','Greenwood Academies','David Ross Education','Dixons Academies','Delta Academies','Thinking Schools Academy','Astrea Academy','Brooke Weston Trust','Star Academies','Infinity Academies','Caedmon Academy','Outwood Academy'],
      bands: [[18,22,0],[20,26,0],[22,28,0],[26,35,0],[30,42,0],[36,52,0],[42,58,0]],
      color: '#9333ea'
    },
    Driving: {
      titles:    ['HGV Class 1 Driver','HGV Class 2 Driver','Delivery Driver','Van Driver','Courier Driver','Multi-Drop Driver','Bus Driver','Taxi Driver','Chauffeur','Minibus Driver','Refuse Driver','Tanker Driver','Recovery Driver','School Minibus Driver','Night Trunk Driver','Ambulance Driver','Airport Transfer Driver','Skip Lorry Driver','Curtainsider Driver','Fridge Driver'],
      companies: ['Eddie Stobart','Wincanton','XPO Logistics','Hermes','Yodel','DHL Freight','CEVA Logistics','Palletways','Gregory Distribution','Knights of Old','Bibby Distribution','Gist Ltd','TPN','ABF Freight','Palletline','Paragon Transport','Howard Tenens','DPD UK','Speedy Freight','Coles Logistics'],
      bands: [[12,15,1],[24,28,0],[26,31,0],[28,36,0],[32,42,0],[38,48,0],[44,55,0]],
      color: '#d97706'
    },
    Construction: {
      titles:    ['Site Manager','Electrician','Bricklayer','Plasterer','Plumber','Scaffolder','Carpenter','Painter Decorator','Roofer','General Labourer','Site Foreman','Groundworker','Steel Fixer','Quantity Surveyor','Building Inspector','Civil Engineer','Structural Engineer','M and E Engineer','Demolition Operative','Dry Liner'],
      companies: ['Balfour Beatty','Kier Group','Taylor Wimpey','Persimmon Homes','Vistry Group','Galliford Try','Morgan Sindall','Graham Construction','Willmott Dixon','McLaren Construction','Skanska UK','BAM Nuttall','Laing O Rourke','Sir Robert McAlpine','Costain','Interserve','Mace Group','John Sisk','Robertson Group','Bowmer and Kirkland'],
      bands: [[13,16,1],[28,35,0],[32,42,0],[38,50,0],[42,55,0],[50,65,0],[58,78,0]],
      color: '#374151'
    }
  };

  var CATS   = Object.keys(POOL);
  var CITIES = ['London','Manchester','Birmingham','Leeds','Sheffield','Bristol','Edinburgh','Glasgow','Liverpool','Cardiff','Newcastle','Nottingham','Leicester','Oxford','Cambridge','Brighton','Coventry','Southampton','Reading','York','Aberdeen','Belfast','Plymouth','Hull','Stoke','Wolverhampton','Derby','Sunderland','Swansea','Middlesbrough','Exeter','Norwich','Peterborough','Luton','Portsmouth','Ipswich','Milton Keynes','Northampton','Wigan','Bolton','Huddersfield','Bath','Bournemouth','Blackpool','Warrington','Preston','Dundee','Inverness','Stirling','Telford'];
  var TYPES  = ['Full-time','Full-time','Full-time','Part-time','Full-time','Contract','Full-time','Part-time','Full-time','Temporary'];
  var MODES  = ['On-site','On-site','On-site','On-site','Remote','Hybrid','On-site','On-site','On-site','On-site'];
  var RESPS  = [24,24,48,48,48,24,24,48,48,24];
  var DESCS  = [
    'Immediate start available. Competitive salary and full benefits package.',
    'Full training provided for the right candidate. Excellent progression routes.',
    'Join an award-winning team. 28 days holiday plus pension scheme included.',
    'Flexible working options available. Supportive management. Apply today.',
    'Competitive pay with regular salary reviews. Friendly team environment.',
    'Exciting growth opportunity with a leading UK employer. Career development supported.',
    'Immediate interviews available. Great company culture and team benefits.',
    'Well-established company with excellent staff retention and morale.',
    'Enhanced benefits package including health cover and performance bonus.',
    'Dynamic fast-paced environment. Training and development fully funded.'
  ];

  // ── Daily growth ──
  var LAUNCH   = 1704067200000; // 2024-01-01
  var BASE     = 40000;
  var PER_DAY  = 500;
  var days     = Math.max(0, Math.floor((Date.now() - LAUNCH) / 86400000));
  var TOTAL    = Math.min(BASE + days * PER_DAY, 300000);

  window.generateJob = function(idx) {
    var rng    = seeded((idx * 2654435761 + 98765) >>> 0);
    var catKey = pick(rng, CATS);
    var pool   = POOL[catKey];
    var bIdx   = Math.floor(rng() * pool.bands.length);
    var band   = pool.bands[bIdx];
    var hourly = band[2] === 1;
    var sLo = band[0], sHi = band[1];
    var salary  = hourly ? ('£'+sLo+'–£'+sHi+'/hr') : ('£'+sLo+'k–£'+sHi+'k');
    var salMin  = hourly ? sLo*2080 : sLo*1000;
    var city    = pick(rng, CITIES);
    var type    = pick(rng, TYPES);
    var workMode= (city === 'Remote') ? 'Remote' : pick(rng, MODES);
    var response= pick(rng, RESPS);
    var company = pick(rng, pool.companies);
    var title   = pick(rng, pool.titles);
    var logo    = company.split(' ').slice(0,2).map(function(w){return w[0]||'';}).join('').toUpperCase().slice(0,2) || 'JP';
    var featured= rng() < 0.04;
    var desc    = pick(rng, DESCS);
    // idx=0 → oldest, idx=TOTAL-1 → newest
    var maxAgeMs = (days+1) * 86400000;
    var ageMs    = Math.floor((1 - (idx+1)/TOTAL) * maxAgeMs);
    var postedAt = new Date(Date.now() - ageMs).toISOString();
    return { id:idx+10000, title:title, company:company, logo:logo, color:pool.color, location:city, type:type, salaryMin:salMin, salary:salary, category:catKey, workMode:workMode, response:response, featured:featured, postedAt:postedAt, desc:desc };
  };

  window.TOTAL_AVAILABLE_JOBS = TOTAL;
  window.JOBS_PER_DAY_RATE    = PER_DAY;
  window.DAYS_SINCE_LAUNCH    = days;
  window.JOBS_GENERATED       = null; // signal jobs.js to use generator

  console.log('📋 JobsPlatform: ' + TOTAL.toLocaleString() + ' jobs (day ' + days + ', +' + PER_DAY + '/day)');
})();
