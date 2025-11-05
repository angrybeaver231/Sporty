// DOM Elements
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mainNav = document.getElementById('mainNav');
const navLinks = document.querySelectorAll('.nav-link');
const header = document.querySelector('.header');
const createGameForm = document.getElementById('createGameForm');
const filterBtns = document.querySelectorAll('.filter-btn');
const tabBtns = document.querySelectorAll('.tab-btn');
const playersSearchInput = document.getElementById('playersSearch');
const playersSortSelect = document.getElementById('playersSort');

// Mobile Menu Toggle
mobileMenuBtn?.addEventListener('click', () => {
    mainNav.classList.toggle('active');
    
    // Animate hamburger menu
    const spans = mobileMenuBtn.querySelectorAll('span');
    spans[0].style.transform = mainNav.classList.contains('active') 
        ? 'rotate(45deg) translateY(10px)' 
        : 'none';
    spans[1].style.opacity = mainNav.classList.contains('active') ? '0' : '1';
    spans[2].style.transform = mainNav.classList.contains('active') 
        ? 'rotate(-45deg) translateY(-10px)' 
        : 'none';
});

// Smooth Scrolling for Navigation
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            
            // Update active nav link
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Close mobile menu
            mainNav.classList.remove('active');
        }
    });
});

// Scroll Header Effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Animated Counter
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Animate counters
            if (entry.target.classList.contains('hero-stats')) {
                const counters = entry.target.querySelectorAll('.stat-number');
                counters.forEach(counter => animateCounter(counter));
            }
            
            // Animate feature cards
            if (entry.target.classList.contains('feature-card')) {
                const delay = entry.target.getAttribute('data-delay') || 0;
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, delay);
            }
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.hero-stats, .feature-card').forEach(el => {
    if (el.classList.contains('feature-card')) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
    }
    observer.observe(el);
});

// Sample Data
const venues = [
    { id: 1, name: 'Спортивный комплекс "Центр"', sport: 'padel', district: 'Центральный', distance: 2.3, rating: 4.8 },
    { id: 2, name: 'Арена "Динамо"', sport: 'football', district: 'Северный', distance: 4.1, rating: 4.6 },
    { id: 3, name: 'Корт клуб "Олимп"', sport: 'tennis', district: 'Западный', distance: 3.5, rating: 4.9 },
    { id: 4, name: 'Баскетбольная площадка "Парк"', sport: 'basketball', district: 'Южный', distance: 1.8, rating: 4.5 },
    { id: 5, name: 'Волейбольный центр "Прибой"', sport: 'volleyball', district: 'Восточный', distance: 5.2, rating: 4.7 }
];

const games = [
    { id: 1, sport: 'Падел-теннис', title: 'Вечерняя игра', time: 'Сегодня, 18:00', level: 'Любитель', rating: 3.5, slots: '2/4', venue: 'Спортивный комплекс "Центр"' },
    { id: 2, sport: 'Футбол', title: 'Футбол 5x5', time: 'Сегодня, 19:30', level: 'Любой', rating: 2.0, slots: '3/10', venue: 'Арена "Динамо"' },
    { id: 3, sport: 'Баскетбол', title: 'Стритбол', time: 'Завтра, 17:00', level: 'Продвинутый', rating: 4.0, slots: '1/8', venue: 'Баскетбольная площадка "Парк"' },
    { id: 4, sport: 'Теннис', title: 'Парный теннис', time: 'Завтра, 16:00', level: 'Любитель', rating: 3.0, slots: '2/4', venue: 'Корт клуб "Олимп"' },
    { id: 5, sport: 'Волейбол', title: 'Пляжный волейбол', time: 'Завтра, 20:00', level: 'Начинающий', rating: 2.5, slots: '4/6', venue: 'Волейбольный центр "Прибой"' }
];

const players = [
    { id: 1, name: 'Алексей Иванов', rating: 4.5, games: 47, winrate: 68, avatar: 'АИ' },
    { id: 2, name: 'Мария Петрова', rating: 3.8, games: 34, winrate: 55, avatar: 'МП' },
    { id: 3, name: 'Дмитрий Смирнов', rating: 5.2, games: 89, winrate: 75, avatar: 'ДС' },
    { id: 4, name: 'Елена Козлова', rating: 4.1, games: 52, winrate: 62, avatar: 'ЕК' },
    { id: 5, name: 'Иван Сидоров', rating: 3.5, games: 28, winrate: 50, avatar: 'ИС' },
    { id: 6, name: 'Анна Волкова', rating: 4.7, games: 71, winrate: 70, avatar: 'АВ' },
    { id: 7, name: 'Петр Новиков', rating: 3.2, games: 19, winrate: 42, avatar: 'ПН' },
    { id: 8, name: 'Ольга Морозова', rating: 4.3, games: 56, winrate: 64, avatar: 'ОМ' }
];

// Render Functions
function renderVenues(venuesToRender = venues) {
    const venuesList = document.getElementById('venuesList');
    if (!venuesList) return;
    
    venuesList.innerHTML = venuesToRender.map(venue => `
        <div class="venue-item" onclick="selectVenue(${venue.id})">
            <div class="venue-name">${venue.name}</div>
            <div class="venue-details">
                ${venue.distance} км • ★ ${venue.rating}
            </div>
        </div>
    `).join('');
}

function renderGames(gamesToRender = games) {
    const gamesGrid = document.getElementById('gamesGrid');
    if (!gamesGrid) return;
    
    gamesGrid.innerHTML = gamesToRender.map(game => `
        <div class="game-card">
            <div class="game-sport">${game.sport}</div>
            <h3 class="game-title">${game.title}</h3>
            <div class="game-info-grid">
                <div class="game-info-item">
                    <span>📅</span>
                    <span>${game.time}</span>
                </div>
                <div class="game-info-item">
                    <span>📍</span>
                    <span>${game.venue}</span>
                </div>
                <div class="game-info-item">
                    <span>🎯</span>
                    <span>${game.level}</span>
                </div>
                <div class="game-info-item">
                    <span>⭐</span>
                    <span>Мин. ${game.rating}</span>
                </div>
            </div>
            <div class="game-slots">
                <span class="slots-info">Свободно мест:</span>
                <span class="slots-available">${game.slots}</span>
            </div>
            <button class="btn btn-primary btn-block" onclick="joinGame(${game.id})">
                Присоединиться
            </button>
        </div>
    `).join('');
}

function renderPlayers(playersToRender = players) {
    const playersGrid = document.getElementById('playersGrid');
    if (!playersGrid) return;
    
    playersGrid.innerHTML = playersToRender.map(player => `
        <div class="player-card" onclick="viewPlayer(${player.id})">
            <div class="player-avatar">${player.avatar}</div>
            <div class="player-name">${player.name}</div>
            <div class="player-rating">${player.rating}</div>
            <div class="player-games">${player.games} игр • ${player.winrate}% побед</div>
            <button class="btn btn-secondary btn-block">Профиль</button>
        </div>
    `).join('');
}

function renderUpcomingGames() {
    const upcomingGames = document.getElementById('upcomingGames');
    if (!upcomingGames) return;
    
    upcomingGames.innerHTML = games.slice(0, 3).map(game => `
        <div class="game-list-item">
            <div class="game-list-info">
                <h4>${game.sport}</h4>
                <div class="game-list-details">
                    ${game.time} • ${game.level} • ${game.venue}
                </div>
            </div>
            <button class="join-btn">Детали</button>
        </div>
    `).join('');
}

// Filter Functions
function filterVenues() {
    const sport = document.getElementById('sportFilter')?.value || '';
    const district = document.getElementById('districtFilter')?.value.toLowerCase() || '';
    const distance = parseFloat(document.getElementById('distanceFilter')?.value) || Infinity;
    
    const filtered = venues.filter(venue => {
        return (!sport || venue.sport === sport) &&
               (!district || venue.district.toLowerCase().includes(district)) &&
               (venue.distance <= distance);
    });
    
    renderVenues(filtered);
    
    // Show notification
    showNotification(`Найдено ${filtered.length} площадок`);
}

function filterGames(filter) {
    // In real app, this would filter by date
    const filtered = games; // Simplified for demo
    renderGames(filtered);
    
    // Update active button
    filterBtns.forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-filter') === filter);
    });
}

// Event Handlers
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        filterGames(filter);
    });
});

// Form Submission
createGameForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = {
        sport: document.getElementById('sportType').value,
        dateTime: document.getElementById('gameDateTime').value,
        level: document.getElementById('gameLevel').value,
        minRating: document.getElementById('minRating').value,
        slots: document.getElementById('totalSlots').value,
        venue: document.getElementById('venue').value,
        description: document.getElementById('gameDescription').value
    };
    
    console.log('Creating game:', formData);
    showNotification('Игра успешно создана!', 'success');
    createGameForm.reset();
});

// Tab Switching
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const tabName = btn.getAttribute('data-tab');
        
        // Update buttons
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Update content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(tabName)?.classList.add('active');
    });
});

// Players Search and Sort
playersSearchInput?.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = players.filter(player => 
        player.name.toLowerCase().includes(searchTerm)
    );
    renderPlayers(filtered);
});

playersSortSelect?.addEventListener('change', (e) => {
    const sortBy = e.target.value;
    const sorted = [...players].sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'games') return b.games - a.games;
        if (sortBy === 'winrate') return b.winrate - a.winrate;
        return 0;
    });
    renderPlayers(sorted);
});

// Helper Functions
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function selectVenue(venueId) {
    const venue = venues.find(v => v.id === venueId);
    if (venue) {
        document.getElementById('venue').value = venue.name;
        showNotification(`Выбрана площадка: ${venue.name}`);
        scrollToSection('create');
    }
}

function joinGame(gameId) {
    const game = games.find(g => g.id === gameId);
    if (game) {
        showNotification(`Вы присоединились к игре: ${game.title}`, 'success');
    }
}

function viewPlayer(playerId) {
    const player = players.find(p => p.id === playerId);
    if (player) {
        showNotification(`Просмотр профиля: ${player.name}`);
    }
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'var(--success)' : 'var(--primary)'};
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;
    notification.textContent = message;
    
    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(400px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideIn 0.3s ease-out reverse';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderVenues();
    renderGames();
    renderPlayers();
    renderUpcomingGames();
    
    // Set minimum date for game creation to today
    const dateTimeInput = document.getElementById('gameDateTime');
    if (dateTimeInput) {
        const now = new Date();
        now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
        dateTimeInput.min = now.toISOString().slice(0, 16);
    }
});

// Prevent form submission on Enter key (except in textarea)
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
    }
});
