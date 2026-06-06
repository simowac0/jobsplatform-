// ─── STATE ───────────────────────────────────────────────────
var currentJob = null;
var applyCurrentStep = 1;

// ─── RENDER ──────────────────────────────────────────────────
// ─── RICH CONTENT POOLS ──────────────────────────────────────
var DETAIL_CONTENT = {
  Care: {
    descs: [
      '{company} is looking for a dedicated {title} to join our outstanding care team in {location}. You will provide person-centred care and support to individuals in our {workMode === "On-site" ? "residential home" : "community"}, helping them live fulfilling and independent lives. This is a rewarding role that makes a real difference every single day.\n\nWorking as part of a close-knit team, you will assist with daily living activities, medication administration, and personal care while always respecting the dignity and independence of those in your care. You will work alongside experienced colleagues who are passionate about delivering the highest quality of support.',
      'An exciting opportunity has arisen for a compassionate and motivated {title} to join {company} in {location}. We are committed to improving the quality of life for the people we support and we are looking for individuals who share our values.\n\nIn this role you will support residents or service users with their daily routines, personal care, activities, and social engagement. You will maintain accurate records, work closely with families and healthcare professionals, and always put the needs of the individual first. Full induction training is provided and ongoing professional development is actively encouraged.',
      '{company} has been providing high-quality care services across the UK for over 20 years. We are now seeking a caring and reliable {title} to strengthen our team in {location}.\n\nYou will be responsible for supporting individuals with daily living activities, ensuring their safety, wellbeing, and happiness at all times. Whether it is assisting with personal care, preparing meals, or simply providing companionship, your work will directly improve someone\'s quality of life. We value every member of our team and invest significantly in training and career development.',
    ],
    requirements: [
      'Genuine passion for supporting people and making a difference',
      'Previous care experience is desirable but full training will be provided',
      'Enhanced DBS check required (we will cover the cost)',
      'Ability to work shifts including evenings, weekends, and bank holidays',
      'Excellent communication and interpersonal skills',
      'Empathetic, patient, and non-judgemental approach',
      'Ability to follow care plans and maintain accurate records',
      'A positive attitude and genuine team spirit',
      'Valid driving licence is advantageous for community roles',
      'NVQ/QCF in Health and Social Care is desirable but not essential',
    ],
    benefits: [
      '{salary} — paid weekly or monthly depending on preference',
      '28 days paid annual leave (including bank holidays)',
      'Company pension scheme (auto-enrolment)',
      'Free enhanced DBS check',
      'Fully funded induction training and ongoing CPD',
      'Refer-a-friend bonus scheme (up to £500)',
      'Uniform and PPE provided at no cost',
      'Employee assistance programme including mental health support',
      'Clear career progression pathway to senior roles',
      'Mileage allowance for community and domiciliary roles',
      'Monthly team recognition and staff appreciation events',
    ],
  },
  Warehouse: {
    descs: [
      '{company} is one of the UK\'s leading logistics and supply chain operators and we are currently recruiting for a {title} at our {location} distribution centre. This is a fantastic opportunity to join a well-established and growing business that offers genuine career progression.\n\nWorking in a fast-paced warehouse environment, you will be responsible for picking, packing, goods-in, dispatch, or stock management depending on the specific role. You will work as part of a large and supportive team, following all health and safety procedures and helping to ensure that our operation runs smoothly and efficiently 24 hours a day.',
      'We have an exciting opportunity for a hard-working and reliable {title} to join our {location} team at {company}. Our warehouse is a state-of-the-art facility that handles thousands of orders each day, and we need motivated individuals to help us maintain our excellent service standards.\n\nYou will be responsible for accurately picking and packing customer orders, operating warehouse equipment safely, maintaining stock accuracy, and ensuring the warehouse is kept clean and organised. You will receive full training and there are excellent opportunities to progress into team leader and supervisor roles.',
      '{company} operates one of the largest warehouse networks in the UK and we are looking for a motivated {title} to join our busy team in {location}. We offer competitive pay, excellent benefits, and a supportive team environment.\n\nKey responsibilities include receiving and processing incoming stock, fulfilling customer orders accurately and on time, operating warehouse machinery (training provided), maintaining inventory records, and contributing to a safe and efficient working environment. Both day and night shifts are available with enhanced pay for unsocial hours.',
    ],
    requirements: [
      'Previous warehouse or logistics experience is an advantage but not essential',
      'Ability to work at a fast pace and meet daily targets',
      'Good attention to detail and accuracy when picking orders',
      'Physically fit — the role involves standing and lifting for extended periods',
      'Reliable, punctual, and committed to your shift pattern',
      'Ability to work in a team and follow instructions from supervisors',
      'Basic numeracy and literacy skills',
      'Forklift licence (counterbalance or reach truck) is a bonus',
      'Flexible to work various shift patterns including nights and weekends',
      'Commitment to health and safety standards at all times',
    ],
    benefits: [
      '{salary} — weekly pay available',
      'Overtime at enhanced rates (1.5x or 2x on bank holidays)',
      '28 days paid holiday per year',
      'Free on-site car parking',
      'Subsidised canteen and break facilities',
      'Pension scheme with employer contributions',
      'Forklift and other operator training fully funded',
      'Uniform and safety equipment provided',
      'Regular shifts with set hours for work-life balance',
      'Employee discount scheme on branded products',
      'Progression opportunities into team leader and supervisor roles',
    ],
  },
  'Customer Service': {
    descs: [
      '{company} is seeking an enthusiastic and customer-focused {title} to join our growing team in {location}. You will be the first point of contact for our customers, handling enquiries, resolving complaints, and ensuring every interaction leaves a positive impression.\n\nThis is an excellent opportunity to build a rewarding career in customer service with one of the UK\'s most respected brands. You will receive comprehensive training, ongoing coaching, and have access to a clear career progression pathway. Whether you are dealing with customers by phone, email, or live chat, your goal is always to deliver an outstanding experience.',
      'Are you passionate about helping people? {company} is looking for a talented {title} to join our {location} contact centre. We handle millions of customer contacts each year and our people are at the heart of everything we do.\n\nIn this role you will respond to customer enquiries across multiple channels, troubleshoot issues, process account changes, and upsell relevant products and services. You will work to agreed KPIs including call quality, customer satisfaction scores, and resolution rates. Flexible shift patterns are available and we offer excellent benefits including performance bonuses.',
      '{company} is one of the UK\'s top customer service employers and we are expanding our team in {location}. We are looking for motivated individuals to join us as {title} and help us deliver exceptional service to our customers.\n\nYour responsibilities will include managing inbound calls and digital enquiries, resolving customer concerns efficiently and professionally, updating customer records, and identifying opportunities to improve the customer experience. No previous experience is required — we provide comprehensive training and all the tools you need to succeed.',
    ],
    requirements: [
      'Previous customer service experience is preferred but not essential',
      'Excellent verbal and written communication skills',
      'Strong problem-solving ability and a solution-focused mindset',
      'Ability to remain calm and professional under pressure',
      'Good IT skills and ability to navigate multiple systems simultaneously',
      'Flexible attitude to working shifts including evenings and weekends',
      'High level of empathy and active listening skills',
      'Accuracy and attention to detail when updating customer records',
      'Team player with a positive and enthusiastic approach',
      'Target-driven with a desire to exceed performance expectations',
    ],
    benefits: [
      '{salary} basic salary',
      'Monthly performance bonus (up to £200)',
      'Shift premium for evenings and weekends',
      '28 days holiday plus bank holidays',
      'Private medical insurance after probation',
      'Staff discount across all company products and services',
      'Structured career development programme',
      'Ongoing training and coaching from experienced team leaders',
      'Modern, comfortable office environment with free refreshments',
      'Employee recognition awards and team events',
      'Hybrid working available after training period',
    ],
  },
  Retail: {
    descs: [
      '{company} is one of the UK\'s best loved retail brands and we are looking for a friendly and enthusiastic {title} to join our {location} store. Our colleagues are the heart of our business and we are committed to creating a working environment where everyone feels valued and supported.\n\nIn this role you will be responsible for delivering an outstanding customer experience, maintaining excellent store presentation standards, processing transactions accurately, and supporting your team to achieve sales targets. Whether you are helping a customer find the perfect product, restocking shelves, or operating the tills, your positive attitude and dedication will make a real difference.',
      'Join the {company} family as a {title} at our busy {location} store. We pride ourselves on offering exceptional quality products and an outstanding shopping experience, and we need motivated team members to help us deliver that every day.\n\nYou will assist customers with their shopping needs, maintain attractive and fully stocked displays, handle cash and card transactions, and contribute to a safe and welcoming store environment. We offer flexible hours to suit your lifestyle, excellent colleague discounts, and real opportunities to grow your career with one of the UK\'s most iconic retailers.',
      '{company} is searching for a customer-oriented {title} to join our thriving store in {location}. This is a fantastic opportunity to be part of a team that is passionate about great products and even better service.\n\nYour key responsibilities will include greeting and assisting customers, ensuring shelves and displays are beautifully presented, operating the tills efficiently, receiving and processing deliveries, and maintaining a clean and safe shopping environment. We welcome applicants from all backgrounds and previous retail experience, while helpful, is not essential.',
    ],
    requirements: [
      'A warm, friendly, and customer-focused personality',
      'Ability to work as part of a busy and fast-paced team',
      'Flexible availability including weekends and bank holidays',
      'Good numerical skills for handling cash transactions',
      'Previous retail or customer-facing experience is beneficial',
      'Physically fit — the role involves standing and manual handling',
      'Attention to detail when maintaining store standards',
      'Reliable, punctual, and presentable in appearance',
      'Positive "can-do" attitude even during peak trading periods',
      'Basic IT skills for operating tills and stock systems',
    ],
    benefits: [
      '{salary} — reviewed annually',
      'Generous staff discount (up to 25% across all ranges)',
      '28 days paid holiday (pro-rated for part-time)',
      'Company pension scheme',
      'Flexible shift patterns to suit your lifestyle',
      'Access to colleague savings and cashback schemes',
      'Free uniform or clothing allowance',
      'Regular team socials and colleague appreciation events',
      'Opportunities to progress into team leader and management roles',
      'Health and wellbeing support programme',
      'Bonus scheme for outstanding performance',
    ],
  },
  Admin: {
    descs: [
      '{company} is seeking a highly organised and professional {title} to support our busy team in {location}. This is an excellent opportunity to join a well-established organisation where you will play a key role in ensuring the smooth and efficient running of daily operations.\n\nYou will be responsible for managing correspondence, maintaining databases and filing systems, coordinating meetings and appointments, preparing documents and reports, and providing general administrative support to senior team members. The ideal candidate will have excellent attention to detail, strong IT skills, and the ability to prioritise a busy workload.',
      'A fantastic opportunity has arisen for an experienced {title} to join {company} in {location}. We are a dynamic and growing organisation and we are looking for a proactive and detail-oriented individual to provide comprehensive administrative support across our business.\n\nKey duties will include managing office communications, maintaining accurate records and databases, coordinating schedules and travel arrangements, preparing presentations and reports, and acting as a central point of contact for both internal and external stakeholders. This is a varied and interesting role in a supportive team environment.',
      '{company} is one of the UK\'s leading organisations in its sector and we are looking for a talented {title} to join our office team in {location}. This role offers an excellent opportunity to develop your administrative career in a professional and supportive environment.\n\nYou will support a range of administrative activities including document management, meeting coordination, data entry, and correspondence handling. You will work closely with colleagues across multiple departments and will be expected to manage your time effectively, maintain confidentiality, and deliver a high standard of work at all times.',
    ],
    requirements: [
      'Proven experience in an administrative or office support role',
      'Excellent proficiency in Microsoft Office (Word, Excel, Outlook, PowerPoint)',
      'Strong written and verbal communication skills',
      'High level of accuracy and attention to detail',
      'Excellent time management and ability to prioritise tasks',
      'Professional and discreet with confidential information',
      'Ability to work independently as well as collaboratively',
      'Experience with CRM or database management systems is a plus',
      'A-Level or equivalent qualification (degree desirable for senior roles)',
      'Positive attitude and willingness to take on new responsibilities',
    ],
    benefits: [
      '{salary} per annum',
      '25 days annual leave plus 8 bank holidays',
      'Hybrid working (2-3 days from home where applicable)',
      'Pension scheme with 5% employer contribution',
      'Private healthcare cover after 6 months',
      'Annual performance-related bonus',
      'Professional development and training budget',
      'Season ticket loan and cycle-to-work scheme',
      'Employee assistance programme',
      'Regular team socials and company events',
      'Modern, well-equipped office with free refreshments',
    ],
  },
  IT: {
    descs: [
      '{company} is looking for a talented and motivated {title} to join our technology team in {location}. This is an exciting opportunity to work on challenging and innovative projects that directly impact the lives of millions of users.\n\nAs part of our team, you will be responsible for designing, building, and maintaining robust technology solutions that meet the needs of our business and customers. You will collaborate closely with colleagues across product, design, and engineering, and will be encouraged to contribute ideas, challenge the status quo, and continuously improve our processes and systems. We are a forward-thinking organisation that invests heavily in its people and technology.',
      'We have an exciting vacancy for a skilled {title} at {company} in {location}. We are on an ambitious growth journey and we need technically excellent and passionate individuals to help us achieve our goals.\n\nYou will work as part of an agile, cross-functional team responsible for delivering high-quality technology solutions. You will be involved in all aspects of the development lifecycle, from requirements gathering and design through to deployment and maintenance. We use the latest tools and technologies and encourage continuous learning and professional development.',
      '{company} is a technology-driven organisation and we are seeking an experienced {title} to strengthen our team based in {location}. This is a pivotal role that will give you the opportunity to make a significant contribution to our digital transformation journey.\n\nYou will be responsible for delivering innovative technology solutions, collaborating with stakeholders to understand requirements, and ensuring the reliability, security, and performance of our systems. We value technical excellence, creative problem-solving, and a growth mindset. In return, we offer a highly competitive package and a genuinely exciting place to work.',
    ],
    requirements: [
      'Relevant degree in Computer Science, IT, or a related field (or equivalent experience)',
      'Proven experience in a similar technical role',
      'Strong problem-solving skills and analytical thinking',
      'Excellent communication skills — able to explain technical concepts clearly',
      'Experience with relevant programming languages or platforms for the role',
      'Understanding of agile development methodologies (Scrum/Kanban)',
      'Ability to work collaboratively in a cross-functional team',
      'Commitment to writing clean, well-documented, and testable code',
      'Experience with version control systems (Git)',
      'A proactive approach to learning new technologies and staying current',
      'Security-conscious mindset and knowledge of best practices',
    ],
    benefits: [
      '{salary} — reviewed annually and benchmarked to market',
      'Remote-first or hybrid working arrangement',
      '25 days holiday plus bank holidays (increasing with service)',
      'Private healthcare for you and your family',
      'Enhanced pension (up to 8% employer contribution)',
      '£2,000+ annual learning and development budget',
      'Latest MacBook or ThinkPad of your choice',
      'Home office setup allowance (£500)',
      'Regular tech talks, hackathons, and innovation days',
      'Equity or share options (senior roles)',
      'Enhanced parental leave (26 weeks fully paid)',
    ],
  },
  Cleaning: {
    descs: [
      '{company} provides professional cleaning services to businesses across the UK and we are currently seeking a reliable and hardworking {title} to join our team in {location}. We are proud of our reputation for high standards and we are looking for individuals who take pride in their work.\n\nIn this role you will be responsible for cleaning and maintaining designated areas to the highest standard, ensuring all tasks are completed in line with our cleaning schedules and procedures. You will use professional cleaning equipment and products safely and efficiently, and you will report any maintenance issues or concerns to your supervisor promptly.',
      'We are looking for a diligent and thorough {title} to join the {company} team in {location}. This is a straightforward but important role — a clean environment matters to everyone, and your work will make a real difference to the people who use the buildings you maintain.\n\nYour responsibilities will include vacuuming and mopping floors, cleaning toilets and wash rooms to a high standard, wiping surfaces and removing litter, emptying bins, and ensuring all areas are left clean and tidy. You will work independently or as part of a small team, and you will have access to all the equipment and materials you need.',
      '{company} is a leading facilities management company operating across the UK. We are recruiting for a hard-working {title} in {location} to help maintain our high cleaning standards across our portfolio of contracts.\n\nWorking to agreed cleaning schedules, you will ensure all areas are maintained to a consistently high standard, following our safe working procedures at all times. This is a physical role that requires attention to detail and a genuine commitment to quality. In return, we offer a friendly working environment, reliable hours, and opportunities to develop your career with a major national employer.',
    ],
    requirements: [
      'Previous cleaning experience is helpful but full training is provided',
      'Reliable, punctual, and honest',
      'Attention to detail and high standards of cleanliness',
      'Ability to work independently without supervision',
      'Good understanding of COSHH and safe use of cleaning chemicals',
      'Physically fit — the role involves bending, lifting, and prolonged standing',
      'DBS check may be required depending on the contract',
      'Flexible availability — early mornings, evenings, or weekends',
      'Positive attitude and willingness to go the extra mile',
      'Good time management to complete all tasks within allocated hours',
    ],
    benefits: [
      '{salary} — paid weekly',
      'Guaranteed hours contract',
      '28 days paid holiday per year (pro-rated)',
      'Pension scheme auto-enrolment',
      'Uniform and all cleaning materials provided',
      'Ongoing training and health and safety instruction',
      'Friendly and supportive team environment',
      'Regular hours for a predictable work-life balance',
      'Employee assistance programme',
      'Opportunities to progress into supervisory roles',
    ],
  },
  Teaching: {
    descs: [
      '{company} is seeking a passionate and dedicated {title} to join our inclusive and high-performing school in {location}. We are committed to providing an outstanding education for all our pupils and we are looking for an individual who shares our ambition and values.\n\nIn this role you will work closely with class teachers to support pupil learning, assist with lesson preparation and delivery, provide targeted support to individuals or small groups, and contribute to the positive and nurturing atmosphere of our school. Whether you are supporting a child with additional needs or helping a class with a project, your contribution will be invaluable to the children in your care.',
      'An exciting vacancy has arisen at {company} in {location} for a motivated and creative {title}. Our school is a friendly and welcoming place where every member of staff is valued and where children\'s wellbeing and achievement are at the heart of everything we do.\n\nYou will support teaching staff in planning and delivering high-quality lessons, work with individual pupils who require additional support, help maintain an organised and stimulating classroom environment, and develop positive relationships with pupils, parents, and colleagues. We actively encourage professional development and offer regular training opportunities.',
      '{company} is a highly regarded school in {location} and we are looking for an enthusiastic and nurturing {title} to join our team. Our pupils are remarkable individuals and we need staff who will bring energy, patience, and creativity to their roles every day.\n\nWorking under the direction of the class teacher, you will provide high-quality support to pupils during lessons and activities, assist with the preparation of learning materials, monitor pupil progress, and contribute to a safe, happy, and productive learning environment. This is a term-time role with holiday pay included in the hourly rate.',
    ],
    requirements: [
      'Level 2 or Level 3 Teaching Assistant qualification (or working towards)',
      'Previous experience working with children in a school or educational setting',
      'Enhanced DBS on the Update Service (or willingness to apply)',
      'Understanding of safeguarding and child protection procedures',
      'Patience, empathy, and a genuine passion for supporting young learners',
      'Ability to work collaboratively with teachers, SENCOs, and other colleagues',
      'Good literacy and numeracy skills',
      'Flexibility to support across different year groups and subjects',
      'Knowledge of SEND and inclusive teaching strategies (desirable)',
      'Paediatric first aid qualification is advantageous',
    ],
    benefits: [
      '{salary} — MPS/UPS scale for qualified teachers, NJC scale for support staff',
      'Term-time only working (approximately 39 weeks per year)',
      'Teacher\'s Pension Scheme (TPS) or Local Government Pension Scheme',
      'Cycle-to-work scheme and public transport season ticket loan',
      'Access to extensive CPD and professional development opportunities',
      'Supportive and experienced senior leadership team',
      'Well-resourced classrooms and modern facilities',
      'Collaborative and welcoming staff culture',
      'Employee wellbeing programme including counselling support',
      'Regular whole-school and department INSET days',
    ],
  },
  Driving: {
    descs: [
      '{company} is one of the UK\'s most respected transport and logistics companies and we are looking for a skilled and professional {title} to join our {location} depot. We have a modern, well-maintained fleet and we pride ourselves on looking after our drivers.\n\nIn this role you will be responsible for the safe and efficient transport of goods to customers and distribution points across the region. You will plan your routes effectively, adhere to all road traffic laws and tachograph regulations, ensure your vehicle is roadworthy at the start of each shift, and represent {company} professionally at all times. We offer excellent pay, regular hours, and a supportive management team.',
      'We are recruiting for an experienced {title} to join our busy operations team at {company} in {location}. We are committed to providing our drivers with great pay, regular work, and a modern fleet of vehicles.\n\nYour responsibilities will include collecting and delivering loads safely and on time, completing all required documentation accurately, conducting daily vehicle checks, communicating effectively with the transport office, and maintaining high standards of professionalism on the road. We offer local work with no overnight stays required and an excellent benefits package.',
      '{company} is expanding and we need a reliable and safety-conscious {title} to join our growing team based in {location}. We believe our drivers are our most important asset and we invest in both our people and our vehicles.\n\nYou will be responsible for the safe collection and delivery of goods within the {location} area and beyond, following delivery schedules and procedures, maintaining accurate records, and ensuring that your vehicle is kept in excellent condition. Full induction training is provided and there are genuine opportunities to progress into fleet supervisor and transport coordinator roles.',
    ],
    requirements: [
      'Valid UK driving licence appropriate for the role (Cat B / C1 / C / CE)',
      'Current Digital Tachograph Card (for HGV roles)',
      'Certificate of Professional Competence (CPC) for HGV roles',
      'Minimum 12 months commercial driving experience',
      'Clean or near-clean driving licence (max 3 points)',
      'Good geographical knowledge of the region',
      'Ability to work unsupervised and manage your own time effectively',
      'Excellent communication skills for dealing with customers and depot staff',
      'Reliable, punctual, and committed to safety at all times',
      'Ability to complete manual handling tasks where required',
    ],
    benefits: [
      '{salary} — paid weekly',
      'Overtime available at enhanced rates',
      'Company vehicle provided (no vehicle costs for the driver)',
      'Fuel card included — no out-of-pocket fuel expenses',
      '28 days paid annual leave',
      'Pension scheme with employer contributions',
      'Local routes — home every night (no overnight stays)',
      'Regular, consistent shift patterns',
      'Ongoing driver training and CPC periodic training funded',
      'Employee wellbeing and assistance programme',
      'Potential for promotion to transport supervisor / fleet manager',
    ],
  },
  Construction: {
    descs: [
      '{company} is a major UK construction contractor with a strong pipeline of projects across the country. We are currently seeking a skilled and experienced {title} to join our site team in {location} for an exciting project that is due to run for 12–18 months.\n\nYou will be working on a high-quality construction scheme and will be responsible for carrying out your trade to the highest standard, adhering to all health and safety requirements, collaborating with other trades on site, and contributing to a positive and productive working environment. We take safety extremely seriously and all operatives must hold a valid CSCS card and comply with our site rules at all times.',
      'We are looking for a motivated and skilled {title} to join the {company} team working on an exciting development project in {location}. This is a contract opportunity with strong prospects for extension and potential permanent employment for the right individual.\n\nYour role will involve carrying out your specialist trade work to specification and programme, reading and interpreting technical drawings, liaising with site management, maintaining a safe and tidy work area, and mentoring apprentices and junior operatives where required. We offer competitive pay rates and a supportive site management team.',
      '{company} has been delivering outstanding construction projects across the UK for decades and we are currently recruiting for a {title} to join our growing workforce in {location}. We are proud of our reputation for quality craftsmanship and we are looking for individuals who share that commitment.\n\nIn this role you will be responsible for executing your trade work to the required standard and programme, working safely at all times, contributing to a positive team atmosphere, and helping to deliver projects that our clients are proud of. We offer good rates of pay, regular work, and a pathway to full-time employment for the right candidate.',
    ],
    requirements: [
      'Relevant trade qualifications (City and Guilds, NVQ Level 2/3, or equivalent)',
      'Valid CSCS card (correct colour for the trade)',
      'Minimum 2 years\' commercial site experience',
      'Thorough understanding of Health and Safety legislation on site',
      'Ability to read and interpret technical drawings and specifications',
      'IPAF or PASMA ticket is advantageous (working at heights)',
      'First Aid at Work certificate is desirable',
      'Reliable, self-motivated, and able to work under your own initiative',
      'Good communication skills and ability to work as part of a team',
      'Own tools required for most trade roles',
    ],
    benefits: [
      '{salary} — CIS or PAYE available',
      'Overtime available at enhanced rates',
      'Long-term project with genuine extension prospects',
      'All PPE and site induction costs covered',
      '28 days holiday (PAYE operatives)',
      'Company pension scheme (PAYE)',
      'Progression to foreman and site management roles',
      'CSCS and trade certification support for the right candidates',
      'Regular, full-time hours on a managed project site',
      'Supportive and experienced site management team',
      'Potential for permanent employment',
    ],
  },
};

function getContent(job) {
  var cat     = job.category;
  var pool    = DETAIL_CONTENT[cat] || DETAIL_CONTENT['Customer Service'];
  var seed    = job.id % 3;
  var descRaw = pool.descs[seed];
  var desc    = descRaw
    .replace(/\{company\}/g,  job.company)
    .replace(/\{title\}/g,    job.title)
    .replace(/\{location\}/g, job.location)
    .replace(/\{salary\}/g,   job.salary);

  var reqs = pool.requirements.slice(); // all of them
  var bens = pool.benefits.map(function(b){ return b.replace(/\{salary\}/g, job.salary); });
  return { desc: desc, requirements: reqs, benefits: bens };
}

function timeAgo(iso) {
  var s = Math.floor((Date.now() - new Date(iso)) / 1000);
  if (s < 3600)   return 'Today';
  if (s < 86400)  return 'Today';
  if (s < 172800) return 'Yesterday';
  return 'Published on ' + new Date(iso).toLocaleDateString('en-GB', {day:'2-digit',month:'2-digit',year:'numeric'});
}

// Company about text pool
var ABOUT_COMPANIES = {
  Care:             ['{company} is one of the UK\'s leading care providers, with over 200 sites nationwide and more than 10,000 dedicated care professionals. Established for over 25 years, we are committed to delivering person-centred care that respects the dignity, individuality, and choices of every person we support. We are regulated by the Care Quality Commission (CQC) and proud to hold \'Good\' or \'Outstanding\' ratings across our services.','{company} has been supporting adults and older people across the UK for decades. Our mission is simple: to enable the people we support to live the life they choose, in the place they call home. We are an employer of choice in the care sector, investing heavily in staff training, wellbeing, and career development.'],
  Warehouse:        ['{company} is one of the UK\'s top logistics and supply chain operators, moving millions of items every day across a nationwide network of distribution centres. With a fleet of thousands of vehicles and partnerships with the biggest names in retail, e-commerce, and manufacturing, we are central to the UK\'s economy. We are a data-driven, technology-led business that is constantly innovating to improve our operations.','{company} operates cutting-edge warehouse facilities that process over 1 million orders per week. We use the latest automation and picking technology to drive efficiency, but we know that our people are what truly sets us apart. We invest in training, offer clear career pathways, and pride ourselves on being a great place to work.'],
  'Customer Service':['{company} is a household name in the UK, trusted by millions of customers across the country. Our customer service operation handles millions of contacts each year and is at the heart of our commitment to delivering a brilliant customer experience. We are proud to have won multiple industry awards for service excellence and employee engagement.','{company} puts customers first in everything we do. Our contact centre is a modern, dynamic workplace where ambitious people build successful careers. We use the latest CRM and analytics tools, and we are constantly investing in our people through training, coaching, and career development programmes.'],
  Retail:           ['{company} is one of the most beloved retail brands in the UK, with over 500 stores nationwide and a rapidly growing online presence. We are passionate about offering our customers outstanding quality and value, and our colleagues are central to making that happen every day. We have won multiple \'Best Employer\' awards and are known for our inclusive, supportive workplace culture.','{company} has been a fixture on UK high streets for generations. Today we are a modern, multichannel retailer committed to sustainability, quality, and exceptional customer service. We invest heavily in our colleagues\' development and are proud of the thousands of career success stories that have started on our shop floors.'],
  Admin:            ['{company} is a major UK organisation with operations spanning multiple sectors and locations. We employ thousands of professionals across the country and are known for our commitment to excellence, innovation, and people development. Our corporate services teams are the engine that keeps the business running smoothly.','{company} is a leading employer in the UK\'s professional services sector. We are known for our collaborative culture, commitment to work-life balance, and investment in technology and people. Joining our team means becoming part of an organisation that genuinely values its employees and offers real opportunities to grow.'],
  IT:               ['{company} is a technology-driven organisation at the forefront of digital transformation in the UK. We build and maintain the systems and platforms that millions of people rely on every day. Our engineering culture is built on collaboration, continuous improvement, and a genuine passion for technology.','{company} is one of the UK\'s leading technology employers, offering engineers and developers the chance to work on genuinely challenging and impactful problems. We have a strong engineering culture, use modern tooling and practices, and are committed to creating an environment where talented people can do their best work.'],
  Cleaning:         ['{company} is one of the UK\'s largest and most trusted facilities management and cleaning services companies. We work with thousands of clients across the public and private sectors, from schools and hospitals to offices and retail centres. Our reputation for quality, reliability, and professionalism has been built over decades of service.','{company} provides professional cleaning and support services to clients across the UK. We are proud of our people — they are the face of our business and the reason our clients keep coming back. We offer reliable hours, competitive pay, and a genuine commitment to staff wellbeing and development.'],
  Teaching:         ['{company} is a high-performing school or academy trust committed to providing an exceptional education for every child in our care. We have a strong track record of academic achievement, outstanding pastoral care, and a vibrant school community. Our staff are our greatest asset and we invest significantly in professional development and wellbeing.','{company} is an ambitious and inclusive school that believes every child has the potential to succeed. We have a clear vision for the future, a strong and supportive leadership team, and a staff body that is committed, creative, and deeply caring. We are always looking for talented individuals who share our values and want to make a real difference.'],
  Driving:          ['{company} is one of the UK\'s most recognised transport and logistics companies, with a heritage spanning many decades. We operate one of the largest commercial vehicle fleets in the country and pride ourselves on delivering reliability, safety, and professionalism on every journey.','{company} is a growing logistics business with a strong reputation for looking after its drivers. We run a modern fleet of well-maintained vehicles, offer competitive pay rates, and provide genuine support to our team. We believe that happy drivers deliver better service, and that philosophy is at the heart of everything we do.'],
  Construction:     ['{company} is a tier 1 principal contractor and one of the UK\'s most respected names in construction. We deliver projects across residential, commercial, infrastructure, and public sector frameworks, and we have a 40-year track record of quality and reliability. We invest in our people, our technology, and our processes to ensure we remain at the forefront of the industry.','{company} is a dynamic and growing construction company with a strong pipeline of exciting projects. We work across multiple sectors and are known for the quality of our workmanship and the professionalism of our teams. We are committed to investing in our people through training, apprenticeships, and clear career progression pathways.'],
};

var SKILLS = {
  Care:             ['Empathy & Compassion','Active Listening','Personal Care','Record Keeping','Medication Administration','Safeguarding','Dementia Awareness','Team Working'],
  Warehouse:        ['Picking & Packing','Stock Management','Forklift Operation','Health & Safety','RF Scanning','Physical Fitness','Attention to Detail','Team Working'],
  'Customer Service':['Communication','Problem Solving','CRM Systems','Complaint Handling','Active Listening','Multitasking','Empathy','KPI Achievement'],
  Retail:           ['Customer Service','Cash Handling','Merchandising','Stock Control','Teamwork','Product Knowledge','Flexibility','Communication'],
  Admin:            ['Microsoft Office','Data Entry','Diary Management','Communication','Organisation','Confidentiality','Multitasking','Attention to Detail'],
  IT:               ['Agile/Scrum','Git Version Control','API Design','Cloud Platforms','CI/CD Pipelines','Problem Solving','Code Review','Documentation'],
  Cleaning:         ['Attention to Detail','COSHH Knowledge','Time Management','Reliability','Physical Fitness','Initiative','Thoroughness','Equipment Operation'],
  Teaching:         ['Behaviour Management','Differentiation','SEND Support','Lesson Planning','Assessment','Communication','Patience','Teamwork'],
  Driving:          ['Route Planning','Tachograph Compliance','Vehicle Checks','Customer Service','H&S Awareness','Manual Handling','Documentation','Professionalism'],
  Construction:     ['CSCS Card','Drawing Interpretation','H&S Compliance','Trade Skills','IPAF/PASMA','Tool Operation','Quality Control','Teamwork'],
};

var LOOKING_FOR = {
  Care:             'We are looking for someone who genuinely cares about the people they support and who will bring warmth, reliability, and professionalism to the role every single day. You do not need previous experience — what matters most is your attitude, your compassion, and your commitment to making a positive difference.',
  Warehouse:        'We need someone who is hard-working, reliable, and able to keep up with a fast-paced environment. You should be physically fit, a good team player, and committed to health and safety. Previous warehouse experience is helpful but not essential — we will train the right person.',
  'Customer Service':'We are looking for a natural communicator with a genuine desire to help people. You should be able to remain calm under pressure, think on your feet, and always put the customer first. Previous call centre experience is beneficial but a positive attitude and willingness to learn matter more.',
  Retail:           'We want someone friendly and enthusiastic who takes pride in delivering outstanding customer service. You should enjoy working as part of a team, be flexible about hours, and bring a positive and professional attitude to work every day.',
  Admin:            'We are looking for a proactive, detail-oriented professional with excellent organisational skills. You should be able to manage a busy workload, communicate effectively with colleagues at all levels, and maintain high standards of accuracy and confidentiality at all times.',
  IT:               'We need a technically strong, curious, and collaborative individual who takes pride in their craft. You should be comfortable working in an agile environment, able to communicate complex ideas clearly, and passionate about building systems that are reliable, secure, and scalable.',
  Cleaning:         'We are looking for someone who takes genuine pride in their work and understands the importance of maintaining a clean and safe environment. You should be reliable, hardworking, and willing to go the extra mile to ensure every area is left spotless.',
  Teaching:         'We are looking for someone who is passionate about making a difference in children\'s lives. You should be patient, creative, and collaborative, with the ability to build positive relationships with pupils, parents, and colleagues. A genuine love of learning and a commitment to inclusion are essential.',
  Driving:          'We need a safe, professional, and reliable driver who represents our business with pride on every journey. You should be self-motivated, punctual, and have a good attitude towards customer service and your colleagues at the depot.',
  Construction:     'We are looking for an experienced and skilled tradesperson who takes pride in the quality of their work. You must hold all relevant qualifications and tickets, be committed to safety, and be able to work effectively both independently and as part of a wider site team.',
};

var HOURS_INFO = {
  'Full-time':  { hours:'37.5 – 40 hrs/week', pattern:'Monday to Friday' },
  'Part-time':  { hours:'16 – 30 hrs/week',   pattern:'Flexible days' },
  'Contract':   { hours:'37.5 hrs/week',       pattern:'Project-based' },
  'Temporary':  { hours:'Varies',              pattern:'As required' },
  'Zero Hours': { hours:'Flexible',            pattern:'As and when needed' },
};

function renderJob(j) {
  document.title = j.title + ' at ' + j.company + ' | JobsPlatform';

  // Logo
  var logo = document.getElementById('jdLogo');
  logo.textContent = j.logo;
  logo.style.background = 'linear-gradient(135deg,'+j.color+','+j.color+'bb)';

  // Header tags
  document.getElementById('jdType').textContent     = j.type;
  document.getElementById('jdMode').textContent     = j.workMode;
  document.getElementById('jdCategory').textContent = j.category;
  if (j.featured) document.getElementById('jdFeatured').style.display = 'inline-flex';

  document.getElementById('jdTitle').textContent       = j.title;
  document.getElementById('jdCompanyName').textContent = j.company;
  document.getElementById('jdLocation').textContent    = j.location + ', UK';
  document.getElementById('jdSalary').textContent      = j.salary;
  document.getElementById('jdPosted').textContent      = timeAgo(j.postedAt);

  // ── About the company ──
  var aboutPool = ABOUT_COMPANIES[j.category] || ABOUT_COMPANIES['Admin'];
  var aboutRaw  = aboutPool[j.id % aboutPool.length].replace(/\{company\}/g, j.company);
  document.getElementById('jdAboutCompanyName').textContent = j.company;
  document.getElementById('jdAbout').textContent = aboutRaw;

  // Company stats
  var sizeOptions = ['50–200 employees','200–500 employees','500–2,000 employees','2,000–10,000 employees','10,000+ employees'];
  var foundedOpts = ['Founded 1982','Founded 1995','Founded 2003','Founded 1975','Founded 2010'];
  var sectorOpts  = { Care:'Health & Social Care', Warehouse:'Logistics & Supply Chain', 'Customer Service':'Telecommunications & Media', Retail:'Retail & Consumer', Admin:'Professional Services', IT:'Technology', Cleaning:'Facilities Management', Teaching:'Education', Driving:'Transport & Logistics', Construction:'Construction & Engineering' };
  var rng = j.id % 5;
  document.getElementById('jdCompanyStats').innerHTML = [
    '<div class="jd-company-stat"><i class="fa-solid fa-users"></i> '+sizeOptions[rng]+'</div>',
    '<div class="jd-company-stat"><i class="fa-solid fa-calendar"></i> '+foundedOpts[rng]+'</div>',
    '<div class="jd-company-stat"><i class="fa-solid fa-industry"></i> '+(sectorOpts[j.category]||j.category)+'</div>',
    '<div class="jd-company-stat"><i class="fa-solid fa-location-dot"></i> '+j.location+', UK</div>',
  ].join('');

  // ── Contract & hours ──
  var hrs = HOURS_INFO[j.type] || HOURS_INFO['Full-time'];
  var startDate = new Date(); startDate.setDate(startDate.getDate() + 7);
  var startStr  = startDate.toLocaleDateString('en-GB', {day:'2-digit',month:'long',year:'numeric'});
  document.getElementById('jdContractGrid').innerHTML = [
    '<div class="jd-contract-item"><div class="ci-label">Contract type</div><div class="ci-value">'+j.type+'</div></div>',
    '<div class="jd-contract-item"><div class="ci-label">Working hours</div><div class="ci-value">'+hrs.hours+'</div></div>',
    '<div class="jd-contract-item"><div class="ci-label">Work pattern</div><div class="ci-value">'+hrs.pattern+'</div></div>',
    '<div class="jd-contract-item"><div class="ci-label">Salary</div><div class="ci-value">'+j.salary+'</div></div>',
    '<div class="jd-contract-item"><div class="ci-label">Work location</div><div class="ci-value">'+j.workMode+' — '+j.location+'</div></div>',
    '<div class="jd-contract-item"><div class="ci-label">Start date</div><div class="ci-value">'+startStr+'</div></div>',
  ].join('');

  // ── Rich content ──
  var content = getContent(j);

  // Description paragraphs
  var paras = content.desc.split('\n\n');
  document.getElementById('jdDesc').innerHTML = paras.map(function(p){
    return '<p style="margin-bottom:16px;color:var(--muted);line-height:1.85;font-size:15px;">'+p+'</p>';
  }).join('');

  // Requirements
  document.getElementById('jdRequirements').innerHTML = content.requirements.map(function(r){
    return '<li><i class="fa-solid fa-circle-check" style="color:#16a34a;font-size:13px;margin-top:3px;flex-shrink:0;"></i> <span>'+r+'</span></li>';
  }).join('');

  // What we're looking for
  var lf = LOOKING_FOR[j.category] || LOOKING_FOR['Admin'];
  document.getElementById('jdLookingFor').textContent = lf;

  // Skills tags
  var skills = SKILLS[j.category] || SKILLS['Admin'];
  document.getElementById('jdSkills').innerHTML = skills.map(function(s){
    return '<span class="jd-skill-tag"><i class="fa-solid fa-check"></i> '+s+'</span>';
  }).join('');

  // Benefits grid
  document.getElementById('jdBenefits').innerHTML = content.benefits.map(function(b){
    return '<div class="jd-benefit-item"><i class="fa-solid fa-circle-check"></i> <span>'+b+'</span></div>';
  }).join('');

  // Populate apply sidebar
  populateApplySidebar(j);

  // Populate sticky bar
  var sLogo = document.getElementById('stickyLogo');
  sLogo.textContent = j.logo;
  sLogo.style.background = 'linear-gradient(135deg,'+j.color+','+j.color+'bb)';
  document.getElementById('stickyTitle').textContent   = j.title;
  document.getElementById('stickyCompany').textContent = j.company;
  document.getElementById('stickySalary').textContent  = j.salary;

  // Show sticky bar after scrolling past the main Apply button
  var applyCard = document.querySelector('.jd-apply-card');
  var stickyBar = document.getElementById('stickyApplyBar');
  window.addEventListener('scroll', function() {
    if (!applyCard || !stickyBar) return;
    var rect = applyCard.getBoundingClientRect();
    if (rect.bottom < 0) {
      stickyBar.classList.add('visible');
    } else {
      stickyBar.classList.remove('visible');
    }
  }, { passive: true });
}

function populateApplySidebar(j) {
  var sLogo = document.getElementById('apSidebarLogo');
  sLogo.textContent = j.logo;
  sLogo.style.background = 'linear-gradient(135deg,'+j.color+','+j.color+'cc)';
  document.getElementById('apSidebarTitle').textContent   = j.title;
  document.getElementById('apSidebarCompany').textContent = j.company;
  document.getElementById('apSidebarLocation').textContent= j.location;
  document.getElementById('apSidebarType').textContent    = j.type;
  document.getElementById('apSidebarSalary').textContent  = j.salary + ' per year';
}

// ─── APPLY FLOW ──────────────────────────────────────────────
function startApply() {
  var user = JSON.parse(localStorage.getItem('jp_user') || 'null');
  if (!user) {
    var returnUrl = encodeURIComponent('job.html?id=' + currentJob.id + '&apply=1');
    window.location.href = 'login.html?returnUrl=' + returnUrl;
    return;
  }
  // Pre-fill from user data
  document.getElementById('ap_fn').value = user.firstName || user.first_name || '';
  document.getElementById('ap_ln').value = user.lastName  || user.last_name  || '';
  document.getElementById('ap_em').value = user.email     || '';
  showApplyView();
}

function showDetailView() {
  document.getElementById('jobDetailView').style.display  = 'block';
  document.getElementById('applyFormView').style.display  = 'none';
  window.scrollTo({top:0, behavior:'smooth'});
}

function showApplyView() {
  document.getElementById('jobDetailView').style.display  = 'none';
  document.getElementById('applyFormView').style.display  = 'block';
  applyGoStep(1);
  window.scrollTo({top:0, behavior:'smooth'});
}

// ─── STEP LOGIC ──────────────────────────────────────────────
function stopAllCams() {
  if (window.idCamStream)     { idCamStream.getTracks().forEach(function(t){t.stop();}); idCamStream = null; }
  if (window.selfieCamStream) { selfieCamStream.getTracks().forEach(function(t){t.stop();}); selfieCamStream = null; }
}

function applyGoStep(n) {
  if (n !== 2 && n !== 3) stopAllCams();
  for (var i = 1; i <= 4; i++) {
    var stepEl = document.getElementById('applyStep'+i);
    if (stepEl) stepEl.style.display = i===n ? 'block' : 'none';
    var circle = document.querySelector('#astep'+i+' .apply-step-circle');
    var label  = document.getElementById('astep'+i);
    if (!circle || !label) continue;
    circle.classList.remove('active','done');
    label.classList.remove('active','done');
    if (i < n)      { circle.classList.add('done');   label.classList.add('done');   circle.innerHTML='<i class="fa-solid fa-check"></i>'; }
    else if (i===n) { circle.classList.add('active');  label.classList.add('active'); circle.textContent=i; }
    else            { circle.textContent=i; }
    var line = document.getElementById('aline'+i);
    if (line) line.classList.toggle('done', i < n);
  }
  applyCurrentStep = n;
  if (n === 3) { setTimeout(function(){ livenessReset(); selfieCamInit(); }, 200); }
}

function markField(id, ok, msg) {
  var el = document.getElementById(id);
  if (!el) return true;
  el.style.borderColor = ok ? '' : '#dc2626';
  if (!ok && msg) { showApplyMsg('applyMsg1', msg, 'error'); }
  return ok;
}

function applyStep2() {
  var fn   = document.getElementById('ap_fn').value.trim();
  var ln   = document.getElementById('ap_ln').value.trim();
  var em   = document.getElementById('ap_em').value.trim();
  var ph   = document.getElementById('ap_ph').value.trim();
  var city = document.getElementById('ap_city').value.trim();
  var post = document.getElementById('ap_post').value.trim();
  var addr = document.getElementById('ap_addr').value.trim();
  var dob  = document.getElementById('ap_dob').value;

  // Reset all borders
  ['ap_fn','ap_ln','ap_em','ap_ph','ap_city','ap_post','ap_addr','ap_dob'].forEach(function(id){
    document.getElementById(id).style.borderColor = '';
  });

  // Required fields
  if (!fn)   { markField('ap_fn',   false); showApplyMsg('applyMsg1','First name is required.','error'); return; }
  if (!ln)   { markField('ap_ln',   false); showApplyMsg('applyMsg1','Last name is required.','error'); return; }

  // Email
  if (!em || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) {
    markField('ap_em', false); showApplyMsg('applyMsg1','Please enter a valid email address.','error'); return;
  }

  // Phone: must have 10-15 digits (UK: 07xxx xxxxxx or +44 7xxx xxxxxx)
  var digits = ph.replace(/\D/g,'');
  if (!ph || digits.length < 10 || digits.length > 15) {
    markField('ap_ph', false); showApplyMsg('applyMsg1','Please enter a valid UK phone number (e.g. 07700 900123).','error'); return;
  }

  // City: letters only, min 2 chars
  if (!city || city.length < 2 || !/^[a-zA-Z\s\-]+$/.test(city)) {
    markField('ap_city', false); showApplyMsg('applyMsg1','Please enter a valid city name.','error'); return;
  }

  // UK Postcode: e.g. SW1A 1AA, M1 1AE, EC1A 1BB
  if (!post || !/^[A-Z]{1,2}[0-9][0-9A-Z]?\s?[0-9][A-Z]{2}$/i.test(post)) {
    markField('ap_post', false); showApplyMsg('applyMsg1','Please enter a valid UK postcode (e.g. SW1A 1AA).','error'); return;
  }

  // Address: min 5 chars, must have a number
  if (!addr || addr.length < 5 || !/\d/.test(addr)) {
    markField('ap_addr', false); showApplyMsg('applyMsg1','Please enter a full address including house number.','error'); return;
  }

  // Date of birth: required, must be 16-80 years old
  if (!dob) { markField('ap_dob', false); showApplyMsg('applyMsg1','Please enter your date of birth.','error'); return; }
  var age = (new Date() - new Date(dob)) / (365.25 * 24 * 3600 * 1000);
  if (age < 16 || age > 80) {
    markField('ap_dob', false); showApplyMsg('applyMsg1','You must be at least 16 years old to apply.','error'); return;
  }

  showApplyMsg('applyMsg1', '', '');
  applyGoStep(2);
}

function applyStep3() {
  var cvFile = document.getElementById('apCvFile').files[0];
  var idFile = document.getElementById('apIdFile').files[0];
  var hasIdCam = !!window._idCapturedDataUrl;
  if (!cvFile) { showApplyMsg('applyMsg2','Please upload your CV.','error'); return; }
  if (!idFile && !hasIdCam) { showApplyMsg('applyMsg2','Please provide your identity document.','error'); return; }
  showApplyMsg('applyMsg2','','');
  applyGoStep(3);
}

function applyStep4() {
  if (!window._selfieCapturedDataUrl) { showApplyMsg('applyMsg3s','Please complete face verification.','error'); return; }
  showApplyMsg('applyMsg3s','','');
  var cvFile = document.getElementById('apCvFile').files[0];
  var idFile = document.getElementById('apIdFile').files[0];
  var rev = document.getElementById('reviewData');
  rev.innerHTML = [
    ['Name',    document.getElementById('ap_fn').value + ' ' + document.getElementById('ap_ln').value],
    ['Email',   document.getElementById('ap_em').value],
    ['Phone',   document.getElementById('ap_ph').value],
    ['City',    document.getElementById('ap_city').value],
    ['Address', document.getElementById('ap_addr').value],
    ['CV',      cvFile ? cvFile.name : '✓ Uploaded'],
    ['ID Doc',  idFile ? idFile.name : '✓ Camera capture'],
    ['Selfie',  '✓ Verified'],
  ].map(function(r){
    return '<div class="review-row"><span>'+r[0]+'</span><strong>'+r[1]+'</strong></div>';
  }).join('');
  applyGoStep(4);
}

function apPreviewCv() {
  var file = document.getElementById('apCvFile').files[0];
  if (!file) return;
  var box = document.getElementById('apCvPreview');
  box.innerHTML = '<i class="fa-solid fa-file-pdf" style="font-size:32px;color:#e53e3e;margin-bottom:8px;"></i><span style="font-weight:600;font-size:14px;color:var(--green);">'+file.name+'</span><small style="color:var(--muted);">'+formatSz(file.size)+'</small>';
  document.getElementById('cvUploadBox').classList.add('has-file');
}

function apSelectId(type) {
  document.getElementById('apIdNational').classList.toggle('active', type==='national');
  document.getElementById('apIdPassport').classList.toggle('active', type==='passport');
  var lbl = document.getElementById('apIdLabel');
  if (lbl) lbl.textContent = type==='passport' ? 'Passport' : 'National ID Card';
}

// ─── ID SOURCE TOGGLE ────────────────────────────────────────
function idSetSource(src) {
  document.getElementById('idSrcCamera').classList.toggle('active', src==='camera');
  document.getElementById('idSrcUpload').classList.toggle('active', src==='upload');
  document.getElementById('idCameraMode').style.display = src==='camera' ? 'block' : 'none';
  document.getElementById('idUploadMode').style.display = src==='upload' ? 'block' : 'none';
  if (src==='camera') idCamStart();
}

// ─── ID CAMERA ───────────────────────────────────────────────
var idCamStream = null;

async function idCamStart() {
  var video = document.getElementById('idCamVideo');
  var idle  = document.getElementById('idCamIdle');
  try {
    idCamStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment', width: { ideal: 1280 } } });
    video.srcObject = idCamStream;
    video.style.display = 'block';
    if (idle) idle.style.display = 'none';
    document.getElementById('idStartBtn').style.display   = 'none';
    document.getElementById('idCaptureBtn').style.display = 'inline-flex';
    document.getElementById('idRetryBtn').style.display   = 'none';
    document.getElementById('idCamBtns').style.display    = 'flex';
  } catch(e) {
    if (idle) idle.innerHTML = '<i class="fa-solid fa-triangle-exclamation" style="font-size:28px;color:#f97316;margin-bottom:8px;"></i><span style="font-size:13px;color:#9ca3af;">Camera not available — use Upload</span>';
    idSetSource('upload');
  }
}

function idCamCapture() {
  var video  = document.getElementById('idCamVideo');
  var canvas = document.getElementById('idCamCanvas');
  var img    = document.getElementById('idCapturedImg');
  canvas.width  = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext('2d').drawImage(video, 0, 0);
  var dataUrl = canvas.toDataURL('image/jpeg', 0.92);
  img.src = dataUrl;
  img.style.display = 'block';
  video.style.display = 'none';
  if (idCamStream) { idCamStream.getTracks().forEach(function(t){t.stop();}); idCamStream = null; }
  document.getElementById('idCaptureBtn').style.display = 'none';
  document.getElementById('idRetryBtn').style.display   = 'inline-flex';
  window._idCapturedDataUrl = dataUrl;
}

function idCamRetry() {
  document.getElementById('idCapturedImg').style.display = 'none';
  window._idCapturedDataUrl = null;
  document.getElementById('idRetryBtn').style.display   = 'none';
  idCamStart();
}

function apPreviewId() {
  var file = document.getElementById('apIdFile').files[0];
  if (!file) return;
  var box = document.getElementById('apIdPreview');
  box.innerHTML = '<i class="fa-solid fa-circle-check" style="font-size:32px;color:var(--green);margin-bottom:8px;"></i><span style="font-size:13px;font-weight:600;color:var(--green);">'+file.name+'</span><small style="color:var(--muted);">'+formatSz(file.size)+'</small>';
  box.parentElement.classList.add('has-file');
}

// ─── SELFIE CAMERA ───────────────────────────────────────────
var selfieCamStream = null;

// ─── LIVENESS CHECK ──────────────────────────────────────────
var livenessSteps = [
  { label: 'STEP 1 / 5', text: 'Look straight ahead',  arrow: null,    duration: 2200 },
  { label: 'STEP 2 / 5', text: 'Turn your head left',  arrow: 'left',  duration: 2200 },
  { label: 'STEP 3 / 5', text: 'Turn your head right', arrow: 'right', duration: 2200 },
  { label: 'STEP 4 / 5', text: 'Look up slowly',       arrow: 'up',    duration: 2000 },
  { label: 'STEP 5 / 5', text: 'Look back straight',   arrow: null,    duration: 1800 },
];
var livenessIdx = 0;
var livenessTimer = null;
var livenessActive = false;

function hideAllArrows() {
  ['arrowLeft','arrowRight','arrowUp','arrowDown'].forEach(function(id){
    var el = document.getElementById(id);
    if (el) el.classList.remove('show');
  });
}

function showArrow(dir) {
  hideAllArrows();
  if (!dir) return;
  var el = document.getElementById('arrow' + dir.charAt(0).toUpperCase() + dir.slice(1));
  if (el) el.classList.add('show');
}

function livenessReset() {
  livenessIdx = 0; livenessActive = false;
  if (livenessTimer) { clearTimeout(livenessTimer); livenessTimer = null; }
  var bar = document.getElementById('livenessBar');
  if (bar) bar.style.display = 'none';
  var prog = document.getElementById('livenessProgress');
  if (prog) prog.style.width = '0%';
  hideAllArrows();
  document.getElementById('selfieCaptureBtn').style.display = 'none';
  document.getElementById('selfieRetryBtn').style.display   = 'none';
  var nextBtn = document.getElementById('selfieNextBtn');
  if (nextBtn) nextBtn.style.display = 'none';
}

function livenessStart() {
  livenessActive = true;
  document.getElementById('livenessBar').style.display = 'block';
  livenessRunStep();
}

function livenessRunStep() {
  if (livenessIdx >= livenessSteps.length) {
    livenessComplete(); return;
  }
  var step = livenessSteps[livenessIdx];
  document.getElementById('livenessIcon').textContent = step.label;
  document.getElementById('livenessText').textContent = step.text;
  showArrow(step.arrow);
  var prog = document.getElementById('livenessProgress');
  prog.style.transition = 'none'; prog.style.width = '0%';
  var pct = ((livenessIdx + 1) / livenessSteps.length * 100).toFixed(0) + '%';
  setTimeout(function() {
    prog.style.transition = 'width ' + (step.duration/1000) + 's linear';
    prog.style.width = pct;
  }, 50);
  livenessTimer = setTimeout(function() {
    livenessIdx++;
    livenessRunStep();
  }, step.duration);
}

function livenessComplete() {
  hideAllArrows();
  document.getElementById('livenessIcon').textContent = 'VERIFIED';
  document.getElementById('livenessText').textContent = 'Face verified — take your photo now';
  document.getElementById('livenessProgress').style.width = '100%';
  document.getElementById('selfieCaptureBtn').style.display = 'inline-flex';
}

async function selfieCamInit() {
  var video = document.getElementById('selfieCamVideo');
  if (video.style.display === 'block') return;
  var preview = document.getElementById('apSelfiePreview');
  try {
    selfieCamStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user', width: { ideal: 720 } } });
    video.srcObject = selfieCamStream;
    video.style.display = 'block';
    if (preview) preview.style.display = 'none';
    document.getElementById('selfieRetryBtn').style.display = 'none';
    document.getElementById('selfieCaptureBtn').style.display = 'none';
    var dots = document.getElementById('selfieDots');
    if (dots) dots.style.display = 'block';
    var scan = document.getElementById('selfieScan');
    if (scan) scan.style.display = 'block';
    setTimeout(livenessStart, 800);
  } catch(e) {
    if (preview) {
      preview.style.display = 'flex';
      preview.innerHTML =
        '<i class="fa-solid fa-ban" style="font-size:32px;color:#dc2626;margin-bottom:10px;"></i>' +
        '<span style="font-size:14px;font-weight:700;color:#dc2626;">Camera access required</span>' +
        '<small style="color:#9ca3af;margin-top:6px;text-align:center;line-height:1.5;">Please allow camera access in your browser settings and try again.</small>' +
        '<button onclick="selfieCamRetry()" style="margin-top:12px;padding:10px 20px;background:#2563eb;color:#fff;border:none;border-radius:10px;font-size:13px;font-weight:600;cursor:pointer;font-family:inherit;"><i class=\"fa-solid fa-rotate-left\"></i> Try Again</button>';
    }
    document.getElementById('livenessBar').style.display = 'none';
  }
}

function selfieCamCapture() {
  var video  = document.getElementById('selfieCamVideo');
  var canvas = document.getElementById('selfieCamCanvas');
  var img    = document.getElementById('selfieCapturedImg');
  canvas.width  = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext('2d').drawImage(video, 0, 0);
  var dataUrl = canvas.toDataURL('image/jpeg', 0.92);
  img.src = dataUrl;
  img.style.display = 'block';
  video.style.display = 'none';
  if (selfieCamStream) { selfieCamStream.getTracks().forEach(function(t){t.stop();}); selfieCamStream = null; }
  document.getElementById('selfieCaptureBtn').style.display = 'none';
  document.getElementById('selfieRetryBtn').style.display   = 'inline-flex';
  document.getElementById('livenessBar').style.display = 'none';
  hideAllArrows();
  var dots = document.getElementById('selfieDots');
  if (dots) dots.style.display = 'none';
  var scan = document.getElementById('selfieScan');
  if (scan) scan.style.display = 'none';
  var nextBtn = document.getElementById('selfieNextBtn');
  if (nextBtn) nextBtn.style.display = 'inline-flex';
  window._selfieCapturedDataUrl = dataUrl;
}

function selfieCamRetry() {
  document.getElementById('selfieCapturedImg').style.display = 'none';
  window._selfieCapturedDataUrl = null;
  livenessReset();
  selfieCamInit();
}

function apPreviewSelfie() {
  var file = document.getElementById('apSelfie').files[0];
  if (!file) return;
  var reader = new FileReader();
  reader.onload = function(e) {
    window._selfieCapturedDataUrl = e.target.result;
    document.getElementById('selfieCapturedImg').src = e.target.result;
    document.getElementById('selfieCapturedImg').style.display = 'block';
    document.getElementById('apSelfiePreview').style.display = 'none';
    document.getElementById('selfieRetryBtn').style.display = 'inline-flex';
    document.getElementById('selfieCaptureBtn').style.display = 'none';
  };
  reader.readAsDataURL(file);
}

function formatSz(b) { return b>1048576 ? (b/1048576).toFixed(1)+' MB' : (b/1024).toFixed(0)+' KB'; }

function toBase64(file) {
  return new Promise(function(resolve) {
    var reader = new FileReader();
    reader.onload  = function(e) { resolve(e.target.result); };
    reader.onerror = function()  { resolve(null); };
    reader.readAsDataURL(file);
  });
}

function dataUrlToBlob(dataUrl) {
  var parts = dataUrl.split(',');
  var mime  = parts[0].match(/:(.*?);/)[1];
  var raw   = atob(parts[1]);
  var arr   = new Uint8Array(raw.length);
  for (var i = 0; i < raw.length; i++) arr[i] = raw.charCodeAt(i);
  return new Blob([arr], { type: mime });
}

async function uploadToStorage(bucket, path, blob) {
  if (!window.sb) return null;
  var { data, error } = await window.sb.storage.from(bucket).upload(path, blob, { upsert: true });
  if (error) { console.warn('Upload error:', error.message); return null; }
  return data.path;
}

async function submitApply() {
  document.getElementById('submitApplyTxt').style.display  = 'none';
  document.getElementById('submitApplySpin').style.display = 'inline';

  var fn    = document.getElementById('ap_fn').value.trim();
  var ln    = document.getElementById('ap_ln').value.trim();
  var em    = document.getElementById('ap_em').value.trim();
  var ph    = document.getElementById('ap_ph').value.trim();
  var city  = document.getElementById('ap_city').value.trim();
  var post  = document.getElementById('ap_post').value.trim();
  var addr  = document.getElementById('ap_addr').value.trim();
  var dob   = document.getElementById('ap_dob').value;
  var cover = document.getElementById('ap_cover').value.trim();

  var cvFile = document.getElementById('apCvFile').files[0];
  var idFile = document.getElementById('apIdFile').files[0];

  var ts = Date.now();
  var safeName = (fn + '_' + ln).replace(/\s+/g, '_').toLowerCase();

  var cvPath      = null;
  var idDocPath   = null;
  var selfiePath  = null;

  if (window.sb) {
    // Upload CV
    if (cvFile) {
      cvPath = await uploadToStorage('cvs', safeName + '_' + ts + '_cv.pdf', cvFile);
    }

    // Upload ID (file or camera capture)
    var idBlob = idFile ? idFile : (window._idCapturedDataUrl ? dataUrlToBlob(window._idCapturedDataUrl) : null);
    if (idBlob) {
      var idExt = idFile ? (idFile.name.split('.').pop() || 'jpg') : 'jpg';
      idDocPath = await uploadToStorage('documents', safeName + '_' + ts + '_id.' + idExt, idBlob);
    }

    // Upload selfie (camera capture)
    if (window._selfieCapturedDataUrl) {
      var selfieBlob = dataUrlToBlob(window._selfieCapturedDataUrl);
      selfiePath = await uploadToStorage('photos', safeName + '_' + ts + '_selfie.jpg', selfieBlob);
    }

    // Insert into applications table
    var { error: dbErr } = await window.sb.from('applications').insert({
      job_id:       currentJob.id   || null,
      job_title:    currentJob.title || '',
      company:      currentJob.company || '',
      location:     currentJob.location || '',
      first_name:   fn,
      last_name:    ln,
      email:        em,
      phone:        ph,
      city:         city,
      postal_code:  post,
      address:      addr,
      birth_date:   dob,
      cover_letter: cover,
      cv_url:       cvPath,
      id_doc_url:   idDocPath,
      selfie_url:   selfiePath,
      status:       'pending',
    });
    if (dbErr) console.warn('DB insert error:', dbErr.message);
  }

  // Save locally as backup
  var apps = JSON.parse(localStorage.getItem('jp_applications') || '[]');
  apps.push({
    jobId: currentJob.id, jobTitle: currentJob.title, company: currentJob.company,
    appliedAt: new Date().toISOString(), name: fn + ' ' + ln, email: em,
  });
  localStorage.setItem('jp_applications', JSON.stringify(apps));

  await new Promise(function(r) { setTimeout(r, 800); });

  for (var i = 1; i <= 4; i++) { var s = document.getElementById('applyStep'+i); if (s) s.style.display = 'none'; }
  document.getElementById('applySuccess').style.display = 'block';
}

function showApplyMsg(id, text, type) {
  var el = document.getElementById(id);
  if (!el) return;
  el.textContent = text;
  el.className   = text ? 'form-msg '+type : 'form-msg';
}

// ─── INIT (at bottom so all data pools are defined first) ────
window.addEventListener('DOMContentLoaded', function() {
  var params = new URLSearchParams(window.location.search);
  var jobId  = parseInt(params.get('id'));
  if (!jobId) { window.location.href = 'jobs.html'; return; }

  // Direct lookup: engineIndex = jobId - 10000
  var engineIdx = jobId - 10000;
  if (engineIdx >= 0 && window.generateJob) {
    currentJob = window.generateJob(engineIdx);
  }

  if (!currentJob) {
    currentJob = { id:jobId, title:'Job Position', company:'Company', logo:'JP',
      color:'#2563eb', location:'London', type:'Full-time', salary:'£28k–£35k',
      category:'Admin', workMode:'On-site', response:48, featured:false,
      postedAt:new Date().toISOString(), desc:'Exciting opportunity. Apply now.' };
  }

  renderJob(currentJob);

  // Auto-open apply form if returning from login
  if (params.get('apply') === '1') {
    var user = JSON.parse(localStorage.getItem('jp_user')||'null');
    if (user) setTimeout(startApply, 400);
  }
});
