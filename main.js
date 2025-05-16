// Dark mode toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const htmlElement = document.documentElement;
const savedTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
  htmlElement.classList.add('dark');
  darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
} else {
  darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
}

darkModeToggle.addEventListener('click', () => {
  if (htmlElement.classList.contains('dark')) {
    htmlElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  } else {
    htmlElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }
});

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});

// Section navigation
function showSection(sectionId) {
  document.querySelectorAll('.section').forEach(section => {
    section.classList.add('hidden');
  });
  document.getElementById(sectionId).classList.remove('hidden');
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.textContent.toLowerCase() === sectionId) {
      link.classList.add('active');
    }
  });
  mobileMenu.classList.add('hidden');
}

// Clock and open status
function updateClock() {
  const now = new Date();
  const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  document.getElementById('liveTime').textContent = timeString;

  const hour = now.getHours();
  const day = now.getDay();

  let isOpen = false;
  let statusText = '';

  if (day === 0) {
    isOpen = hour >= 9 && hour < 19;
  } else if (day >= 1 && day <= 5) {
    isOpen = hour >= 7 && hour < 20;
  } else if (day === 6) {
    isOpen = hour >= 8 && hour < 21;
  }
  statusText = isOpen ? "We're Open Now!" : "We're Closed";

  const openStatus = document.getElementById('openStatus');
  if (openStatus) {
    openStatus.textContent = statusText;
    const statusIndicator = openStatus.previousElementSibling;
    if (isOpen) {
      statusIndicator.classList.add('bg-green-500');
      statusIndicator.classList.remove('bg-red-500');
    } else {
      statusIndicator.classList.add('bg-red-500');
      statusIndicator.classList.remove('bg-green-500');
    }
  }
}

setInterval(updateClock, 1000);
updateClock();

// Menu filtering and search
const menuSearch = document.getElementById('menuSearch');
if (menuSearch) {
  menuSearch.addEventListener('input', filterMenuItems);
}

const menuFilterBtns = document.querySelectorAll('.menu-filter-btn');
menuFilterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    menuFilterBtns.forEach(b => b.classList.remove('btn-primary'));
    btn.classList.add('btn-primary');
    filterMenuItems();
  });
});

function filterMenuItems() {
  const searchTerm = menuSearch ? menuSearch.value.toLowerCase() : '';
  const activeCategory = document.querySelector('.menu-filter-btn.btn-primary').dataset.category;
  const menuItems = document.querySelectorAll('[data-category]');
  menuItems.forEach(item => {
    const itemName = item.querySelector('h3').textContent.toLowerCase();
    const itemCategory = item.dataset.category;
    const matchesSearch = itemName.includes(searchTerm);
    const matchesCategory = activeCategory === 'all' || itemCategory === activeCategory;
    item.style.display = (matchesSearch && matchesCategory) ? 'block' : 'none';
  });
}

// Global search redirects to Menu
const searchInput = document.getElementById('searchInput');
if (searchInput) {
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const searchTerm = searchInput.value.toLowerCase();
      showSection('menu');
      if (menuSearch) {
        menuSearch.value = searchTerm;
        filterMenuItems();
      }
    }
  });
}

// Contact form
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your message! This is a demo form.');
    contactForm.reset();
  });
}

// Chart tooltips
const chartBars = document.querySelectorAll('.chart-bar');
chartBars.forEach(bar => {
  bar.addEventListener('mouseenter', () => {
    const value = bar.dataset.value || bar.dataset.hour;
    const tooltip = document.createElement('div');
    tooltip.className = 'absolute p-2 bg-white dark:bg-gray-800 rounded shadow-lg text-sm';
    tooltip.style.bottom = `calc(${bar.style.height} + 10px)`;
    tooltip.style.left = '50%';
    tooltip.style.transform = 'translateX(-50%)';
    tooltip.textContent = value;
    bar.appendChild(tooltip);
  });
  bar.addEventListener('mouseleave', () => {
    const tooltip = bar.querySelector('div');
    if (tooltip) tooltip.remove();
  });
});

// Animate charts on load
document.addEventListener('DOMContentLoaded', () => {
  showSection('home');
  chartBars.forEach(bar => {
    const originalHeight = bar.style.height;
    bar.style.height = '0';
    setTimeout(() => {
      bar.style.height = originalHeight;
    }, 300);
  });
});