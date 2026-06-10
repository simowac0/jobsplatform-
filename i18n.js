// ─── EXTENDED i18n — UI, filters, apply form, job metadata ───
window.JP_META = {
  type: {
    'Full-time':   { fr: 'Temps plein', de: 'Vollzeit', es: 'Tiempo completo' },
    'Part-time':   { fr: 'Temps partiel', de: 'Teilzeit', es: 'Tiempo parcial' },
    'Temporary':   { fr: 'Temporaire', de: 'Befristet', es: 'Temporal' },
    'Contract':    { fr: 'Contrat', de: 'Vertrag', es: 'Contrato' },
    'Zero Hours':  { fr: 'Heures zéro', de: 'Null-Stunden', es: 'Horas cero' },
  },
  workMode: {
    'On-site': { fr: 'Sur site', de: 'Vor Ort', es: 'Presencial' },
    'Remote':  { fr: 'Télétravail', de: 'Remote', es: 'Remoto' },
    'Hybrid':  { fr: 'Hybride', de: 'Hybrid', es: 'Híbrido' },
  },
  category: {
    'Care':               { fr: 'Soins', de: 'Pflege', es: 'Cuidados' },
    'Warehouse':          { fr: 'Entrepôt', de: 'Lager', es: 'Almacén' },
    'Customer Service':   { fr: 'Service client', de: 'Kundenservice', es: 'Atención al cliente' },
    'Retail':             { fr: 'Commerce', de: 'Einzelhandel', es: 'Retail' },
    'Admin':              { fr: 'Administration', de: 'Verwaltung', es: 'Administración' },
    'IT':                 { fr: 'Informatique', de: 'IT', es: 'Informática' },
    'Cleaning':           { fr: 'Nettoyage', de: 'Reinigung', es: 'Limpieza' },
    'Teaching':           { fr: 'Enseignement', de: 'Bildung', es: 'Educación' },
    'Driving':            { fr: 'Conduite', de: 'Fahren', es: 'Conducción' },
    'Construction':       { fr: 'Construction', de: 'Bau', es: 'Construcción' },
  },
};

window.JP_UI = {
  en: {
    verified: 'Verified', featured: 'Featured', new_badge: 'New', just_posted: 'Just posted',
    replies_in: 'Replies in', live: 'Live', sort_label: 'Sort:',
    showing: 'Showing', of: 'of', jobs_word: 'jobs', no_jobs: 'No jobs found',
    no_jobs_sub: 'Try removing some filters.', clear_filters: 'Clear filters',
    reset_filters: 'Reset all filters', filter_job_type: 'Job Type', filter_salary: 'Salary Range',
    filter_category: 'Category', filter_location: 'Work Location', filter_response: 'Response Time',
    any_salary: 'Any salary', under_20k: 'Under £20k', sal_20_30: '£20k – £30k',
    sal_30_50: '£30k – £50k', sal_50_plus: '£50k+', any_resp: 'Any', within_24h: 'Within 24h', within_48h: 'Within 48h',
    save: 'Save', saved: 'Saved', apply: 'Apply Now', apply_now: 'Apply now',
    back_jobs: 'Back to jobs', back_job: 'Back to job',
    about_company: 'About', contract_hours: 'Contract & Hours', job_desc: 'Job Description',
    requirements: 'Requirements', looking_for: "What We're Looking For",
    benefits: 'Benefits & Perks', need_help: 'Need help?',
    need_help_sub: 'Our team is available to assist you with your application.',
    quick_apply: 'Quick apply', quick_apply_sub: 'Quick application – 5 minutes maximum',
    apply_title: 'Apply to this position',
    apply_sub: 'Complete the steps below to submit your application. ID verification is required.',
    step_personal: 'Personal Info', step_docs: 'Documents', step_face: 'Face ID', step_review: 'Review',
    fn: 'First name', ln: 'Last name', email: 'Email', phone: 'Phone', city: 'City',
    postcode: 'Postal code', address: 'Address', dob: 'Birth date', required: 'Required',
    continue: 'Continue', back: 'Back', submit: 'Submit Application',
    docs_title: 'Documents & Verification', docs_sub: 'Your data is encrypted and only used for verification.',
    cv_label: 'CV / Resume', cv_upload: 'Click to upload your CV', cv_hint: 'PDF only · Max 5MB',
    id_national: 'National ID', id_passport: 'Passport', camera: 'Camera', upload: 'Upload',
    id_front: 'Front side — hold flat in frame', docs_encrypted: 'Your documents are encrypted and only used for identity verification.',
    face_title: 'Identity Verification (KYC)', face_sub: 'Follow the on-screen instructions. We will record a 10-second video and capture your photo — like Shopify banking verification.',
    live_straight: 'Look straight ahead', live_left: 'Turn your head left', live_right: 'Turn your head right',
    live_up: 'Look up slowly', live_straight2: 'Look back straight', kyc_capturing_photo: 'Capturing your photo...',
    kyc_photo_captured: 'Video and photo captured successfully',
    face_recording: 'Recording', face_seconds: 'seconds', face_complete: 'Video recorded successfully',
    face_retry: 'Retry', face_continue: 'Continue',
    review_title: 'Review your application', review_sub: 'Check your details before submitting.',
    cover_letter: 'Cover Letter', cover_optional: '(optional)',
    cover_ph: 'Tell the employer why you are a great fit...',
    success_title: 'Application Submitted!', success_sub: 'The employer will respond within <strong>48 hours</strong>. Good luck!',
    browse_more: 'Browse More Jobs', job_details: 'Job details', contract: 'Contract', salary: 'Salary',
    good_to_know: 'Good to know: This company typically responds within <strong>48 hours</strong>.',
    perk_easy: 'Easy Apply', perk_training: 'Training Provided', perk_no_degree: 'No Degree Required', perk_salary: 'Salary Shown',
    built_with: 'Built with care for better hiring',
    contract_type: 'Contract type', working_hours: 'Working hours', work_pattern: 'Work pattern',
    work_location: 'Work location', start_date: 'Start date', per_year: 'per year', per_hour: 'per hour',
    pillar_no_ghost: 'No Ghost Jobs', pillar_salary: 'Salary Transparent', pillar_response: 'Human Response', pillar_verified: 'Verified Listings',
    footer_tagline: "The UK's most trusted job board for verified listings and guaranteed employer responses.",
    companies_h1: 'Verified <span class="highlight">Employers</span>',
    companies_sub: 'Trusted UK companies hiring on JobsPlatform right now',
    sync_new: 'new job', sync_news: 'new jobs', sync_posted: 'just posted!',
    time_just: 'Just now', time_min: 'min ago', time_h: 'h ago', time_1d: '1 day ago', time_d: 'days ago',
    err_fn: 'First name is required.', err_ln: 'Last name is required.', err_email: 'Please enter a valid email address.',
    err_phone: 'Please enter a valid UK phone number (e.g. 07700 900123).', err_city: 'Please enter a valid city name.',
    err_post: 'Please enter a valid UK postcode (e.g. SW1A 1AA).', err_addr: 'Please enter a full address including house number.',
    err_dob: 'Please enter your date of birth.', err_age: 'You must be at least 16 years old to apply.',
    err_cv: 'Please upload your CV.', err_id: 'Please provide your identity document.',
    err_face: 'Please complete identity verification (video + photo).', err_submit: 'Failed to save application. Please try again.',
    review_name: 'Name', review_cv: 'CV', review_id: 'ID Doc', review_face: 'Face Video', review_uploaded: '✓ Uploaded',
    review_captured: '✓ Camera capture', review_verified: '✓ Verified',
    google_btn: 'Continue with Google', or_signin: 'or sign in with email', or_register: 'or create account with email',
    forgot: 'Forgot?', no_account: "Don't have an account?", create_free: 'Create one free',
    has_account: 'Already have an account?', sign_in_link: 'Sign in', password: 'Password',
    create_account: 'Create Account', sign_in_btn: 'Sign In', first_name: 'First name', last_name: 'Last name',
    browse_jobs: 'Browse Jobs', sign_out: 'Sign Out',
    listings_active: 'active listings · All salaries shown · Employers respond within 48h',
    apply_modal_sub: 'You are applying as', apply_modal_submit: 'Submit Application',
    apply_modal_success: 'Application sent! The employer will respond within 48 hours.',
    jobs_count_label: 'jobs',
    cat_remote: 'Remote', cat_companies: 'Verified Companies', cat_it_tech: 'IT / Tech',
    employers_count: '500+ employers',
    footer_seekers: 'For Job Seekers', footer_employers: 'For Employers', footer_company: 'Company',
    footer_browse: 'Browse Jobs', footer_profile: 'Create Profile', footer_alerts: 'Job Alerts',
    footer_post: 'Post a Job', footer_emp_login: 'Employer Login',
    footer_about: 'About Us', footer_privacy: 'Privacy Policy', footer_terms: 'Terms of Service',
    footer_rights: '© 2026 JobsPlatform. All rights reserved.', footer_made: 'Made in the UK',
    loading_jobs: 'Loading jobs...',
    feat1_title: 'No Ghost Jobs', feat1_desc: '100% verified listings. Every job is confirmed active before going live. No more applying to positions that filled months ago.', feat1_stat: '100% Verified',
    feat2_title: 'Response Guarantee', feat2_desc: 'Employers commit to responding within 48 hours. No more waiting weeks in silence wondering if anyone read your CV.', feat2_stat: '48h Wait Max',
    feat3_title: 'Salary Upfront', feat3_desc: 'Every listing shows the full salary range. No more wasting time on interviews only to find out the pay doesn\'t work.', feat3_stat: '100% Transparent',
    feat4_title: 'Culture Fit', feat4_desc: 'Rich employer profiles show work culture, team size, and values so you can find a place where you\'ll actually stay.', feat4_stat: '89% Retention',
    eliminates_h3: 'We Eliminate:',
    elim1: 'Vague job postings', elim2: 'Employer silence', elim3: 'CV black holes', elim4: 'Hidden salaries', elim5: 'Fake listings', elim6: 'Unpaid tests',
    step1_title: 'Create Your Profile', step1_desc: 'Build a standout profile in minutes. Add your skills, experience, and what matters to you in a workplace.',
    step1_quote: '"I set up my profile in under 10 minutes and had 3 interviews booked by the end of the week." — Sarah T.',
    step2_title: 'Browse Verified Jobs', step2_desc: 'Search thousands of real, active listings with full salary details. Filter by location, hours, and industry.',
    step2_quote: '"Finally — job listings that actually show the salary and aren\'t 3 months old." — Marcus B.',
    step3_title: 'Apply & Get Responses', step3_desc: 'Apply with one click. Employers are committed to responding within 48 hours — no more silence.',
    step3_quote: '"Got a call back within a day. This is how job searching should work." — Priya K.',
    testi1_text: '"After months of no responses on other sites, I found a job here in two weeks. The salary transparency alone saved me so much time."',
    testi1_name: 'Anna P.', testi1_role: 'Now at Tesco',
    testi2_text: '"I was nervous about re-entering the job market after a gap. The no-experience filter and the quick responses made all the difference."',
    testi2_name: 'James W.', testi2_role: 'Now at Amazon',
    testi3_text: '"The verified listings are a game changer. No more applying to ghost jobs. Every application I sent got a real response."',
    testi3_name: 'Sophie B.', testi3_role: 'Now at NHS',
    hero_card_title: 'Senior Care Assistant', hero_card_company: 'SunCare Group', hero_card_loc: 'Manchester', hero_card_type: 'Full-time', hero_card_salary: '£28k–£32k',
    hero_card_respond: 'Responds within 24h', hero_stat_jobs: 'Jobs this week', hero_stat_resp: 'Avg. response', hero_stat_sat: 'Satisfaction', hero_stat_spam: 'Spam listings',
    cta_stat_users: 'Active Users', cta_stat_jobs: 'Jobs This Week', cta_stat_sat: 'Satisfaction',
  },
  fr: {
    verified: 'Vérifié', featured: 'En vedette', new_badge: 'Nouveau', just_posted: 'Publié à l\'instant',
    replies_in: 'Réponse sous', live: 'En direct', sort_label: 'Trier :',
    showing: 'Affichage', of: 'sur', jobs_word: 'offres', no_jobs: 'Aucune offre trouvée',
    no_jobs_sub: 'Essayez de retirer des filtres.', clear_filters: 'Effacer les filtres',
    reset_filters: 'Réinitialiser les filtres', filter_job_type: 'Type de contrat', filter_salary: 'Fourchette salariale',
    filter_category: 'Catégorie', filter_location: 'Lieu de travail', filter_response: 'Délai de réponse',
    any_salary: 'Tout salaire', under_20k: 'Moins de 20k£', sal_20_30: '20k£ – 30k£',
    sal_30_50: '30k£ – 50k£', sal_50_plus: '50k£+', any_resp: 'Tous', within_24h: 'Sous 24h', within_48h: 'Sous 48h',
    save: 'Sauvegarder', saved: 'Sauvegardé', apply: 'Postuler', apply_now: 'Postuler',
    back_jobs: 'Retour aux offres', back_job: 'Retour à l\'offre',
    about_company: 'À propos de', contract_hours: 'Contrat & Horaires', job_desc: 'Description du poste',
    requirements: 'Exigences', looking_for: 'Ce que nous recherchons',
    benefits: 'Avantages', need_help: 'Besoin d\'aide ?',
    need_help_sub: 'Notre équipe est disponible pour vous accompagner.',
    quick_apply: 'Candidature rapide', quick_apply_sub: 'Candidature rapide – 5 minutes maximum',
    apply_title: 'Postuler à ce poste',
    apply_sub: 'Complétez les étapes ci-dessous. La vérification d\'identité est requise.',
    step_personal: 'Infos personnelles', step_docs: 'Documents', step_face: 'Face ID', step_review: 'Révision',
    fn: 'Prénom', ln: 'Nom', email: 'E-mail', phone: 'Téléphone', city: 'Ville',
    postcode: 'Code postal', address: 'Adresse', dob: 'Date de naissance', required: 'Requis',
    continue: 'Continuer', back: 'Retour', submit: 'Envoyer la candidature',
    docs_title: 'Documents & Vérification', docs_sub: 'Vos données sont chiffrées et utilisées uniquement pour la vérification.',
    cv_label: 'CV', cv_upload: 'Cliquez pour télécharger votre CV', cv_hint: 'PDF uniquement · Max 5 Mo',
    id_national: 'Carte d\'identité', id_passport: 'Passeport', camera: 'Caméra', upload: 'Télécharger',
    id_front: 'Recto — maintenez à plat dans le cadre', docs_encrypted: 'Vos documents sont chiffrés et utilisés uniquement pour la vérification d\'identité.',
    face_title: 'Vérification d\'identité (KYC)', face_sub: 'Suivez les instructions. Vidéo 10 secondes + photo — comme la vérification Shopify.',
    live_straight: 'Regardez droit devant', live_left: 'Tournez la tête à gauche', live_right: 'Tournez la tête à droite',
    live_up: 'Levez lentement les yeux', live_straight2: 'Regardez à nouveau droit', kyc_capturing_photo: 'Capture de votre photo...',
    kyc_photo_captured: 'Vidéo et photo capturées avec succès',
    face_recording: 'Enregistrement', face_seconds: 'secondes', face_complete: 'Vidéo enregistrée avec succès',
    face_retry: 'Réessayer', face_continue: 'Continuer',
    review_title: 'Vérifiez votre candidature', review_sub: 'Vérifiez vos informations avant d\'envoyer.',
    cover_letter: 'Lettre de motivation', cover_optional: '(optionnel)',
    cover_ph: 'Expliquez pourquoi vous êtes le candidat idéal...',
    success_title: 'Candidature envoyée !', success_sub: 'L\'employeur répondra sous <strong>48 heures</strong>. Bonne chance !',
    browse_more: 'Voir plus d\'offres', job_details: 'Détails du poste', contract: 'Contrat', salary: 'Salaire',
    good_to_know: 'Bon à savoir : cette entreprise répond généralement sous <strong>48 heures</strong>.',
    perk_easy: 'Candidature facile', perk_training: 'Formation fournie', perk_no_degree: 'Sans diplôme requis', perk_salary: 'Salaire affiché',
    built_with: 'Conçu avec soin pour un meilleur recrutement',
    contract_type: 'Type de contrat', working_hours: 'Horaires', work_pattern: 'Rythme de travail',
    work_location: 'Lieu de travail', start_date: 'Date de début', per_year: 'par an', per_hour: 'par heure',
    pillar_no_ghost: 'Pas de fausses offres', pillar_salary: 'Salaire transparent', pillar_response: 'Réponse humaine', pillar_verified: 'Annonces vérifiées',
    footer_tagline: 'Le site d\'emploi le plus fiable du Royaume-Uni pour des offres vérifiées.',
    companies_h1: 'Employeurs <span class="highlight">vérifiés</span>',
    companies_sub: 'Entreprises britanniques de confiance qui recrutent sur JobsPlatform',
    sync_new: 'nouvelle offre', sync_news: 'nouvelles offres', sync_posted: 'publiée(s) !',
    time_just: 'À l\'instant', time_min: 'min', time_h: 'h', time_1d: '1 jour', time_d: 'jours',
    err_fn: 'Le prénom est requis.', err_ln: 'Le nom est requis.', err_email: 'Veuillez entrer une adresse e-mail valide.',
    err_phone: 'Veuillez entrer un numéro de téléphone valide.', err_city: 'Veuillez entrer un nom de ville valide.',
    err_post: 'Veuillez entrer un code postal valide.', err_addr: 'Veuillez entrer une adresse complète avec numéro.',
    err_dob: 'Veuillez entrer votre date de naissance.', err_age: 'Vous devez avoir au moins 16 ans.',
    err_cv: 'Veuillez télécharger votre CV.', err_id: 'Veuillez fournir votre pièce d\'identité.',
    err_face: 'Veuillez compléter la vidéo de vérification faciale de 10 secondes.', err_submit: 'Échec de l\'envoi. Veuillez réessayer.',
    review_name: 'Nom', review_cv: 'CV', review_id: 'Pièce d\'identité', review_face: 'Vidéo faciale', review_uploaded: '✓ Téléchargé',
    review_captured: '✓ Capture caméra', review_verified: '✓ Vérifié',
    google_btn: 'Continuer avec Google', or_signin: 'ou connectez-vous par e-mail', or_register: 'ou créez un compte par e-mail',
    forgot: 'Oublié ?', no_account: 'Pas de compte ?', create_free: 'Créer un compte gratuit',
    has_account: 'Déjà un compte ?', sign_in_link: 'Se connecter', password: 'Mot de passe',
    create_account: 'Créer un compte', sign_in_btn: 'Connexion', first_name: 'Prénom', last_name: 'Nom',
    browse_jobs: 'Voir les offres', sign_out: 'Déconnexion',
    listings_active: 'annonces actives · Salaires affichés · Réponse sous 48h',
    apply_modal_sub: 'Vous postulez en tant que', apply_modal_submit: 'Envoyer la candidature',
    apply_modal_success: 'Candidature envoyée ! Réponse sous 48 heures.',
    jobs_count_label: 'offres',
    cat_remote: 'Télétravail', cat_companies: 'Entreprises vérifiées', cat_it_tech: 'Informatique',
    employers_count: '500+ employeurs',
    footer_seekers: 'Pour les candidats', footer_employers: 'Pour les employeurs', footer_company: 'Entreprise',
    footer_browse: 'Voir les offres', footer_profile: 'Créer un profil', footer_alerts: 'Alertes emploi',
    footer_post: 'Publier une offre', footer_emp_login: 'Connexion employeur',
    footer_about: 'À propos', footer_privacy: 'Confidentialité', footer_terms: 'Conditions',
    footer_rights: '© 2026 JobsPlatform. Tous droits réservés.', footer_made: 'Fabriqué au Royaume-Uni',
    loading_jobs: 'Chargement des offres...',
    feat1_title: 'Pas de fausses offres', feat1_desc: '100 % d\'annonces vérifiées. Chaque poste est confirmé actif avant publication.', feat1_stat: '100 % vérifié',
    feat2_title: 'Garantie de réponse', feat2_desc: 'Les employeurs s\'engagent à répondre sous 48 h. Fini l\'attente dans le silence.', feat2_stat: 'Max 48 h',
    feat3_title: 'Salaire affiché', feat3_desc: 'Chaque annonce montre la fourchette salariale complète. Plus de surprises en entretien.', feat3_stat: '100 % transparent',
    feat4_title: 'Bonne adéquation', feat4_desc: 'Profils employeurs détaillés : culture, taille d\'équipe et valeurs pour trouver la bonne place.', feat4_stat: '89 % rétention',
    eliminates_h3: 'Nous éliminons :',
    elim1: 'Annonces vagues', elim2: 'Silence employeur', elim3: 'CV sans réponse', elim4: 'Salaires cachés', elim5: 'Fausses annonces', elim6: 'Tests non payés',
    step1_title: 'Créez votre profil', step1_desc: 'Un profil en quelques minutes. Compétences, expérience et ce qui compte pour vous.',
    step1_quote: '"Profil créé en moins de 10 minutes, 3 entretiens réservés en une semaine." — Sarah T.',
    step2_title: 'Parcourez les offres vérifiées', step2_desc: 'Des milliers d\'annonces actives avec salaires complets. Filtrez par lieu, horaires et secteur.',
    step2_quote: '"Enfin des offres avec salaire affiché et pas vieilles de 3 mois." — Marcus B.',
    step3_title: 'Postulez et obtenez des réponses', step3_desc: 'Candidature en un clic. Réponse employeur sous 48 h garantie.',
    step3_quote: '"Rappel sous 24 h. C\'est comme ça que la recherche d\'emploi devrait fonctionner." — Priya K.',
    testi1_text: '"Après des mois sans réponse ailleurs, j\'ai trouvé un emploi ici en deux semaines."',
    testi1_name: 'Anna P.', testi1_role: 'Chez Tesco',
    testi2_text: '"La reprise après une pause était stressante. Les filtres et réponses rapides ont tout changé."',
    testi2_name: 'James W.', testi2_role: 'Chez Amazon',
    testi3_text: '"Les annonces vérifiées changent tout. Chaque candidature a eu une vraie réponse."',
    testi3_name: 'Sophie B.', testi3_role: 'Chez NHS',
    hero_card_title: 'Aide-soignant senior', hero_card_company: 'SunCare Group', hero_card_loc: 'Manchester', hero_card_type: 'Temps plein', hero_card_salary: '28k–32k£',
    hero_card_respond: 'Réponse sous 24 h', hero_stat_jobs: 'Offres cette semaine', hero_stat_resp: 'Réponse moy.', hero_stat_sat: 'Satisfaction', hero_stat_spam: 'Annonces spam',
    cta_stat_users: 'Utilisateurs actifs', cta_stat_jobs: 'Offres cette semaine', cta_stat_sat: 'Satisfaction',
  },
  de: {
    verified: 'Verifiziert', featured: 'Empfohlen', new_badge: 'Neu', just_posted: 'Gerade veröffentlicht',
    replies_in: 'Antwort in', live: 'Live', sort_label: 'Sortieren:',
    showing: 'Anzeige', of: 'von', jobs_word: 'Jobs', no_jobs: 'Keine Jobs gefunden',
    no_jobs_sub: 'Versuchen Sie, Filter zu entfernen.', clear_filters: 'Filter löschen',
    reset_filters: 'Alle Filter zurücksetzen', filter_job_type: 'Beschäftigungsart', filter_salary: 'Gehaltsspanne',
    filter_category: 'Kategorie', filter_location: 'Arbeitsort', filter_response: 'Antwortzeit',
    any_salary: 'Beliebiges Gehalt', under_20k: 'Unter £20k', sal_20_30: '£20k – £30k',
    sal_30_50: '£30k – £50k', sal_50_plus: '£50k+', any_resp: 'Alle', within_24h: 'Innerhalb 24h', within_48h: 'Innerhalb 48h',
    save: 'Speichern', saved: 'Gespeichert', apply: 'Bewerben', apply_now: 'Jetzt bewerben',
    back_jobs: 'Zurück zu Jobs', back_job: 'Zurück zum Job',
    about_company: 'Über', contract_hours: 'Vertrag & Stunden', job_desc: 'Stellenbeschreibung',
    requirements: 'Anforderungen', looking_for: 'Was wir suchen',
    benefits: 'Vorteile', need_help: 'Brauchen Sie Hilfe?',
    need_help_sub: 'Unser Team steht Ihnen bei Ihrer Bewerbung zur Verfügung.',
    quick_apply: 'Schnellbewerbung', quick_apply_sub: 'Schnellbewerbung – maximal 5 Minuten',
    apply_title: 'Auf diese Stelle bewerben',
    apply_sub: 'Füllen Sie die Schritte aus. Identitätsprüfung ist erforderlich.',
    step_personal: 'Persönliche Daten', step_docs: 'Dokumente', step_face: 'Face ID', step_review: 'Überprüfung',
    fn: 'Vorname', ln: 'Nachname', email: 'E-Mail', phone: 'Telefon', city: 'Stadt',
    postcode: 'Postleitzahl', address: 'Adresse', dob: 'Geburtsdatum', required: 'Erforderlich',
    continue: 'Weiter', back: 'Zurück', submit: 'Bewerbung absenden',
    docs_title: 'Dokumente & Verifizierung', docs_sub: 'Ihre Daten sind verschlüsselt und nur für die Verifizierung.',
    cv_label: 'Lebenslauf', cv_upload: 'Klicken Sie zum Hochladen', cv_hint: 'Nur PDF · Max 5MB',
    id_national: 'Personalausweis', id_passport: 'Reisepass', camera: 'Kamera', upload: 'Hochladen',
    id_front: 'Vorderseite — flach im Rahmen halten', docs_encrypted: 'Ihre Dokumente sind verschlüsselt und nur für die Identitätsprüfung.',
    face_title: 'Identitätsprüfung (KYC)', face_sub: 'Folgen Sie den Anweisungen. 10-Sekunden-Video + Foto — wie Shopify-Verifizierung.',
    live_straight: 'Schauen Sie geradeaus', live_left: 'Drehen Sie den Kopf nach links', live_right: 'Drehen Sie den Kopf nach rechts',
    live_up: 'Schauen Sie langsam nach oben', live_straight2: 'Schauen Sie wieder geradeaus', kyc_capturing_photo: 'Foto wird aufgenommen...',
    kyc_photo_captured: 'Video und Foto erfolgreich aufgenommen',
    face_recording: 'Aufnahme', face_seconds: 'Sekunden', face_complete: 'Video erfolgreich aufgenommen',
    face_retry: 'Wiederholen', face_continue: 'Weiter',
    review_title: 'Bewerbung überprüfen', review_sub: 'Prüfen Sie Ihre Angaben vor dem Absenden.',
    cover_letter: 'Anschreiben', cover_optional: '(optional)',
    cover_ph: 'Erklären Sie, warum Sie perfekt passen...',
    success_title: 'Bewerbung gesendet!', success_sub: 'Der Arbeitgeber antwortet innerhalb von <strong>48 Stunden</strong>. Viel Erfolg!',
    browse_more: 'Weitere Jobs', job_details: 'Stellendetails', contract: 'Vertrag', salary: 'Gehalt',
    good_to_know: 'Gut zu wissen: Dieses Unternehmen antwortet in der Regel innerhalb von <strong>48 Stunden</strong>.',
    perk_easy: 'Einfach bewerben', perk_training: 'Schulung inklusive', perk_no_degree: 'Kein Abschluss nötig', perk_salary: 'Gehalt angezeigt',
    built_with: 'Mit Sorgfalt für besseres Recruiting entwickelt',
    contract_type: 'Vertragsart', working_hours: 'Arbeitszeiten', work_pattern: 'Arbeitsmuster',
    work_location: 'Arbeitsort', start_date: 'Startdatum', per_year: 'pro Jahr', per_hour: 'pro Stunde',
    pillar_no_ghost: 'Keine Geisterjobs', pillar_salary: 'Gehalt transparent', pillar_response: 'Menschliche Antwort', pillar_verified: 'Verifizierte Anzeigen',
    footer_tagline: 'Das vertrauenswürdigste Jobportal im UK für verifizierte Stellen.',
    companies_h1: 'Verifizierte <span class="highlight">Arbeitgeber</span>',
    companies_sub: 'Vertrauenswürdige UK-Unternehmen, die auf JobsPlatform einstellen',
    sync_new: 'neuer Job', sync_news: 'neue Jobs', sync_posted: 'gerade veröffentlicht!',
    time_just: 'Gerade eben', time_min: 'Min.', time_h: 'Std.', time_1d: '1 Tag', time_d: 'Tage',
    err_fn: 'Vorname ist erforderlich.', err_ln: 'Nachname ist erforderlich.', err_email: 'Bitte gültige E-Mail eingeben.',
    err_phone: 'Bitte gültige Telefonnummer eingeben.', err_city: 'Bitte gültigen Stadtnamen eingeben.',
    err_post: 'Bitte gültige Postleitzahl eingeben.', err_addr: 'Bitte vollständige Adresse mit Hausnummer eingeben.',
    err_dob: 'Bitte Geburtsdatum eingeben.', err_age: 'Sie müssen mindestens 16 Jahre alt sein.',
    err_cv: 'Bitte Lebenslauf hochladen.', err_id: 'Bitte Ausweisdokument bereitstellen.',
    err_face: 'Bitte 10-Sekunden-Gesichtsvideo abschließen.', err_submit: 'Speichern fehlgeschlagen. Bitte erneut versuchen.',
    review_name: 'Name', review_cv: 'Lebenslauf', review_id: 'Ausweis', review_face: 'Gesichtsvideo', review_uploaded: '✓ Hochgeladen',
    review_captured: '✓ Kameraaufnahme', review_verified: '✓ Verifiziert',
    google_btn: 'Mit Google fortfahren', or_signin: 'oder mit E-Mail anmelden', or_register: 'oder Konto mit E-Mail erstellen',
    forgot: 'Vergessen?', no_account: 'Kein Konto?', create_free: 'Kostenlos erstellen',
    has_account: 'Bereits ein Konto?', sign_in_link: 'Anmelden', password: 'Passwort',
    create_account: 'Konto erstellen', sign_in_btn: 'Anmelden', first_name: 'Vorname', last_name: 'Nachname',
    browse_jobs: 'Jobs durchsuchen', sign_out: 'Abmelden',
    listings_active: 'aktive Anzeigen · Alle Gehälter angezeigt · Antwort innerhalb 48h',
    apply_modal_sub: 'Sie bewerben sich als', apply_modal_submit: 'Bewerbung absenden',
    apply_modal_success: 'Bewerbung gesendet! Antwort innerhalb von 48 Stunden.',
    jobs_count_label: 'Jobs',
    cat_remote: 'Remote', cat_companies: 'Verifizierte Unternehmen', cat_it_tech: 'IT / Technik',
    employers_count: '500+ Arbeitgeber',
    footer_seekers: 'Für Jobsuchende', footer_employers: 'Für Arbeitgeber', footer_company: 'Unternehmen',
    footer_browse: 'Jobs durchsuchen', footer_profile: 'Profil erstellen', footer_alerts: 'Job-Benachrichtigungen',
    footer_post: 'Job veröffentlichen', footer_emp_login: 'Arbeitgeber-Login',
    footer_about: 'Über uns', footer_privacy: 'Datenschutz', footer_terms: 'Nutzungsbedingungen',
    footer_rights: '© 2026 JobsPlatform. Alle Rechte vorbehalten.', footer_made: 'Hergestellt im UK',
    loading_jobs: 'Jobs werden geladen...',
    feat1_title: 'Keine Geisterjobs', feat1_desc: '100 % verifizierte Anzeigen. Jeder Job wird vor Veröffentlichung als aktiv bestätigt.', feat1_stat: '100 % verifiziert',
    feat2_title: 'Antwortgarantie', feat2_desc: 'Arbeitgeber antworten innerhalb von 48 Stunden. Schluss mit wochenlangem Schweigen.', feat2_stat: 'Max. 48 h',
    feat3_title: 'Gehalt im Voraus', feat3_desc: 'Jede Anzeige zeigt die volle Gehaltsspanne. Keine Zeitverschwendung im Bewerbungsgespräch.', feat3_stat: '100 % transparent',
    feat4_title: 'Kulturpassung', feat4_desc: 'Detaillierte Arbeitgeberprofile: Kultur, Teamgröße und Werte für den richtigen Arbeitsplatz.', feat4_stat: '89 % Bindung',
    eliminates_h3: 'Wir eliminieren:',
    elim1: 'Vage Stellenanzeigen', elim2: 'Schweigen der Arbeitgeber', elim3: 'Bewerbungs-Friedhöfe', elim4: 'Versteckte Gehälter', elim5: 'Fake-Anzeigen', elim6: 'Unbezahlte Tests',
    step1_title: 'Profil erstellen', step1_desc: 'In Minuten ein starkes Profil. Fähigkeiten, Erfahrung und was Ihnen am Arbeitsplatz wichtig ist.',
    step1_quote: '"Profil in unter 10 Minuten — 3 Vorstellungsgespräche in einer Woche." — Sarah T.',
    step2_title: 'Verifizierte Jobs durchsuchen', step2_desc: 'Tausende aktive Anzeigen mit vollständigen Gehaltsangaben. Filtern nach Ort, Stunden und Branche.',
    step2_quote: '"Endlich Anzeigen mit Gehalt, die nicht 3 Monate alt sind." — Marcus B.',
    step3_title: 'Bewerben & Antworten erhalten', step3_desc: 'Mit einem Klick bewerben. Antwort innerhalb von 48 Stunden — garantiert.',
    step3_quote: '"Rückruf innerhalb eines Tages. So sollte Jobsuche funktionieren." — Priya K.',
    testi1_text: '"Nach Monaten ohne Antwort anderswo fand ich hier in zwei Wochen einen Job."',
    testi1_name: 'Anna P.', testi1_role: 'Jetzt bei Tesco',
    testi2_text: '"Der Wiedereinstieg war stressig. Filter und schnelle Antworten machten den Unterschied."',
    testi2_name: 'James W.', testi2_role: 'Jetzt bei Amazon',
    testi3_text: '"Verifizierte Anzeigen sind ein Gamechanger. Jede Bewerbung bekam eine echte Antwort."',
    testi3_name: 'Sophie B.', testi3_role: 'Jetzt bei NHS',
    hero_card_title: 'Senior Pflegeassistent', hero_card_company: 'SunCare Group', hero_card_loc: 'Manchester', hero_card_type: 'Vollzeit', hero_card_salary: '28k–32k£',
    hero_card_respond: 'Antwort innerhalb 24 h', hero_stat_jobs: 'Jobs diese Woche', hero_stat_resp: 'Ø Antwort', hero_stat_sat: 'Zufriedenheit', hero_stat_spam: 'Spam-Anzeigen',
    cta_stat_users: 'Aktive Nutzer', cta_stat_jobs: 'Jobs diese Woche', cta_stat_sat: 'Zufriedenheit',
  },
  es: {
    verified: 'Verificado', featured: 'Destacado', new_badge: 'Nuevo', just_posted: 'Publicado ahora',
    replies_in: 'Responde en', live: 'En vivo', sort_label: 'Ordenar:',
    showing: 'Mostrando', of: 'de', jobs_word: 'empleos', no_jobs: 'No se encontraron empleos',
    no_jobs_sub: 'Intenta quitar algunos filtros.', clear_filters: 'Borrar filtros',
    reset_filters: 'Restablecer filtros', filter_job_type: 'Tipo de empleo', filter_salary: 'Rango salarial',
    filter_category: 'Categoría', filter_location: 'Ubicación', filter_response: 'Tiempo de respuesta',
    any_salary: 'Cualquier salario', under_20k: 'Menos de £20k', sal_20_30: '£20k – £30k',
    sal_30_50: '£30k – £50k', sal_50_plus: '£50k+', any_resp: 'Cualquiera', within_24h: 'En 24h', within_48h: 'En 48h',
    save: 'Guardar', saved: 'Guardado', apply: 'Solicitar', apply_now: 'Solicitar ahora',
    back_jobs: 'Volver a empleos', back_job: 'Volver al empleo',
    about_company: 'Sobre', contract_hours: 'Contrato y horario', job_desc: 'Descripción del puesto',
    requirements: 'Requisitos', looking_for: 'Lo que buscamos',
    benefits: 'Beneficios', need_help: '¿Necesitas ayuda?',
    need_help_sub: 'Nuestro equipo está disponible para ayudarte con tu solicitud.',
    quick_apply: 'Solicitud rápida', quick_apply_sub: 'Solicitud rápida – máximo 5 minutos',
    apply_title: 'Solicitar este puesto',
    apply_sub: 'Completa los pasos. Se requiere verificación de identidad.',
    step_personal: 'Datos personales', step_docs: 'Documentos', step_face: 'Face ID', step_review: 'Revisión',
    fn: 'Nombre', ln: 'Apellido', email: 'Correo', phone: 'Teléfono', city: 'Ciudad',
    postcode: 'Código postal', address: 'Dirección', dob: 'Fecha de nacimiento', required: 'Obligatorio',
    continue: 'Continuar', back: 'Volver', submit: 'Enviar solicitud',
    docs_title: 'Documentos y verificación', docs_sub: 'Tus datos están cifrados y solo se usan para verificación.',
    cv_label: 'CV', cv_upload: 'Haz clic para subir tu CV', cv_hint: 'Solo PDF · Máx 5MB',
    id_national: 'DNI', id_passport: 'Pasaporte', camera: 'Cámara', upload: 'Subir',
    id_front: 'Anverso — mantén plano en el marco', docs_encrypted: 'Tus documentos están cifrados y solo se usan para verificación de identidad.',
    face_title: 'Verificación de identidad (KYC)', face_sub: 'Sigue las instrucciones. Video 10 segundos + foto — como verificación Shopify.',
    live_straight: 'Mira al frente', live_left: 'Gira la cabeza a la izquierda', live_right: 'Gira la cabeza a la derecha',
    live_up: 'Mira hacia arriba lentamente', live_straight2: 'Mira al frente de nuevo', kyc_capturing_photo: 'Capturando tu foto...',
    kyc_photo_captured: 'Video y foto capturados correctamente',
    face_recording: 'Grabando', face_seconds: 'segundos', face_complete: 'Video grabado correctamente',
    face_retry: 'Reintentar', face_continue: 'Continuar',
    review_title: 'Revisa tu solicitud', review_sub: 'Verifica tus datos antes de enviar.',
    cover_letter: 'Carta de presentación', cover_optional: '(opcional)',
    cover_ph: 'Explica por qué eres el candidato ideal...',
    success_title: '¡Solicitud enviada!', success_sub: 'El empleador responderá en <strong>48 horas</strong>. ¡Buena suerte!',
    browse_more: 'Ver más empleos', job_details: 'Detalles del puesto', contract: 'Contrato', salary: 'Salario',
    good_to_know: 'Bueno saber: esta empresa suele responder en <strong>48 horas</strong>.',
    perk_easy: 'Solicitud fácil', perk_training: 'Formación incluida', perk_no_degree: 'Sin título requerido', perk_salary: 'Salario visible',
    built_with: 'Diseñado con cuidado para un mejor reclutamiento',
    contract_type: 'Tipo de contrato', working_hours: 'Horario', work_pattern: 'Patrón de trabajo',
    work_location: 'Ubicación', start_date: 'Fecha de inicio', per_year: 'al año', per_hour: 'por hora',
    pillar_no_ghost: 'Sin empleos fantasma', pillar_salary: 'Salario transparente', pillar_response: 'Respuesta humana', pillar_verified: 'Anuncios verificados',
    footer_tagline: 'El portal de empleo más confiable del Reino Unido para ofertas verificadas.',
    companies_h1: 'Empleadores <span class="highlight">verificados</span>',
    companies_sub: 'Empresas británicas de confianza que contratan en JobsPlatform',
    sync_new: 'nuevo empleo', sync_news: 'nuevos empleos', sync_posted: '¡publicado(s)!',
    time_just: 'Ahora', time_min: 'min', time_h: 'h', time_1d: '1 día', time_d: 'días',
    err_fn: 'El nombre es obligatorio.', err_ln: 'El apellido es obligatorio.', err_email: 'Introduce un correo válido.',
    err_phone: 'Introduce un teléfono válido.', err_city: 'Introduce una ciudad válida.',
    err_post: 'Introduce un código postal válido.', err_addr: 'Introduce una dirección completa con número.',
    err_dob: 'Introduce tu fecha de nacimiento.', err_age: 'Debes tener al menos 16 años.',
    err_cv: 'Sube tu CV.', err_id: 'Proporciona tu documento de identidad.',
    err_face: 'Completa el video de verificación facial de 10 segundos.', err_submit: 'Error al guardar. Inténtalo de nuevo.',
    review_name: 'Nombre', review_cv: 'CV', review_id: 'Documento ID', review_face: 'Video facial', review_uploaded: '✓ Subido',
    review_captured: '✓ Captura de cámara', review_verified: '✓ Verificado',
    google_btn: 'Continuar con Google', or_signin: 'o inicia sesión con correo', or_register: 'o crea cuenta con correo',
    forgot: '¿Olvidaste?', no_account: '¿No tienes cuenta?', create_free: 'Crear una gratis',
    has_account: '¿Ya tienes cuenta?', sign_in_link: 'Iniciar sesión', password: 'Contraseña',
    create_account: 'Crear cuenta', sign_in_btn: 'Iniciar sesión', first_name: 'Nombre', last_name: 'Apellido',
    browse_jobs: 'Ver empleos', sign_out: 'Cerrar sesión',
    listings_active: 'anuncios activos · Salarios mostrados · Respuesta en 48h',
    apply_modal_sub: 'Estás solicitando como', apply_modal_submit: 'Enviar solicitud',
    apply_modal_success: '¡Solicitud enviada! Respuesta en 48 horas.',
    jobs_count_label: 'empleos',
    cat_remote: 'Remoto', cat_companies: 'Empresas verificadas', cat_it_tech: 'Informática',
    employers_count: '500+ empleadores',
    footer_seekers: 'Para candidatos', footer_employers: 'Para empleadores', footer_company: 'Empresa',
    footer_browse: 'Ver empleos', footer_profile: 'Crear perfil', footer_alerts: 'Alertas de empleo',
    footer_post: 'Publicar empleo', footer_emp_login: 'Acceso empleadores',
    footer_about: 'Sobre nosotros', footer_privacy: 'Privacidad', footer_terms: 'Términos',
    footer_rights: '© 2026 JobsPlatform. Todos los derechos reservados.', footer_made: 'Hecho en el Reino Unido',
    loading_jobs: 'Cargando empleos...',
    feat1_title: 'Sin empleos fantasma', feat1_desc: '100 % de anuncios verificados. Cada puesto se confirma activo antes de publicarse.', feat1_stat: '100 % verificado',
    feat2_title: 'Garantía de respuesta', feat2_desc: 'Los empleadores responden en 48 horas. Se acabó esperar semanas en silencio.', feat2_stat: 'Máx. 48 h',
    feat3_title: 'Salario visible', feat3_desc: 'Cada anuncio muestra el rango salarial completo. Sin sorpresas en la entrevista.', feat3_stat: '100 % transparente',
    feat4_title: 'Encaje cultural', feat4_desc: 'Perfiles de empleadores con cultura, tamaño de equipo y valores para encontrar tu lugar.', feat4_stat: '89 % retención',
    eliminates_h3: 'Eliminamos:',
    elim1: 'Anuncios vagos', elim2: 'Silencio del empleador', elim3: 'CV sin respuesta', elim4: 'Salarios ocultos', elim5: 'Anuncios falsos', elim6: 'Pruebas no pagadas',
    step1_title: 'Crea tu perfil', step1_desc: 'Un perfil destacado en minutos. Habilidades, experiencia y lo que te importa en el trabajo.',
    step1_quote: '"Perfil listo en menos de 10 minutos y 3 entrevistas en una semana." — Sarah T.',
    step2_title: 'Explora empleos verificados', step2_desc: 'Miles de anuncios activos con salarios completos. Filtra por ubicación, horario y sector.',
    step2_quote: '"Por fin anuncios con salario que no tienen 3 meses de antigüedad." — Marcus B.',
    step3_title: 'Solicita y recibe respuestas', step3_desc: 'Solicitud con un clic. Respuesta del empleador en 48 horas garantizada.',
    step3_quote: '"Me llamaron al día siguiente. Así debería funcionar la búsqueda de empleo." — Priya K.',
    testi1_text: '"Tras meses sin respuesta en otros sitios, encontré trabajo aquí en dos semanas."',
    testi1_name: 'Anna P.', testi1_role: 'Ahora en Tesco',
    testi2_text: '"Volver al mercado laboral era difícil. Los filtros y respuestas rápidas marcaron la diferencia."',
    testi2_name: 'James W.', testi2_role: 'Ahora en Amazon',
    testi3_text: '"Los anuncios verificados lo cambian todo. Cada solicitud tuvo una respuesta real."',
    testi3_name: 'Sophie B.', testi3_role: 'Ahora en NHS',
    hero_card_title: 'Asistente de cuidados senior', hero_card_company: 'SunCare Group', hero_card_loc: 'Manchester', hero_card_type: 'Tiempo completo', hero_card_salary: '28k–32k£',
    hero_card_respond: 'Responde en 24 h', hero_stat_jobs: 'Empleos esta semana', hero_stat_resp: 'Resp. media', hero_stat_sat: 'Satisfacción', hero_stat_spam: 'Anuncios spam',
    cta_stat_users: 'Usuarios activos', cta_stat_jobs: 'Empleos esta semana', cta_stat_sat: 'Satisfacción',
  },
};

// Short job descriptions per language
window.JP_DESCS = {
  en: [
    'Immediate start available. Competitive salary and full benefits package.',
    'Full training provided. Excellent career progression opportunities.',
    'Join an award-winning team. 28 days holiday plus pension included.',
    'Flexible working options. Supportive management. Apply today.',
    'Competitive pay with regular reviews. Friendly team environment.',
  ],
  fr: [
    'Démarrage immédiat. Salaire compétitif et avantages complets.',
    'Formation complète fournie. Excellentes perspectives d\'évolution.',
    'Rejoignez une équipe primée. 28 jours de congés et retraite inclus.',
    'Options de travail flexibles. Management bienveillant. Postulez aujourd\'hui.',
    'Rémunération compétitive avec revues régulières. Équipe accueillante.',
  ],
  de: [
    'Sofortiger Start möglich. Wettbewerbsfähiges Gehalt und volle Benefits.',
    'Vollständige Schulung. Hervorragende Karrierechancen.',
    'Werden Sie Teil eines preisgekrönten Teams. 28 Urlaubstage und Rente.',
    'Flexible Arbeitsoptionen. Unterstützendes Management. Jetzt bewerben.',
    'Wettbewerbsfähige Bezahlung mit regelmäßigen Überprüfungen.',
  ],
  es: [
    'Inicio inmediato disponible. Salario competitivo y beneficios completos.',
    'Formación completa incluida. Excelentes oportunidades de carrera.',
    'Únete a un equipo premiado. 28 días de vacaciones y pensión incluidos.',
    'Opciones de trabajo flexibles. Gestión de apoyo. Solicita hoy.',
    'Salario competitivo con revisiones regulares. Ambiente de equipo amigable.',
  ],
};

// Job titles per category per language (indexed)
window.JP_TITLES = {
  Care: {
    en: ['Care Assistant','Senior Care Assistant','Home Care Worker','Support Worker','Healthcare Assistant'],
    fr: ['Assistant(e) de soins','Aide-soignant(e) senior','Aide à domicile','Accompagnant(e)','Assistant(e) santé'],
    de: ['Pflegeassistent(in)','Senior Pflegekraft','Häusliche Pflege','Betreuungskraft','Gesundheitsassistent(in)'],
    es: ['Asistente de cuidados','Cuidador(a) senior','Cuidado a domicilio','Trabajador(a) de apoyo','Asistente sanitario'],
  },
  Warehouse: {
    en: ['Warehouse Operative','Forklift Operator','Picker Packer','Stock Controller','Dispatch Operative'],
    fr: ['Agent d\'entrepôt','Cariste','Préparateur de commandes','Gestionnaire de stocks','Agent d\'expédition'],
    de: ['Lagerist(in)','Gabelstaplerfahrer(in)','Kommissionierer(in)','Bestandskontrolleur(in)','Versandmitarbeiter(in)'],
    es: ['Operario de almacén','Conductor de carretilla','Preparador de pedidos','Control de stock','Operario de envíos'],
  },
  'Customer Service': {
    en: ['Customer Service Advisor','Contact Centre Agent','Helpdesk Advisor','Client Services Rep','Support Agent'],
    fr: ['Conseiller clientèle','Agent de centre d\'appels','Conseiller helpdesk','Représentant services clients','Agent support'],
    de: ['Kundenberater(in)','Callcenter-Agent(in)','Helpdesk-Berater(in)','Kundendienstmitarbeiter(in)','Support-Agent(in)'],
    es: ['Asesor de atención al cliente','Agente de contact center','Asesor de helpdesk','Representante de servicios','Agente de soporte'],
  },
  Retail: {
    en: ['Retail Assistant','Sales Associate','Store Manager','Cashier','Visual Merchandiser'],
    fr: ['Vendeur(se)','Associé(e) commercial(e)','Responsable de magasin','Caissier(ère)','Merchandiser'],
    de: ['Verkäufer(in)','Verkaufsmitarbeiter(in)','Filialleiter(in)','Kassierer(in)','Visual Merchandiser'],
    es: ['Dependiente(a)','Asociado de ventas','Gerente de tienda','Cajero(a)','Merchandiser visual'],
  },
  Admin: {
    en: ['Administrator','Office Manager','Receptionist','Executive Assistant','Data Entry Clerk'],
    fr: ['Administrateur(trice)','Responsable de bureau','Réceptionniste','Assistant(e) de direction','Agent de saisie'],
    de: ['Administrator(in)','Büroleiter(in)','Empfangsmitarbeiter(in)','Vorstandsassistent(in)','Datenerfasser(in)'],
    es: ['Administrador(a)','Gerente de oficina','Recepcionista','Asistente ejecutivo','Operador de datos'],
  },
  IT: {
    en: ['IT Support Analyst','Software Developer','DevOps Engineer','Data Analyst','Frontend Developer'],
    fr: ['Analyste support IT','Développeur logiciel','Ingénieur DevOps','Analyste de données','Développeur frontend'],
    de: ['IT-Support-Analyst(in)','Softwareentwickler(in)','DevOps-Ingenieur(in)','Datenanalyst(in)','Frontend-Entwickler(in)'],
    es: ['Analista de soporte IT','Desarrollador de software','Ingeniero DevOps','Analista de datos','Desarrollador frontend'],
  },
  Cleaning: {
    en: ['Cleaning Operative','Office Cleaner','Industrial Cleaner','School Cleaner','Facilities Cleaner'],
    fr: ['Agent de nettoyage','Agent d\'entretien de bureaux','Agent de nettoyage industriel','Agent scolaire','Agent des installations'],
    de: ['Reinigungskraft','Büroreiniger(in)','Industriereiniger(in)','Schulreiniger(in)','Facility-Reiniger(in)'],
    es: ['Operario de limpieza','Limpiador de oficinas','Limpiador industrial','Limpiador escolar','Limpiador de instalaciones'],
  },
  Teaching: {
    en: ['Teaching Assistant','Primary Teacher','SEN Teaching Assistant','Cover Supervisor','Early Years Practitioner'],
    fr: ['Assistant(e) pédagogique','Enseignant(e) primaire','Assistant(e) SEN','Suppléant(e)','Éducateur(trice) petite enfance'],
    de: ['Lehrassistent(in)','Grundschullehrer(in)','SEN-Assistent(in)','Vertretungslehrer(in)','Erzieher(in)'],
    es: ['Asistente docente','Profesor(a) de primaria','Asistente SEN','Supervisor de cobertura','Educador(a) infantil'],
  },
  Driving: {
    en: ['Delivery Driver','HGV Class 2 Driver','Van Driver','Courier Driver','Bus Driver'],
    fr: ['Livreur(se)','Conducteur PL','Conducteur de camionnette','Coursier(ère)','Conducteur de bus'],
    de: ['Lieferfahrer(in)','LKW-Fahrer(in) Klasse 2','Transporterfahrer(in)','Kurierfahrer(in)','Busfahrer(in)'],
    es: ['Conductor de reparto','Conductor HGV Clase 2','Conductor de furgoneta','Mensajero(a)','Conductor de autobús'],
  },
  Construction: {
    en: ['Electrician','Plumber','Site Manager','Bricklayer','General Labourer'],
    fr: ['Électricien(ne)','Plombier(ère)','Chef de chantier','Maçon(ne)','Manœuvre'],
    de: ['Elektriker(in)','Klempner(in)','Bauleiter(in)','Maurer(in)','Hilfsarbeiter(in)'],
    es: ['Electricista','Fontanero(a)','Jefe de obra','Albañil','Peón de construcción'],
  },
};

window.JP_GENERIC_REQ = {
  en: ['Relevant experience or willingness to learn','Good communication skills','Right to work in the UK','Flexible availability','Team player attitude'],
  fr: ['Expérience pertinente ou volonté d\'apprendre','Bonnes compétences en communication','Droit de travailler au Royaume-Uni','Disponibilité flexible','Esprit d\'équipe'],
  de: ['Relevante Erfahrung oder Lernbereitschaft','Gute Kommunikationsfähigkeiten','Arbeitserlaubnis im UK','Flexible Verfügbarkeit','Teamfähigkeit'],
  es: ['Experiencia relevante o disposición a aprender','Buenas habilidades de comunicación','Derecho a trabajar en el Reino Unido','Disponibilidad flexible','Actitud de trabajo en equipo'],
};
window.JP_GENERIC_BEN = {
  en: ['Competitive salary','Paid annual leave','Pension scheme','Training and development','Supportive team environment'],
  fr: ['Salaire compétitif','Congés payés','Régime de retraite','Formation et développement','Environnement d\'équipe bienveillant'],
  de: ['Wettbewerbsfähiges Gehalt','Bezahlter Urlaub','Rentenversicherung','Schulung und Entwicklung','Unterstützendes Teamumfeld'],
  es: ['Salario competitivo','Vacaciones pagadas','Plan de pensiones','Formación y desarrollo','Entorno de equipo de apoyo'],
};

window.JP_CATEGORIES = [
  { key: 'Care', icon: 'fa-heart-pulse', count: '6,740', href: 'jobs.html?category=Care' },
  { key: 'Warehouse', icon: 'fa-warehouse', count: '3,920', href: 'jobs.html?category=Warehouse' },
  { key: 'Retail', icon: 'fa-store', count: '4,580', href: 'jobs.html?category=Retail' },
  { key: 'Customer Service', icon: 'fa-headset', count: '3,450', href: 'jobs.html?category=Customer+Service' },
  { key: 'IT', icon: 'fa-computer', count: '2,960', href: 'jobs.html?category=IT', labelKey: 'cat_it_tech' },
  { key: 'Admin', icon: 'fa-file-lines', count: '2,780', href: 'jobs.html?category=Admin' },
  { key: '_remote', icon: 'fa-laptop-house', count: '2,960', href: 'jobs.html?q=Remote', labelKey: 'cat_remote' },
  { key: 'Cleaning', icon: 'fa-broom', count: '2,340', href: 'jobs.html?category=Cleaning' },
  { key: 'Teaching', icon: 'fa-chalkboard-user', count: '1,890', href: 'jobs.html?category=Teaching' },
  { key: 'Driving', icon: 'fa-truck', count: '1,720', href: 'jobs.html?category=Driving' },
  { key: 'Construction', icon: 'fa-helmet-safety', count: '1,560', href: 'jobs.html?category=Construction' },
  { key: '_companies', icon: 'fa-building', count: '500+', href: 'jobs.html?tab=companies', labelKey: 'cat_companies', countKey: 'employers_count' },
];

window.jpLang = function() {
  return localStorage.getItem('jp_lang') || 'en';
};

window.jpT = function(key) {
  var lang = window.jpLang();
  var ui = window.JP_UI[lang] || window.JP_UI.en;
  return ui[key] !== undefined ? ui[key] : (window.JP_UI.en[key] || key);
};

window.jpMeta = function(value, group) {
  if (!value) return value;
  var lang = window.jpLang();
  if (lang === 'en') return value;
  var g = window.JP_META[group];
  return (g && g[value] && g[value][lang]) ? g[value][lang] : value;
};

window.jpTimeAgo = function(iso) {
  var s = Math.floor((Date.now() - new Date(iso)) / 1000);
  if (s < 60)     return window.jpT('time_just');
  if (s < 3600)   return Math.floor(s / 60) + ' ' + window.jpT('time_min');
  if (s < 86400)  return Math.floor(s / 3600) + window.jpT('time_h');
  if (s < 172800) return window.jpT('time_1d');
  return Math.floor(s / 86400) + ' ' + window.jpT('time_d');
};

// Localized job summaries per category
window.JP_JOB_SUMMARIES = {
  Care: {
    fr: '{company} recherche un(e) {title} passionné(e) à {location}. Poste enrichissant avec formation complète et évolution de carrière.',
    de: '{company} sucht einen engagierten {title} in {location}. Erfüllende Rolle mit vollständiger Schulung und Karriereentwicklung.',
    es: '{company} busca un(a) {title} dedicado(a) en {location}. Puesto gratificante con formación completa y desarrollo profesional.',
  },
  Warehouse: {
    fr: '{company} recrute un(e) {title} à {location}. Environnement dynamique, équipe solidaire et progression possible.',
    de: '{company} sucht einen {title} in {location}. Dynamisches Umfeld, starkes Team und Aufstiegsmöglichkeiten.',
    es: '{company} contrata un(a) {title} en {location}. Entorno dinámico, equipo sólido y oportunidades de crecimiento.',
  },
  'Customer Service': {
    fr: '{company} recherche un(e) {title} à {location}. Excellente formation et bonus de performance disponibles.',
    de: '{company} sucht einen {title} in {location}. Hervorragende Schulung und Leistungsboni verfügbar.',
    es: '{company} busca un(a) {title} en {location}. Excelente formación y bonos por rendimiento disponibles.',
  },
  Retail: {
    fr: '{company} recrute un(e) {title} à {location}. Horaires flexibles, réductions employés et ambiance positive.',
    de: '{company} sucht einen {title} in {location}. Flexible Zeiten, Mitarbeiterrabatte und positives Umfeld.',
    es: '{company} contrata un(a) {title} en {location}. Horarios flexibles, descuentos y ambiente positivo.',
  },
  Admin: {
    fr: '{company} recherche un(e) {title} à {location}. Rôle varié dans un environnement professionnel et bienveillant.',
    de: '{company} sucht einen {title} in {location}. Abwechslungsreiche Rolle in professionellem Umfeld.',
    es: '{company} busca un(a) {title} en {location}. Rol variado en un entorno profesional y de apoyo.',
  },
  IT: {
    fr: '{company} recherche un(e) {title} à {location}. Projets innovants, technologies modernes et télétravail possible.',
    de: '{company} sucht einen {title} in {location}. Innovative Projekte, moderne Technologien und Remote-Optionen.',
    es: '{company} busca un(a) {title} en {location}. Proyectos innovadores, tecnología moderna y opción remota.',
  },
  Cleaning: {
    fr: '{company} recrute un(e) {title} à {location}. Horaires réguliers, équipement fourni et environnement stable.',
    de: '{company} sucht einen {title} in {location}. Regelmäßige Schichten, Ausrüstung gestellt und stabiles Umfeld.',
    es: '{company} contrata un(a) {title} en {location}. Turnos regulares, equipo proporcionado y entorno estable.',
  },
  Teaching: {
    fr: '{company} recherche un(e) {title} à {location}. Impact direct sur les élèves avec soutien pédagogique complet.',
    de: '{company} sucht einen {title} in {location}. Direkter Einfluss auf Schüler mit voller pädagogischer Unterstützung.',
    es: '{company} busca un(a) {title} en {location}. Impacto directo en estudiantes con apoyo pedagógico completo.',
  },
  Driving: {
    fr: '{company} recrute un(e) {title} à {location}. Horaires flexibles, véhicule fourni possible et rémunération attractive.',
    de: '{company} sucht einen {title} in {location}. Flexible Zeiten, Fahrzeug möglich und attraktive Bezahlung.',
    es: '{company} contrata un(a) {title} en {location}. Horarios flexibles, vehículo posible y remuneración atractiva.',
  },
  Construction: {
    fr: '{company} recherche un(e) {title} à {location}. Projets variés, sécurité prioritaire et progression de carrière.',
    de: '{company} sucht einen {title} in {location}. Vielfältige Projekte, Sicherheit zuerst und Karriereentwicklung.',
    es: '{company} busca un(a) {title} en {location}. Proyectos variados, seguridad prioritaria y desarrollo profesional.',
  },
};

window.jpJobSummary = function(job) {
  return job.desc;
};

// Full job localization — title, desc, meta
window.jpLocalizeJob = function(job) {
  if (!job) return job;
  var lang = window.jpLang();
  var j = Object.assign({}, job);
  var cat = j.category;
  var tPool = window.JP_TITLES[cat];
  if (tPool && tPool[lang]) {
    var ti = j._titleIdx != null ? j._titleIdx : (j.id % tPool[lang].length);
    j.title = tPool[lang][ti] || j.title;
  }
  var dPool = window.JP_DESCS[lang] || window.JP_DESCS.en;
  var di = j._descIdx != null ? j._descIdx : (j.id % dPool.length);
  j.desc = dPool[di] || j.desc;
  if (lang !== 'en') {
    var sum = window.JP_JOB_SUMMARIES[cat];
    if (sum && sum[lang]) {
      j.desc = sum[lang]
        .replace(/\{company\}/g, j.company)
        .replace(/\{title\}/g, j.title)
        .replace(/\{location\}/g, j.location);
    }
  }
  j.typeLabel = window.jpMeta(j.type, 'type');
  j.modeLabel = window.jpMeta(j.workMode, 'workMode');
  j.catLabel  = window.jpMeta(j.category, 'category');
  return j;
};

window.jpRenderCategories = function() {
  var grid = document.getElementById('categoriesGrid');
  if (!grid) return;
  grid.innerHTML = window.JP_CATEGORIES.map(function(c) {
    var name = c.labelKey ? window.jpT(c.labelKey) : window.jpMeta(c.key, 'category');
    var count = c.countKey ? window.jpT(c.countKey) : (c.count + ' ' + window.jpT('jobs_count_label'));
    return '<a href="' + c.href + '" class="cat-card">' +
      '<div class="cat-icon"><i class="fa-solid ' + c.icon + '"></i></div>' +
      '<div class="cat-name">' + name + '</div>' +
      '<div class="cat-count">' + count + '</div></a>';
  }).join('');
};

window.jpRenderFilters = function() {
  var sb = document.getElementById('filtersSidebar');
  if (!sb) return;
  var types = ['Full-time','Part-time','Temporary','Contract','Zero Hours'];
  var cats = ['Care','Warehouse','Retail','Admin','Customer Service','IT','Cleaning','Teaching','Driving','Construction'];
  var locs = ['On-site','Remote','Hybrid'];
  sb.innerHTML =
    '<div class="sidebar-section"><h4>' + window.jpT('filter_job_type') + '</h4>' +
    types.map(function(t) {
      var id = 'cnt-' + t.replace(/\s+/g,'-');
      var checked = document.querySelector('input[name="type"][value="'+t+'"]');
      var isOn = checked && checked.checked;
      return '<label class="filter-check"><input type="checkbox" name="type" value="'+t+'" onchange="filterJobs()"'+(isOn?' checked':'')+' /> ' +
        '<span class="filter-label">' + window.jpMeta(t,'type') + '</span>' +
        '<button type="button" class="filter-count-btn'+(isOn?' active':'')+'" id="'+id+'" data-group="type" data-value="'+t+'" onclick="event.preventDefault();event.stopPropagation();applyFilterOnly(\'type\',\''+t+'\')" title="'+window.jpMeta(t,'type')+'">' +
        '0</button></label>';
    }).join('') + '</div>' +
    '<div class="sidebar-section"><h4>' + window.jpT('filter_salary') + '</h4>' +
    [['any','any_salary'],['0-20','under_20k'],['20-30','sal_20_30'],['30-50','sal_30_50'],['50-999','sal_50_plus']].map(function(pair) {
      var cur = document.querySelector('input[name="salary"]:checked');
      var isOn = (cur && cur.value === pair[0]) || (!cur && pair[0]==='any');
      return '<label class="filter-check"><input type="radio" name="salary" value="'+pair[0]+'" onchange="filterJobs()"'+(isOn?' checked':'')+' /> ' + window.jpT(pair[1]) + '</label>';
    }).join('') + '</div>' +
    '<div class="sidebar-section"><h4>' + window.jpT('filter_category') + '</h4>' +
    cats.map(function(c) {
      var id = 'cnt-' + c.replace(/\s+/g,'-');
      var checked = document.querySelector('input[name="cat"][value="'+c+'"]');
      var isOn = checked && checked.checked;
      var lbl = c === 'IT' ? window.jpT('cat_it_tech') : window.jpMeta(c,'category');
      return '<label class="filter-check"><input type="checkbox" name="cat" value="'+c+'" onchange="filterJobs()"'+(isOn?' checked':'')+' /> ' +
        '<span class="filter-label">' + lbl + '</span>' +
        '<button type="button" class="filter-count-btn'+(isOn?' active':'')+'" id="'+id+'" data-group="cat" data-value="'+c+'" onclick="event.preventDefault();event.stopPropagation();applyFilterOnly(\'cat\',\''+c+'\')" title="'+lbl+'">' +
        '0</button></label>';
    }).join('') + '</div>' +
    '<div class="sidebar-section"><h4>' + window.jpT('filter_location') + '</h4>' +
    locs.map(function(l) {
      var checked = document.querySelector('input[name="loc"][value="'+l+'"]');
      var isOn = checked && checked.checked;
      return '<label class="filter-check"><input type="checkbox" name="loc" value="'+l+'" onchange="filterJobs()"'+(isOn?' checked':'')+' /> ' + window.jpMeta(l,'workMode') + '</label>';
    }).join('') + '</div>' +
    '<div class="sidebar-section"><h4>' + window.jpT('filter_response') + '</h4>' +
    [['any','any_resp'],['24','within_24h'],['48','within_48h']].map(function(pair) {
      var cur = document.querySelector('input[name="resp"]:checked');
      var isOn = (cur && cur.value === pair[0]) || (!cur && pair[0]==='any');
      return '<label class="filter-check"><input type="radio" name="resp" value="'+pair[0]+'" onchange="filterJobs()"'+(isOn?' checked':'')+' /> ' + window.jpT(pair[1]) + '</label>';
    }).join('') + '</div>' +
    '<button class="btn-ghost" style="width:100%;margin-top:4px;" onclick="resetFilters()">' +
    '<i class="fa-solid fa-rotate-left"></i> ' + window.jpT('reset_filters') + '</button>';
  if (typeof updateCounts === 'function') updateCounts();
};

// Apply data-t="ui" elements
window.jpApplyUI = function() {
  document.querySelectorAll('[data-ui]').forEach(function(el) {
    var key = el.getAttribute('data-ui');
    var val = window.jpT(key);
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      if (el.hasAttribute('data-ui-ph')) el.placeholder = val;
    } else {
      el.innerHTML = val;
    }
  });
  document.querySelectorAll('[data-ui-ph]').forEach(function(el) {
    el.placeholder = window.jpT(el.getAttribute('data-ui-ph'));
  });
  if (window.jpRenderCategories) window.jpRenderCategories();
  if (window.jpRenderFilters) window.jpRenderFilters();
};

window.onJpLangChange = function() {};
