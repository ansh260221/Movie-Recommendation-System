// Constants and Utilities
const IMG = (path, size = 342) => (path ? `https://image.tmdb.org/t/p/w${size}${path}` : "");
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

// Mock data for when backend is not available
const MOCK_MOVIES = [
  {
    id: 1,
    title: "Inception",
    overview: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    poster_path: "/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    backdrop_path: "/s3TBrRGB1iav7gFOCNx3H31MoES.jpg",
    vote_average: 8.4,
    release_date: "2010-07-16",
    genre_ids: [28, 878, 12]
  },
  {
    id: 2,
    title: "The Shawshank Redemption",
    overview: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    poster_path: "/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
    backdrop_path: "/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg",
    vote_average: 9.3,
    release_date: "1994-09-23",
    genre_ids: [18, 80]
  },
  {
    id: 3,
    title: "The Dark Knight",
    overview: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    backdrop_path: "/hkBaDkMWbLaf8B1lsWsKX7Ew3Xq.jpg",
    vote_average: 9.0,
    release_date: "2008-07-18",
    genre_ids: [28, 80, 18]
  },
  {
    id: 4,
    title: "Pulp Fiction",
    overview: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    poster_path: "/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
    backdrop_path: "/suaEOtk1N1sgg2QM528GluxMcE.jpg",
    vote_average: 8.9,
    release_date: "1994-09-10",
    genre_ids: [80, 53]
  },
  {
    id: 5,
    title: "Fight Club",
    overview: "An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more.",
    poster_path: "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
    backdrop_path: "/52AfXWuXCHn3UjD17rBruA9f5qb.jpg",
    vote_average: 8.8,
    release_date: "1999-10-15",
    genre_ids: [18]
  },
  {
    id: 6,
    title: "Forrest Gump",
    overview: "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75.",
    poster_path: "/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
    backdrop_path: "/yE5d3BUhE8hCnkMUJOoBrQDotDZ.jpg",
    vote_average: 8.8,
    release_date: "1994-06-23",
    genre_ids: [35, 18, 10749]
  },
  {
    id: 7,
    title: "The Matrix",
    overview: "A computer programmer discovers that reality as he knows it is a simulation created by machines, and joins a rebellion to break free.",
    poster_path: "/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    backdrop_path: "/ncEsesgOJDNrTUxHl3QhqHZ5QhE.jpg",
    vote_average: 8.7,
    release_date: "1999-03-31",
    genre_ids: [28, 878]
  },
  {
    id: 8,
    title: "Goodfellas",
    overview: "The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners Jimmy Conway and Tommy DeVito.",
    poster_path: "/aKuFiU82suyISQpJC5ytlM6g5e.jpg",
    backdrop_path: "/sw7mordbZxgITU877yTp65ud5aY.jpg",
    vote_average: 8.7,
    release_date: "1990-09-19",
    genre_ids: [80, 18]
  }
];

// Mock data for different regions
const MOCK_REGIONAL_MOVIES = {
  bollywood: [
    {
      id: 101,
      title: "Dangal",
      overview: "Former wrestler Mahavir Singh Phogat and his two wrestler daughters struggle towards glory at the Commonwealth Games in the face of societal oppression.",
      poster_path: "/6a6clrhNDOWrkkE37C9ud6P5Rvd.jpg",
      vote_average: 8.4,
      release_date: "2016-12-21",
      genre_ids: [18, 28, 10751]
    },
    {
      id: 102,
      title: "3 Idiots",
      overview: "Two friends looking for a lost buddy deal with a forgotten bet, a wedding they have to crash, and a funeral that goes impossibly out of control.",
      poster_path: "/66A9MqXOyVFCABitDTMGOvqC2a.jpg",
      vote_average: 8.1,
      release_date: "2009-12-25",
      genre_ids: [35, 18, 10749]
    },
    {
      id: 103,
      title: "Lagaan",
      overview: "The people of a small village in Victorian India stake their future on a game of cricket against their ruthless British rulers.",
      poster_path: "/8jqLdfx2ZgfOHjDTdT2KjaoKJM3.jpg",
      vote_average: 7.8,
      release_date: "2001-06-15",
      genre_ids: [18, 10749, 10752]
    },
    {
      id: 104,
      title: "PK",
      overview: "A stranger in the city asks questions that haven't been asked before. Known only by his initials, P.K.'s innocent questions and childlike curiosity will take him on a journey of love, laughter and letting-go.",
      poster_path: "/4B2aJWJqIMUNGYvELO87FHeSXSt.jpg",
      vote_average: 7.5,
      release_date: "2014-12-19",
      genre_ids: [35, 18, 14]
    },
    {
      id: 105,
      title: "Sholay",
      overview: "After his family is murdered by a notorious and ruthless bandit, a former police officer enlists the services of two outlaws to capture the bandit.",
      poster_path: "/sholay-poster.jpg",
      vote_average: 8.7,
      release_date: "1975-08-15",
      genre_ids: [28, 18, 80]
    },
    {
      id: 106,
      title: "Mother India",
      overview: "A poverty-stricken woman raises her sons through many trials and tribulations. But no matter the struggles, always sticks to the right path.",
      poster_path: "/mother-india-poster.jpg",
      vote_average: 8.2,
      release_date: "1957-10-25",
      genre_ids: [18, 10749]
    },
    {
      id: 107,
      title: "Mughal-e-Azam",
      overview: "A 16th century prince falls in love with a court dancer and battles with his emperor father.",
      poster_path: "/mughal-e-azam-poster.jpg",
      vote_average: 8.5,
      release_date: "1960-08-05",
      genre_ids: [18, 10749, 36]
    },
    {
      id: 108,
      title: "Pather Panchali",
      overview: "Impoverished priest Harihar Ray, dreaming of a better life for himself and his family, leaves his rural Bengal village in search of work.",
      poster_path: "/pather-panchali-poster.jpg",
      vote_average: 8.1,
      release_date: "1955-08-26",
      genre_ids: [18, 10751]
    }
  ],
  punjabi: [
    {
      id: 201,
      title: "Carry On Jatta",
      overview: "A comedy about a man who pretends to be married to impress his girlfriend's family.",
      poster_path: "/carry-on-jatta.jpg",
      vote_average: 7.2,
      release_date: "2012-07-27",
      genre_ids: [35, 10749]
    },
    {
      id: 202,
      title: "Punjab 1984",
      overview: "A mother's journey to find her son who was wrongfully arrested during the 1984 Sikh riots.",
      poster_path: "/punjab-1984.jpg",
      vote_average: 7.8,
      release_date: "2014-06-27",
      genre_ids: [18, 36]
    },
    {
      id: 203,
      title: "Sardaar Ji",
      overview: "A ghost hunter who can see and communicate with spirits falls in love with a girl who is possessed by a ghost.",
      poster_path: "/sardaar-ji.jpg",
      vote_average: 6.5,
      release_date: "2015-06-26",
      genre_ids: [35, 14, 10749]
    },
    {
      id: 204,
      title: "Angrej",
      overview: "Set in 1945, a young man falls in love with a girl but faces opposition from her family.",
      poster_path: "/angrej.jpg",
      vote_average: 7.0,
      release_date: "2015-07-31",
      genre_ids: [18, 10749]
    },
    {
      id: 205,
      title: "Jatt & Juliet",
      overview: "A Punjabi boy from a village goes to Canada on a student visa and falls in love with a girl who is already engaged.",
      poster_path: "/jatt-juliet.jpg",
      vote_average: 7.5,
      release_date: "2012-06-29",
      genre_ids: [35, 10749]
    },
    {
      id: 206,
      title: "Gippy Grewal",
      overview: "A young man returns to his village after studying abroad and faces cultural conflicts and family expectations.",
      poster_path: "/gippy-grewal.jpg",
      vote_average: 6.8,
      release_date: "2013-06-21",
      genre_ids: [35, 18]
    },
    {
      id: 207,
      title: "Lahoriye",
      overview: "A love story set against the backdrop of the partition of India and Pakistan.",
      poster_path: "/lahoriye.jpg",
      vote_average: 7.3,
      release_date: "2017-08-25",
      genre_ids: [18, 10749, 10752]
    },
    {
      id: 208,
      title: "Nikka Zaildar",
      overview: "A young man from a village tries to win the heart of a city girl while dealing with family traditions.",
      poster_path: "/nikka-zaildar.jpg",
      vote_average: 6.9,
      release_date: "2016-09-16",
      genre_ids: [35, 10749]
    }
  ],
  telugu: [
    {
      id: 301,
      title: "RRR",
      overview: "A tale of two legendary revolutionaries and their journey far away from home. After their journey they return home to start fighting back against British colonialists in the 1920s.",
      poster_path: "/rrr-poster.jpg",
      vote_average: 7.3,
      release_date: "2022-03-24",
      genre_ids: [28, 12, 18]
    },
    {
      id: 302,
      title: "Baahubali: The Beginning",
      overview: "In ancient India, an adventurous and daring man becomes involved in a decades-old feud between two warring peoples.",
      poster_path: "/baahubali-1.jpg",
      vote_average: 7.8,
      release_date: "2015-07-10",
      genre_ids: [28, 12, 14]
    },
    {
      id: 303,
      title: "Baahubali 2: The Conclusion",
      overview: "When Shiva, the son of Bahubali, learns about his heritage, he begins to look for answers. His story is juxtaposed with past events that unfolded in the Mahishmati Kingdom.",
      poster_path: "/baahubali-2.jpg",
      vote_average: 8.0,
      release_date: "2017-04-28",
      genre_ids: [28, 12, 14]
    },
    {
      id: 304,
      title: "Pushpa: The Rise",
      overview: "A laborer rises through the ranks of a red sandalwood smuggling syndicate, making some powerful enemies in the process.",
      poster_path: "/pushpa-rise.jpg",
      vote_average: 7.2,
      release_date: "2021-12-17",
      genre_ids: [28, 80, 18]
    },
    {
      id: 305,
      title: "KGF: Chapter 1",
      overview: "In the 1970s, a fierce rebel rises against brutal oppression and becomes the symbol of hope to legions of downtrodden people.",
      poster_path: "/kgf-chapter-1.jpg",
      vote_average: 7.5,
      release_date: "2018-12-21",
      genre_ids: [28, 18, 80]
    },
    {
      id: 306,
      title: "KGF: Chapter 2",
      overview: "Rocky takes control of the Kolar Gold Fields and his newfound power brings the attention of the government and other enemies.",
      poster_path: "/kgf-chapter-2.jpg",
      vote_average: 7.8,
      release_date: "2022-04-14",
      genre_ids: [28, 18, 80]
    },
    {
      id: 307,
      title: "Kantara",
      overview: "A fierce battle between a tribal leader and a forest officer in the backdrop of a sacred grove.",
      poster_path: "/kantara.jpg",
      vote_average: 8.1,
      release_date: "2022-09-30",
      genre_ids: [28, 18, 14]
    },
    {
      id: 308,
      title: "Salaar: Part 1 - Cease Fire",
      overview: "A gang leader tries to keep a promise made to his dying friend and takes on the other criminal gangs.",
      poster_path: "/salaar.jpg",
      vote_average: 7.0,
      release_date: "2023-12-22",
      genre_ids: [28, 18, 80]
    }
  ],
  tamil: [
    {
      id: 401,
      title: "Vikram",
      overview: "A special agent investigates a murder committed by a masked group of serial killers.",
      poster_path: "/vikram-poster.jpg",
      vote_average: 8.2,
      release_date: "2022-05-03",
      genre_ids: [28, 53, 18]
    },
    {
      id: 402,
      title: "Jai Bhim",
      overview: "When a tribal man is arrested for a case of alleged theft, his wife turns to a human-rights lawyer to help bring justice.",
      poster_path: "/jai-bhim.jpg",
      vote_average: 8.8,
      release_date: "2021-11-02",
      genre_ids: [18, 80, 36]
    },
    {
      id: 403,
      title: "Karnan",
      overview: "A young man from a marginalized caste fights for the rights of his community.",
      poster_path: "/karnan.jpg",
      vote_average: 7.5,
      release_date: "2021-04-09",
      genre_ids: [18, 28]
    },
    {
      id: 404,
      title: "Soorarai Pottru",
      overview: "Based on the life of Captain Gopinath, who founded Air Deccan, India's first low-cost airline.",
      poster_path: "/soorarai-pottru.jpg",
      vote_average: 8.1,
      release_date: "2020-11-12",
      genre_ids: [18, 36]
    },
    {
      id: 405,
      title: "Pariyerum Perumal",
      overview: "A law student from a lower caste begins a friendship with his classmate, a girl who belongs to a higher caste.",
      poster_path: "/pariyerum-perumal.jpg",
      vote_average: 8.3,
      release_date: "2018-09-28",
      genre_ids: [18, 10749]
    },
    {
      id: 406,
      title: "Super Deluxe",
      overview: "Four different stories intertwine in this anthology film about love, betrayal, and redemption.",
      poster_path: "/super-deluxe.jpg",
      vote_average: 7.8,
      release_date: "2019-03-29",
      genre_ids: [18, 35, 14]
    },
    {
      id: 407,
      title: "Asuran",
      overview: "A farmer takes an extreme step when the upper caste tries to take away his land.",
      poster_path: "/asuran.jpg",
      vote_average: 8.0,
      release_date: "2019-10-04",
      genre_ids: [18, 28, 80]
    },
    {
      id: 408,
      title: "Kaithi",
      overview: "A recently released prisoner races against time to save his daughter from a drug cartel.",
      poster_path: "/kaithi.jpg",
      vote_average: 7.9,
      release_date: "2019-10-25",
      genre_ids: [28, 18, 53]
    }
  ],
  malayalam: [
    {
      id: 501,
      title: "Drishyam",
      overview: "A man goes to extreme lengths to save his family from punishment after the family commits an accidental crime.",
      poster_path: "/drishyam.jpg",
      vote_average: 8.2,
      release_date: "2013-12-19",
      genre_ids: [18, 53, 80]
    },
    {
      id: 502,
      title: "Premam",
      overview: "A young man's romantic journey through three stages of his life, as a teenager, as a college student and as a grown-up man.",
      poster_path: "/premam.jpg",
      vote_average: 7.8,
      release_date: "2015-05-29",
      genre_ids: [18, 10749, 35]
    },
    {
      id: 503,
      title: "Kumbalangi Nights",
      overview: "Four brothers who share a love-hate relationship with each other cooperate to arrange for the marriage of their eldest brother.",
      poster_path: "/kumbalangi-nights.jpg",
      vote_average: 8.1,
      release_date: "2019-02-09",
      genre_ids: [18, 35, 10749]
    },
    {
      id: 504,
      title: "The Great Indian Kitchen",
      overview: "A newly married woman finds herself trapped in a patriarchal household and decides to break free.",
      poster_path: "/great-indian-kitchen.jpg",
      vote_average: 8.5,
      release_date: "2021-01-15",
      genre_ids: [18, 10749]
    },
    {
      id: 505,
      title: "Joji",
      overview: "A 21-year-old Joji lives with his wealthy father and two brothers. When his father falls ill, Joji's true intentions come to the fore.",
      poster_path: "/joji.jpg",
      vote_average: 7.6,
      release_date: "2021-04-07",
      genre_ids: [18, 53, 80]
    },
    {
      id: 506,
      title: "Minnal Murali",
      overview: "A tailor gains superpowers after being struck by lightning, but must take down an unexpected foe.",
      poster_path: "/minnal-murali.jpg",
      vote_average: 7.4,
      release_date: "2021-12-24",
      genre_ids: [28, 12, 35]
    },
    {
      id: 507,
      title: "Jallikattu",
      overview: "A buffalo escapes from a slaughterhouse in a small town, leading to a wild chase that exposes the primal instincts of the townspeople.",
      poster_path: "/jallikattu.jpg",
      vote_average: 7.8,
      release_date: "2019-10-04",
      genre_ids: [18, 28, 35]
    },
    {
      id: 508,
      title: "Angamaly Diaries",
      overview: "A coming-of-age story set in the small town of Angamaly, focusing on the lives of young men and their conflicts.",
      poster_path: "/angamaly-diaries.jpg",
      vote_average: 7.9,
      release_date: "2017-03-03",
      genre_ids: [18, 35, 80]
    }
  ],
  kannada: [
    {
      id: 601,
      title: "KGF: Chapter 1",
      overview: "In the 1970s, a fierce rebel rises against brutal oppression and becomes the symbol of hope to legions of downtrodden people.",
      poster_path: "/kgf-chapter-1.jpg",
      vote_average: 7.5,
      release_date: "2018-12-21",
      genre_ids: [28, 18, 80]
    },
    {
      id: 602,
      title: "KGF: Chapter 2",
      overview: "Rocky takes control of the Kolar Gold Fields and his newfound power brings the attention of the government and other enemies.",
      poster_path: "/kgf-chapter-2.jpg",
      vote_average: 7.8,
      release_date: "2022-04-14",
      genre_ids: [28, 18, 80]
    },
    {
      id: 603,
      title: "Kantara",
      overview: "A fierce battle between a tribal leader and a forest officer in the backdrop of a sacred grove.",
      poster_path: "/kantara.jpg",
      vote_average: 8.1,
      release_date: "2022-09-30",
      genre_ids: [28, 18, 14]
    },
    {
      id: 604,
      title: "Charlie 777",
      overview: "A young man's journey to find his purpose in life while dealing with family expectations and personal dreams.",
      poster_path: "/charlie-777.jpg",
      vote_average: 7.2,
      release_date: "2022-12-29",
      genre_ids: [18, 35, 10749]
    },
    {
      id: 605,
      title: "Vikrant Rona",
      overview: "A police officer investigates a series of mysterious deaths in a small village.",
      poster_path: "/vikrant-rona.jpg",
      vote_average: 6.8,
      release_date: "2022-07-28",
      genre_ids: [28, 53, 18]
    },
    {
      id: 606,
      title: "Kabzaa",
      overview: "A story of power, revenge, and redemption set in the backdrop of the underworld.",
      poster_path: "/kabzaa.jpg",
      vote_average: 6.5,
      release_date: "2023-03-17",
      genre_ids: [28, 18, 80]
    },
    {
      id: 607,
      title: "Vikrant Rona",
      overview: "A police officer investigates a series of mysterious deaths in a small village.",
      poster_path: "/vikrant-rona.jpg",
      vote_average: 6.8,
      release_date: "2022-07-28",
      genre_ids: [28, 53, 18]
    },
    {
      id: 608,
      title: "Salaar: Part 1 - Cease Fire",
      overview: "A gang leader tries to keep a promise made to his dying friend and takes on the other criminal gangs.",
      poster_path: "/salaar.jpg",
      vote_average: 7.0,
      release_date: "2023-12-22",
      genre_ids: [28, 18, 80]
    }
  ]
};

// Genre mapping
const GENRE_MAP = {
  28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy',
  80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family',
  14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music',
  9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV Movie',
  53: 'Thriller', 10752: 'War', 37: 'Western'
};

// Quick genre shortcuts
const GENRE_FILTERS = {
  action: { id: 28, label: 'Action' },
  romance: { id: 10749, label: 'Romance' },
  comedy: { id: 35, label: 'Comedy' },
  horror: { id: 27, label: 'Horror' },
  scifi: { id: 878, label: 'Sci-Fi' }
};

// Region -> primary language mapping to keep rows scoped
const REGION_LANG = {
  hollywood: 'en',
  bollywood: 'hi',
  punjabi: 'pa',
  telugu: 'te',
  tamil: 'ta',
  malayalam: 'ml',
  kannada: 'kn'
};

const SEARCH_PAGES = 2; // how many pages of results to pull for broader coverage

// State management
let currentTheme = localStorage.getItem('theme') || 'light';
let searchTimer;
let isLoading = false;
let isBackendAvailable = false;
let currentUser = null;
const MIN_SEARCH_CHARS = 3;
const SEARCH_PAGES = 2; // how many pages of results to pull for broader coverage

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
});

async function initializeApp() {
  // Set initial theme
  setTheme(currentTheme);
  
  // Initialize event listeners
  initializeEventListeners();
  
  // Check if user is logged in
  checkAuthStatus();
  
  // Show loading overlay
  showLoadingOverlay();
  
  try {
    // Try to load data from backend first
    await loadAllRegions();
    isBackendAvailable = true;
    
    // Hide loading overlay after a minimum time
    setTimeout(() => {
      hideLoadingOverlay();
    }, 1000);
    
    // Show success toast
    showToast('Movies loaded successfully!', 'success');
    
  } catch (error) {
    console.log('Backend not available, using mock data:', error);
    // Use mock data if backend is not available
    await loadAllRegions();
    isBackendAvailable = false;
    
    setTimeout(() => {
      hideLoadingOverlay();
    }, 1000);
    
    showToast('Using demo data - Backend server not running', 'warning');
  }
}

function initializeEventListeners() {
  // Theme toggle
  $('#themeToggle').addEventListener('click', toggleTheme);
  
  // Search functionality
  $('#search').addEventListener('input', handleSearch);
  $('#search').addEventListener('focus', handleSearchFocus);
  $('#search').addEventListener('blur', handleSearchBlur);
  
  // Movie card interactions
  document.addEventListener('click', handleCardClick);
  $('#closeMovieModal').addEventListener('click', hideMovieModal);
  document.getElementById('movieModal').addEventListener('click', (e) => {
    if (e.target.id === 'movieModal') hideMovieModal();
  });
  
  // Keyboard navigation
  document.addEventListener('keydown', handleKeyboard);
  
  // Auth modal events
  $('#authBtnNav').addEventListener('click', showAuthModal);
  $('#getStartedBtn').addEventListener('click', showAuthModal);
  $('#closeAuthModal').addEventListener('click', hideAuthModal);
  $('#showRegister').addEventListener('click', showRegisterForm);
  $('#showLogin').addEventListener('click', showLoginForm);
  
  // Form submissions
  $('#loginForm').addEventListener('submit', handleLogin);
  $('#registerForm').addEventListener('submit', handleRegister);
  
  // User menu events
  $('#userMenuBtn').addEventListener('click', toggleUserDropdown);
  $('#logoutBtn').addEventListener('click', handleLogout);
  $('#preferencesLink').addEventListener('click', showPreferences);

  // Genre quick filters
  initializeGenreFilters();
  
  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.user-section')) {
      $('#userDropdown').classList.remove('active');
    }
  });
  
  // Region tabs
  $$('.region-tab').forEach(tab => {
    tab.addEventListener('click', () => switchRegion(tab.dataset.region));
  });
}

function initializeGenreFilters() {
  const buttons = $$('.genre-filter-btn');
  if (!buttons.length) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const genreKey = btn.dataset.genreKey;
      buttons.forEach(b => b.classList.toggle('active', b === btn));
      loadGenreRecommendations(genreKey);
    });
  });

  // Prime with first genre by default
  const first = buttons[0];
  if (first) {
    first.classList.add('active');
    loadGenreRecommendations(first.dataset.genreKey);
  }
}

// Region switching
function switchRegion(region) {
  console.log(`Switching to region: ${region}`);
  
  // Update active tab
  $$('.region-tab').forEach(tab => {
    const isActive = tab.dataset.region === region;
    tab.classList.toggle('active', isActive);
    console.log(`Tab ${tab.dataset.region}: ${isActive ? 'active' : 'inactive'}`);
  });
  
  // Update active content
  $$('.region-content').forEach(content => {
    const isActive = content.id === `${region}-content`;
    content.classList.toggle('active', isActive);
    console.log(`Content ${content.id}: ${isActive ? 'active' : 'inactive'}`);
  });
  
  // Update search placeholder
  $('#search').placeholder = `Search ${region} movies...`;
  
  // Load region data if not already loaded
  loadRegionData(region);
}

// Load all regions data
async function loadAllRegions() {
  console.log('Loading all regions...');
  const regions = ['hollywood', 'bollywood', 'punjabi', 'telugu', 'tamil', 'malayalam', 'kannada'];
  
  for (const region of regions) {
    console.log(`Loading region: ${region}`);
    await loadRegionData(region);
  }
  console.log('All regions loaded');
}

// Load data for specific region
async function loadRegionData(region) {
  console.log(`loadRegionData called for: ${region}`);
  const trendingContainer = $(`#${region}-trending`);
  const topContainer = $(`#${region}-top`);
  
  console.log(`Containers found:`, { trendingContainer, topContainer });
  
  if (!trendingContainer || !topContainer) {
    console.log(`Containers not found for region: ${region}`);
    return;
  }
  
  // Check if already loaded
  if (trendingContainer.children.length > 1) {
    console.log(`Region ${region} already loaded`);
    return;
  }
  
  // Try API first for all regions, then fallback to mock data
  try {
    console.log(`Trying to load ${region} from API...`);
    // Load trending movies
    const trendingData = await fetchJSON(`/api/movies/${region}/trending`);
    if (trendingData && trendingData.results) {
      const filteredTrend = filterByRegionLanguage(trendingData.results, region);
      console.log(`API returned ${filteredTrend.length} trending movies for ${region}`);
      renderRow(trendingContainer, filteredTrend);
    }
    
    // Load top rated movies
    const topData = await fetchJSON(`/api/movies/${region}/top_rated`);
    if (topData && topData.results) {
      const filteredTop = filterByRegionLanguage(topData.results, region);
      console.log(`API returned ${filteredTop.length} top movies for ${region}`);
      renderRow(topContainer, filteredTop);
    }
  } catch (error) {
    console.log(`Error loading ${region} data:`, error);
    // Use regional mock data as fallback
    const regionalMovies = MOCK_REGIONAL_MOVIES[region] || MOCK_MOVIES;
    console.log(`Using mock data for ${region}:`, regionalMovies.length, 'movies');
    renderRow(trendingContainer, regionalMovies.slice(0, 4));
    renderRow(topContainer, regionalMovies.slice(4, 8));
  }
}

// Genre-specific quick recommendations
async function loadGenreRecommendations(genreKey) {
  const config = GENRE_FILTERS[genreKey];
  const container = $('#genre-results');
  if (!config || !container) return;

  // Show loading skeletons
  container.innerHTML = `
    <div class="loading-placeholder">
      <div class="skeleton-card"></div>
      <div class="skeleton-card"></div>
      <div class="skeleton-card"></div>
      <div class="skeleton-card"></div>
    </div>
  `;

  const region = getActiveRegion();
  let movies = [];

  try {
    const data = await fetchJSON(`/api/search?q=${encodeURIComponent(config.label)}&region=${region}`);
    const scoped = filterByRegionLanguage(data.results || [], region);
    movies = filterByGenre(scoped, config.id);
  } catch (error) {
    console.log(`Genre fetch failed for ${config.label}, falling back to mock`, error);
  }

  // Fallback to mock data if API empty
  if (!movies.length) {
    const regional = MOCK_REGIONAL_MOVIES[region] || MOCK_MOVIES;
    movies = filterByGenre(regional, config.id);
  }

  renderRow(container, movies.slice(0, 12));
}

// Authentication Functions
function checkAuthStatus() {
  const userData = localStorage.getItem('userData');
  if (userData) {
    try {
      currentUser = JSON.parse(userData);
      updateUIForLoggedInUser();
      loadPersonalizedRecommendations();
    } catch (error) {
      console.error('Error parsing user data:', error);
      localStorage.removeItem('userData');
    }
  } else {
    updateUIForLoggedOutUser();
  }
}

function updateUIForLoggedInUser() {
  $('#authBtnNav').style.display = 'none';
  $('#userSection').style.display = 'flex';
  $('#userName').textContent = currentUser.name;
  $('#personalizedSection').style.display = 'block';
  $('#heroActions').style.display = 'none';
}

function updateUIForLoggedOutUser() {
  $('#authBtnNav').style.display = 'flex';
  $('#userSection').style.display = 'none';
  $('#personalizedSection').style.display = 'none';
  $('#heroActions').style.display = 'block';
}

function showAuthModal() {
  $('#authModal').classList.add('active');
  showLoginForm();
}

function hideAuthModal() {
  $('#authModal').classList.remove('active');
  // Reset forms
  $('#loginForm').reset();
  $('#registerForm').reset();
  // Uncheck all genre checkboxes
  $$('input[name="genres"]').forEach(cb => cb.checked = false);
}

function showLoginForm() {
  $('#loginForm').style.display = 'flex';
  $('#registerForm').style.display = 'none';
  $('#authTitle').textContent = 'Welcome Back';
}

function showRegisterForm() {
  $('#loginForm').style.display = 'none';
  $('#registerForm').style.display = 'flex';
  $('#authTitle').textContent = 'Create Account';
}

async function handleLogin(e) {
  e.preventDefault();
  
  const email = $('#loginEmail').value;
  const password = $('#loginPassword').value;
  
  if (!email || !password) {
    showToast('Please fill in all fields', 'error');
    return;
  }
  
  try {
    // For demo purposes, we'll use local storage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      currentUser = user;
      localStorage.setItem('userData', JSON.stringify(user));
      updateUIForLoggedInUser();
      hideAuthModal();
      showToast(`Welcome back, ${user.name}!`, 'success');
      loadPersonalizedRecommendations();
    } else {
      showToast('Invalid email or password', 'error');
    }
  } catch (error) {
    showToast('Login failed. Please try again.', 'error');
  }
}

async function handleRegister(e) {
  e.preventDefault();
  
  const name = $('#registerName').value;
  const email = $('#registerEmail').value;
  const password = $('#registerPassword').value;
  const confirmPassword = $('#confirmPassword').value;
  
  if (!name || !email || !password || !confirmPassword) {
    showToast('Please fill in all fields', 'error');
    return;
  }
  
  if (password !== confirmPassword) {
    showToast('Passwords do not match', 'error');
    return;
  }
  
  if (password.length < 6) {
    showToast('Password must be at least 6 characters', 'error');
    return;
  }
  
  const selectedGenres = Array.from($$('input[name="genres"]:checked')).map(cb => parseInt(cb.value));
  
  if (selectedGenres.length < 3) {
    showToast('Please select at least 3 genres', 'error');
    return;
  }
  
  try {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check if user already exists
    if (users.find(u => u.email === email)) {
      showToast('User with this email already exists', 'error');
      return;
    }
    
    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      preferences: {
        genres: selectedGenres
      },
      createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    currentUser = newUser;
    localStorage.setItem('userData', JSON.stringify(newUser));
    
    updateUIForLoggedInUser();
    hideAuthModal();
    showToast(`Welcome to MovieFinder, ${name}!`, 'success');
    loadPersonalizedRecommendations();
    
  } catch (error) {
    showToast('Registration failed. Please try again.', 'error');
  }
}

function handleLogout() {
  currentUser = null;
  localStorage.removeItem('userData');
  updateUIForLoggedOutUser();
  $('#userDropdown').classList.remove('active');
  showToast('Logged out successfully', 'success');
}

function toggleUserDropdown() {
  $('#userDropdown').classList.toggle('active');
}

function showPreferences() {
  $('#userDropdown').classList.remove('active');
  showAuthModal();
  showRegisterForm();
  // Pre-fill with current user data
  if (currentUser) {
    $('#registerName').value = currentUser.name;
    $('#registerEmail').value = currentUser.email;
    // Check current genre preferences
    $$('input[name="genres"]').forEach(cb => {
      cb.checked = currentUser.preferences.genres.includes(parseInt(cb.value));
    });
  }
}

// Personalized Recommendations
async function loadPersonalizedRecommendations() {
  if (!currentUser) return;
  
  try {
    const personalizedMovies = getPersonalizedMovies(currentUser.preferences.genres);
    renderRow($("#personalized"), personalizedMovies);
  } catch (error) {
    console.error('Error loading personalized recommendations:', error);
  }
}

function getPersonalizedMovies(userGenres) {
  // Filter movies based on user's genre preferences
  const genreScores = {};
  
  MOCK_MOVIES.forEach(movie => {
    let score = 0;
    movie.genre_ids.forEach(genreId => {
      if (userGenres.includes(genreId)) {
        score += 1;
      }
    });
    genreScores[movie.id] = score;
  });
  
  // Sort by genre match score and rating
  const sortedMovies = MOCK_MOVIES.sort((a, b) => {
    const scoreA = genreScores[a.id] + (a.vote_average / 10);
    const scoreB = genreScores[b.id] + (b.vote_average / 10);
    return scoreB - scoreA;
  });
  
  return sortedMovies.slice(0, 8);
}

// Theme Management
function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  currentTheme = theme;
  localStorage.setItem('theme', theme);
  
  // Update theme toggle icon
  const themeIcon = $('#themeToggle i');
  themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

function toggleTheme() {
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  setTheme(newTheme);
  
  // Add transition effect
  document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
  setTimeout(() => {
    document.body.style.transition = '';
  }, 300);
}

// Loading States
function showLoadingOverlay() {
  const overlay = $('#loadingOverlay');
  overlay.classList.remove('hidden');
}

function hideLoadingOverlay() {
  const overlay = $('#loadingOverlay');
  overlay.classList.add('hidden');
}

// Toast Notifications
function showToast(message, type = 'info') {
  const container = $('#toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <div style="display: flex; align-items: center; gap: 0.5rem;">
      <i class="fas ${getToastIcon(type)}"></i>
      <span>${message}</span>
    </div>
  `;
  
  container.appendChild(toast);
  
  // Auto remove after 3 seconds
  setTimeout(() => {
    toast.style.animation = 'slideInRight 0.3s ease reverse';
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }, 3000);
}

function getToastIcon(type) {
  switch (type) {
    case 'success': return 'fa-check-circle';
    case 'error': return 'fa-exclamation-circle';
    case 'warning': return 'fa-exclamation-triangle';
    default: return 'fa-info-circle';
  }
}

// Enhanced Movie Card Rendering
function renderRow(el, items) {
  // Remove loading placeholders
  const loadingPlaceholder = el.querySelector('.loading-placeholder');
  if (loadingPlaceholder) {
    loadingPlaceholder.remove();
  }
  
  el.innerHTML = "";
  
  if (!items || items.length === 0) {
    el.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: var(--text-secondary);">
        <i class="fas fa-film" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
        <p>No movies found</p>
      </div>
    `;
    return;
  }
  
  for (let i = 0; i < items.length; i++) {
    const m = items[i];
    const node = createMovieCard(m, i);
    el.appendChild(node);
  }
  
  // Add staggered animation
  animateCards(el);
}

function createMovieCard(movie, index) {
  const tpl = $("#card-tpl");
  const node = tpl.content.cloneNode(true);
  
  const card = node.querySelector(".movie-card");
  const img = node.querySelector(".card-image");
  const title = node.querySelector(".movie-title");
  const meta = node.querySelector(".movie-meta");
  const ratingText = node.querySelector(".rating-text");
  const genres = node.querySelector(".movie-genres");
  
  // Set image with fallback
  img.src = IMG(movie.poster_path) || IMG(movie.backdrop_path) || "";
  img.alt = movie.title || movie.name || "Movie";
  
  // Handle image loading
  img.onload = () => {
    card.style.opacity = '1';
  };
  
  img.onerror = () => {
    img.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 450"><rect width="300" height="450" fill="%23e9ecef"/><text x="150" y="225" text-anchor="middle" fill="%236c757d" font-family="Arial" font-size="16">No Image</text></svg>';
  };
  
  // Set content
  title.textContent = movie.title || movie.name || "";
  meta.textContent = formatMovieMeta(movie);
  ratingText.textContent = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";
  
  // Add genres if available
  if (movie.genre_ids && movie.genre_ids.length > 0) {
    const genreNames = getGenreNames(movie.genre_ids);
    genres.innerHTML = genreNames.slice(0, 2).map(genre => 
      `<span class="genre-tag">${genre}</span>`
    ).join('');
  }
  
  // Add movie data for interactions
  card.dataset.movieId = movie.id;
  card.dataset.movieTitle = movie.title || movie.name;
  
  // Add staggered animation delay
  card.style.animationDelay = `${index * 0.1}s`;
  
  return node;
}

function formatMovieMeta(movie) {
  const year = movie.release_date ? new Date(movie.release_date).getFullYear() : '';
  const rating = movie.vote_average ? `⭐ ${movie.vote_average.toFixed(1)}` : '';
  return [year, rating].filter(Boolean).join(' • ');
}

function getGenreNames(genreIds) {
  return genreIds.map(id => GENRE_MAP[id]).filter(Boolean);
}

function animateCards(container) {
  const cards = container.querySelectorAll('.movie-card');
  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 100);
  });
}

// Helpers
function filterMockByQuery(query) {
  const q = query.toLowerCase();
  return MOCK_MOVIES.filter(m =>
    (m.title && m.title.toLowerCase().includes(q)) ||
    (m.overview && m.overview.toLowerCase().includes(q))
  );
}

function filterByGenre(movies, genreId) {
  return (movies || []).filter(
    m => Array.isArray(m.genre_ids) && m.genre_ids.includes(genreId)
  );
}

function filterByRegionLanguage(movies, regionKey) {
  const lang = REGION_LANG[regionKey];
  if (!lang) return movies || [];
  return (movies || []).filter(m => m.original_language === lang);
}

async function searchMoviesForQuery(query, region, pages = 1) {
  const pageResults = [];
  for (let p = 1; p <= pages; p++) {
    try {
      const data = await fetchJSON(`/api/search?q=${encodeURIComponent(query)}&region=${region}&page=${p}`);
      pageResults.push(...(data.results || []));
    } catch (err) {
      console.log(`Search page ${p} failed`, err);
      break;
    }
  }
  return filterByRegionLanguage(pageResults, region);
}

function dedupeById(items) {
  const seen = new Set();
  const out = [];
  for (const item of items) {
    if (!item || seen.has(item.id)) continue;
    seen.add(item.id);
    out.push(item);
  }
  return out;
}

async function fetchMovieDetails(movieId) {
  const id = parseInt(movieId, 10);
  try {
    const data = await fetchJSON(`/api/movie/${id}`);
    return data;
  } catch (err) {
    const mock = findMockById(id);
    if (mock) return mock;
    throw err;
  }
}

function findMockById(id) {
  const regional = Object.values(MOCK_REGIONAL_MOVIES).flat();
  return [...MOCK_MOVIES, ...regional].find(m => m.id === id);
}

function renderMovieModal(movie) {
  if (!movie) return;
  const modal = $('#movieModal');
  const img = $('#movieModalImg');
  const title = $('#movieModalTitle');
  const meta = $('#movieModalMeta');
  const genresEl = $('#movieModalGenres');
  const overview = $('#movieModalOverview');

  img.src = IMG(movie.poster_path || movie.backdrop_path, 500) || '';
  img.alt = movie.title || movie.name || 'Movie';
  title.textContent = movie.title || movie.name || 'Untitled';
  meta.textContent = formatMovieMeta(movie);

  const genres = movie.genre_ids || (movie.genres ? movie.genres.map(g => g.id) : []);
  const names = getGenreNames(genres);
  genresEl.innerHTML = names.map(g => `<span class="genre-tag">${g}</span>`).join('');

  overview.textContent = movie.overview || 'No description available.';

  modal.classList.add('active');
}

function hideMovieModal() {
  $('#movieModal').classList.remove('active');
}

// Enhanced Search Functionality
function handleSearch(e) {
  const query = e.target.value.trim();
  clearTimeout(searchTimer);
  
  if (query.length < MIN_SEARCH_CHARS) {
    hideSmartSection();
    $('#smart').innerHTML = '';
    clearSuggestions();
    return;
  }
  
  searchTimer = setTimeout(() => {
    performSearch(query);
  }, 250);
}

async function performSearch(query) {
  if (isLoading) return;
  isLoading = true;
  showSmartSection();

  let results = [];
  
  // Get current active region
  const currentRegion = getActiveRegion();
  
  try {
    // Pull semantic + wide search results then merge
    const [semanticData, searchData] = await Promise.all([
      fetchJSON(`/api/query_recommendations?q=${encodeURIComponent(query)}&region=${currentRegion}`).catch(() => ({ results: [] })),
      searchMoviesForQuery(query, currentRegion, SEARCH_PAGES).catch(() => [])
    ]);

    const semantic = filterByRegionLanguage(semanticData.results || [], currentRegion);
    const combined = dedupeById([...semantic, ...searchData]);
    results = combined;
  } catch (err) {
    // Fall back to mock results on any error
    const regionalMovies = MOCK_REGIONAL_MOVIES[currentRegion] || MOCK_MOVIES;
    results = regionalMovies.filter(movie => 
      movie.title.toLowerCase().includes(query.toLowerCase()) ||
      movie.overview.toLowerCase().includes(query.toLowerCase())
    );
  }

  try {
    renderRow($("#smart"), results);
    updateSearchSuggestions(results.slice(0, 6), query);
    showToast(results.length ? `Found ${results.length} ${currentRegion} movies for "${query}"` : `No ${currentRegion} movies found for "${query}"`, results.length ? 'success' : 'warning');
  } catch (renderErr) {
    console.error('Render error:', renderErr);
  } finally {
    isLoading = false;
  }
}

function showSmartSection() {
  const section = $('#smartSection');
  section.style.display = 'block';
  section.style.animation = 'fadeInUp 0.5s ease';
}

function hideSmartSection() {
  const section = $('#smartSection');
  section.style.animation = 'fadeInUp 0.5s ease reverse';
  setTimeout(() => {
    section.style.display = 'none';
  }, 500);
}

function handleSearchFocus() {
  const suggestions = $('#searchSuggestions');
  suggestions.classList.add('active');
}

function handleSearchBlur() {
  setTimeout(() => {
    const suggestions = $('#searchSuggestions');
    suggestions.classList.remove('active');
  }, 200);
}

function clearSuggestions() {
  $('#searchSuggestions').innerHTML = '';
}

function updateSearchSuggestions(movies, query) {
  const container = $('#searchSuggestions');
  if (!container) return;

  if (!movies || !movies.length || query.length < MIN_SEARCH_CHARS) {
    clearSuggestions();
    return;
  }

  container.classList.add('active');
  container.innerHTML = movies.slice(0, 6).map(movie => {
    const year = movie.release_date ? new Date(movie.release_date).getFullYear() : '';
    return `
      <div class="suggestion-item" data-movie-id="${movie.id}" data-title="${movie.title || movie.name || ''}">
        <span class="suggestion-title">${movie.title || movie.name || ''}</span>
        <span class="suggestion-meta">${year}</span>
      </div>
    `;
  }).join('');

  container.querySelectorAll('.suggestion-item').forEach(item => {
    item.addEventListener('click', () => {
      const title = item.dataset.title;
      $('#search').value = title;
      clearSuggestions();
      showMovieDetails(item.dataset.movieId, title);
    });
  });
}

function getActiveRegion() {
  const activeTab = document.querySelector('.region-tab.active');
  return activeTab ? activeTab.dataset.region : 'hollywood';
}

// Enhanced Data Loading
async function loadRows() {
  const [trend, top] = await Promise.all([
    fetchJSON("/api/trending"),
    fetchJSON("/api/top_rated"),
  ]);
  renderRow($("#trending"), trend.results || []);
  renderRow($("#top"), top.results || []);
}

// Mock data loading
async function loadMockData() {
  await new Promise(resolve => setTimeout(resolve, 500));
  renderRow($("#trending"), MOCK_MOVIES.slice(0, 4));
  renderRow($("#top"), MOCK_MOVIES.slice(4, 8));
}

async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`HTTP ${res.status}: ${errorText}`);
  }
  return res.json();
}

// Card Interactions
function handleCardClick(e) {
  const card = e.target.closest('.movie-card');
  if (!card) return;
  const movieTitle = card.dataset.movieTitle;
  if (e.target.closest('.play-btn')) {
    showToast(`Playing ${movieTitle}`, 'success');
  } else {
    showMovieDetails(card.dataset.movieId, movieTitle);
  }
}

async function showMovieDetails(movieId, movieTitle = '') {
  try {
    const details = await fetchMovieDetails(movieId);
    renderMovieModal(details);
  } catch (err) {
    console.error('Detail fetch failed', err);
    showToast(`Could not load details for ${movieTitle || 'this title'}`, 'error');
  }
}

// Keyboard Navigation
function handleKeyboard(e) {
  if (e.key === 'Escape') {
    $('#searchSuggestions').classList.remove('active');
    $('#search').blur();
    hideAuthModal();
    $('#userDropdown').classList.remove('active');
  }
  if (e.key === '/' && !e.target.matches('input, textarea')) {
    e.preventDefault();
    $('#search').focus();
  }
}

// Performance optimizations
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Intersection Observer for lazy loading (if needed)
function setupIntersectionObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      }
    });
  });
  
  // Observe all movie card images
  document.querySelectorAll('.card-image[data-src]').forEach(img => {
    observer.observe(img);
  });
}

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    IMG,
    renderRow,
    fetchJSON,
    showToast
  };
}
