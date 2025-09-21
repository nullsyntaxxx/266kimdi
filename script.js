// Data for students and classes (cleaned up and adapted)
const students = [
  {
    "id": "s001",
    "name": "Faiq",
    "class": "11B",
    "public": {
      "bio": "Afsiant",
      "girl": null,
      "boy": false
    },
    "consent": true
  },
  {
    "id": "s001",
    "name": "Fəxri",
    "class": "11B",
    "public": {
      "bio": "Peyse...",
      "girl": false,
      "boy": false
    },
    "consent": true
  }
];

// Get elements from the DOM
const searchInput = document.getElementById('q');
const resultsContainer = document.getElementById('results');
const noResultsMessage = document.getElementById('no-results-message');
const loadingSpinner = document.getElementById('loading');
let currentTimeout;

// Function to render the list of students
function render(list) {
  resultsContainer.innerHTML = '';

  // Show no results message if list is empty
  if (!list.length) {
    noResultsMessage.classList.remove('hidden');
    loadingSpinner.classList.add('hidden');
    return;
  }

  // Hide loading spinner and no results message
  loadingSpinner.classList.add('hidden');
  noResultsMessage.classList.add('hidden');

  list.forEach(s => {
    const el = document.createElement('div');
    el.className = 'bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2';

    // Handle gender status and class
    let genderStatus = '';
    let genderClass = 'bg-gray-400';
    if (s.public.girl !== undefined && s.public.girl !== null) {
      if (s.public.girl === true) { genderStatus = 'Yaxşı qız'; genderClass = 'bg-pink-500'; }
      else if (s.public.girl === false) { genderStatus = 'Pis qız'; genderClass = 'bg-pink-500'; }
    } else if (s.public.boy !== undefined && s.public.boy !== null) {
      if (s.public.boy === true) { genderStatus = 'Yaxşı oğlan'; genderClass = 'bg-green-500'; }
      else if (s.public.boy === false) { genderStatus = 'Pis oğlan'; genderClass = 'bg-red-500'; }
    } else {
      genderStatus = 'Neytral';
      genderClass = 'bg-slate-400';
    }

    // Render card content based on consent
    if (s.consent) {
      el.innerHTML = `
                        <h3 class="text-2xl font-semibold mb-1 text-slate-900">${s.name}</h3>
                        <div class="flex items-center space-x-2 mb-2">
                            <p class="text-md text-slate-500">${s.class}</p>
                            <span class="inline-block text-white text-xs font-bold px-3 py-1 rounded-full ${genderClass}">
                                ${genderStatus}
                            </span>
                        </div>
                        <p class="text-slate-600 text-sm mt-2">${s.public.bio}</p>
                    `;
    } else {
      el.innerHTML = `
                        <h3 class="text-2xl font-semibold mb-1 text-slate-900">${s.name}</h3>
                        <div class="flex items-center space-x-2 mb-2">
                            <p class="text-md text-slate-500">${s.class}</p>
                        </div>
                        <p class="text-slate-500 text-sm mt-2">Profil gizlidir — razılıq yoxdur.</p>
                    `;
    }

    resultsContainer.appendChild(el);
  });
}

// Function to handle filtering and rendering
function handleSearch(query) {
  loadingSpinner.classList.remove('hidden');
  noResultsMessage.classList.add('hidden');
  resultsContainer.innerHTML = '';

  const filtered = students.filter(s => (s.name + ' ' + s.class).toLowerCase().includes(query.toLowerCase()));

  setTimeout(() => { // Simulate a network delay for better UX
    render(filtered);
  }, 300);
}

// Event listener for search input
searchInput.addEventListener('input', (e) => {
  clearTimeout(currentTimeout);
  currentTimeout = setTimeout(() => {
    handleSearch(e.target.value.trim());
  }, 500); // Debounce
});

// Initial render on page load
document.addEventListener('DOMContentLoaded', () => {
  handleSearch('');
});