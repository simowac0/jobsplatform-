// JobsPlatform — multilingual SEO (title, meta, hreflang, JSON-LD)
(function () {
  var SITE = (window.SITE_CONFIG && window.SITE_CONFIG.siteUrl) || 'https://jobsplatform-chi.vercel.app';
  var LANGS = ['en', 'fr', 'de', 'es'];

  var OG_LOCALE = { en: 'en_GB', fr: 'fr_FR', de: 'de_DE', es: 'es_ES' };

  var PAGES = {
    home: {
      path: '/index.html',
      titles: {
        en: 'JobsPlatform – Find Verified UK Jobs That Respond',
        fr: 'JobsPlatform – Offres d\'emploi UK vérifiées qui répondent',
        de: 'JobsPlatform – Verifizierte UK-Jobs mit garantierter Antwort',
        es: 'JobsPlatform – Empleos verificados en UK que responden',
      },
      descriptions: {
        en: 'Search verified UK job listings with transparent salaries and 48-hour employer response guarantee. Apply in minutes with secure identity verification.',
        fr: 'Recherchez des offres UK vérifiées avec salaires transparents et réponse employeur sous 48h. Postulez en quelques minutes avec vérification sécurisée.',
        de: 'Finden Sie verifizierte UK-Stellen mit transparenten Gehältern und 48-Stunden-Antwortgarantie. Bewerben Sie sich in Minuten mit sicherer Identitätsprüfung.',
        es: 'Busca empleos verificados en UK con salarios transparentes y respuesta del empleador en 48 horas. Solicita en minutos con verificación segura.',
      },
    },
    jobs: {
      path: '/jobs.html',
      titles: {
        en: 'Browse Verified UK Jobs – JobsPlatform',
        fr: 'Parcourir les offres UK vérifiées – JobsPlatform',
        de: 'Verifizierte UK-Jobs durchsuchen – JobsPlatform',
        es: 'Explorar empleos verificados UK – JobsPlatform',
      },
      descriptions: {
        en: 'Browse thousands of active UK jobs. Filter by category, salary, location and response time. All listings verified, salaries shown upfront.',
        fr: 'Parcourez des milliers d\'offres actives au UK. Filtrez par catégorie, salaire, lieu et délai de réponse. Annonces vérifiées.',
        de: 'Durchsuchen Sie tausende aktive UK-Jobs. Filtern nach Kategorie, Gehalt, Ort und Antwortzeit. Alle Anzeigen verifiziert.',
        es: 'Explora miles de empleos activos en UK. Filtra por categoría, salario, ubicación y tiempo de respuesta. Anuncios verificados.',
      },
    },
    job: {
      path: '/job.html',
      titles: {
        en: 'Job Details & Apply – JobsPlatform',
        fr: 'Détail de l\'offre & candidature – JobsPlatform',
        de: 'Stellendetails & Bewerbung – JobsPlatform',
        es: 'Detalle del empleo y solicitud – JobsPlatform',
      },
      descriptions: {
        en: 'View full job details, salary, contract type and apply with quick KYC verification. Employers respond within 48 hours.',
        fr: 'Consultez le détail du poste, le salaire, le contrat et postulez avec vérification KYC rapide. Réponse sous 48h.',
        de: 'Vollständige Stellendetails, Gehalt, Vertragsart und Bewerbung mit schneller KYC-Prüfung. Antwort innerhalb von 48 Stunden.',
        es: 'Consulta detalles, salario, tipo de contrato y solicita con verificación KYC rápida. Respuesta en 48 horas.',
      },
    },
    login: {
      path: '/login.html',
      titles: {
        en: 'Sign In or Register – JobsPlatform',
        fr: 'Connexion ou inscription – JobsPlatform',
        de: 'Anmelden oder registrieren – JobsPlatform',
        es: 'Iniciar sesión o registrarse – JobsPlatform',
      },
      descriptions: {
        en: 'Create your free JobsPlatform account to apply to verified UK jobs or post openings as an employer.',
        fr: 'Créez votre compte gratuit JobsPlatform pour postuler aux offres UK vérifiées ou publier des annonces.',
        de: 'Erstellen Sie Ihr kostenloses JobsPlatform-Konto für Bewerbungen oder Stellenanzeigen als Arbeitgeber.',
        es: 'Crea tu cuenta gratuita en JobsPlatform para solicitar empleos verificados o publicar ofertas como empleador.',
      },
    },
  };

  function pageId() {
    var p = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
    if (!p || p === 'index.html' || p === '') return 'home';
    if (p === 'jobs.html') return 'jobs';
    if (p === 'job.html') return 'job';
    if (p === 'login.html') return 'login';
    return 'home';
  }

  function pageUrl(path, lang) {
    var url = SITE.replace(/\/$/, '') + path;
    if (lang && lang !== 'en') url += (url.indexOf('?') >= 0 ? '&' : '?') + 'lang=' + lang;
    return url;
  }

  function setMeta(attr, name, content) {
    var sel = 'meta[' + attr + '="' + name + '"]';
    var el = document.querySelector(sel);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attr, name);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  }

  function setLink(rel, href, hreflang) {
    var sel = 'link[rel="' + rel + '"]' + (hreflang ? '[hreflang="' + hreflang + '"]' : ':not([hreflang])');
    var el = document.querySelector(sel);
    if (!el) {
      el = document.createElement('link');
      el.setAttribute('rel', rel);
      if (hreflang) el.setAttribute('hreflang', hreflang);
      document.head.appendChild(el);
    }
    el.setAttribute('href', href);
  }

  function updateHreflang(path) {
    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(function (el) { el.remove(); });
    LANGS.forEach(function (l) {
      var link = document.createElement('link');
      link.setAttribute('rel', 'alternate');
      link.setAttribute('hreflang', l);
      link.setAttribute('href', pageUrl(path, l));
      document.head.appendChild(link);
    });
    var xdef = document.createElement('link');
    xdef.setAttribute('rel', 'alternate');
    xdef.setAttribute('hreflang', 'x-default');
    xdef.setAttribute('href', pageUrl(path, 'en'));
    document.head.appendChild(xdef);
  }

  function injectJsonLd(lang) {
    var old = document.getElementById('jp-jsonld');
    if (old) old.remove();
    if (pageId() !== 'home') return;

    var names = {
      en: 'JobsPlatform – Verified UK Job Board',
      fr: 'JobsPlatform – Offres d\'emploi UK vérifiées',
      de: 'JobsPlatform – Verifizierte UK-Jobbörse',
      es: 'JobsPlatform – Bolsa de empleo UK verificada',
    };

    var data = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          '@id': SITE + '/#website',
          url: SITE,
          name: names[lang] || names.en,
          inLanguage: lang,
          potentialAction: {
            '@type': 'SearchAction',
            target: SITE + '/jobs.html?q={search_term_string}',
            'query-input': 'required name=search_term_string',
          },
        },
        {
          '@type': 'Organization',
          '@id': SITE + '/#organization',
          name: 'JobsPlatform',
          url: SITE,
          sameAs: [(window.SITE_CONFIG && window.SITE_CONFIG.linkedin) || ''],
        },
      ],
    };

    var script = document.createElement('script');
    script.id = 'jp-jsonld';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
  }

  window.jpApplySEO = function (lang) {
    lang = lang || 'en';
    var pid = pageId();
    var page = PAGES[pid] || PAGES.home;
    var title = page.titles[lang] || page.titles.en;
    var desc = page.descriptions[lang] || page.descriptions.en;
    var url = pageUrl(page.path, lang);

    document.title = title;
    document.documentElement.lang = lang === 'en' ? 'en-GB' : lang;

    setMeta('name', 'description', desc);
    setMeta('name', 'robots', 'index, follow');
    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:site_name', 'JobsPlatform');
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', desc);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:locale', OG_LOCALE[lang] || 'en_GB');
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', desc);

    setLink('canonical', pageUrl(page.path, lang));
    updateHreflang(page.path);
    injectJsonLd(lang);
  };

  window.jpUrlWithLang = function (href, lang) {
    if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto')) return href;
    try {
      var u = new URL(href, window.location.href);
      if (lang && lang !== 'en') u.searchParams.set('lang', lang);
      else u.searchParams.delete('lang');
      return u.pathname + u.search + u.hash;
    } catch (e) {
      return href;
    }
  };
})();
