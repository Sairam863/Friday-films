// Movie Data
const movies = [
    { id: 1, title: "Avengers: Endgame", genre: "Action, Sci-Fi", duration: "3h 1m", language: "English", price: "₹350", poster: "🎥", rating: 4.8 },
    { id: 2, title: "Dune: Part Two", genre: "Sci-Fi, Adventure", duration: "2h 46m", language: "English", price: "₹420", poster: "🌌", rating: 4.7 },
    { id: 3, title: "RRR", genre: "Action, Drama", duration: "3h 7m", language: "Telugu", price: "₹250", poster: "🔥", rating: 4.9 },
    { id: 4, title: "Pushpa 2", genre: "Action, Drama", duration: "2h 45m", language: "Telugu", price: "₹300", price: "₹300", poster: "💃", rating: 4.6 },
    { id: 5, title: "Oppenheimer", genre: "Biography, Drama", duration: "3h", language: "English", price: "₹380", poster: "☢️", rating: 4.5 },
    { id: 6, title: "Kalki 2898 AD", genre: "Sci-Fi, Action", duration: "2h 58m", language: "Telugu", price: "₹450", poster: "⚡", rating: 4.9 },
    { id: 7, title: "Jawan", genre: "Action, Thriller", duration: "2h 49m", language: "Hindi", price: "₹280", poster: "🦅", rating: 4.4 },
    { id: 8, title: "Animal", genre: "Action, Drama", duration: "3h 21m", language: "Hindi", price: "₹320", poster: "🐺", rating: 4.3 }
];

// DOM Elements
const searchInput = document.getElementById('searchInput');
const moviesContainer = document.getElementById('moviesContainer');
const movieModal = document.getElementById('movieModal');
const bookingModal = document.getElementById('bookingModal');
const sliderContainer = document.querySelector('.slider-container');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.slider-prev');
const nextBtn = document.querySelector('.slider-next');
const filterTabs = document.querySelectorAll('.filter-tab');
const filterSelects = document.querySelectorAll('.filter-select');

// State
let currentSlide = 0;
let filteredMovies = [...movies];

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    renderMovies(filteredMovies);
    initSlider();
    initFilters();
    initSearch();
});

// Render Movies
function renderMovies(movies) {
    moviesContainer.innerHTML = movies.map(movie => `
        <div class="movie-card" onclick="openMovieModal(${movie.id})">
            <div class="movie-poster" data-icon="${movie.poster}">
                ${movie.poster}
            </div>
            <div class="movie-info">
                <div class="movie-title">${movie.title}</div>
                <div class="movie-genre">${movie.genre}</div>
                <div class="movie-details">
                    <span>${movie.duration} • ${movie.language}</span>
                    <span>⭐ ${movie.rating}</span>
                </div>
                <div style="display: flex; gap: 10px; align-items: center;">
                    <span style="font-size: 1.1rem; font-weight: 600; color: #ffd700;">${movie.price}</span>
                    <button class="book-now" onclick="event.stopPropagation(); openBookingModal(${movie.id})">
                        Book Now
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Search Functionality
function initSearch() {
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        filteredMovies = movies.filter(movie => 
            movie.title.toLowerCase().includes(query) ||
            movie.genre.toLowerCase().includes(query)
        );
        renderMovies(filteredMovies);
    });
}

// Slider Functionality
function initSlider() {
    prevBtn.addEventListener('click', () => changeSlide(-1));
    nextBtn.addEventListener('click', () => changeSlide(1));
    
    setInterval(() => changeSlide(1), 5000);
}

function changeSlide(direction) {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + direction + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
}

// Filter Functionality
function initFilters() {
    filterTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            filterTabs.forEach(t => t.classList.remove('active'));
            e.target.classList.add('active');
        });
    });

    filterSelects.forEach(select => {
        select.addEventListener('change', applyFilters);
    });
}

function applyFilters() {
    const dateFilter = document.getElementById('dateFilter').value;
    const languageFilter = document.getElementById('languageFilter').value;
    const genreFilter = document.getElementById('genreFilter').value;
    const priceFilter = document.getElementById('priceFilter').value;

    filteredMovies = movies.filter(movie => {
        // Apply filters
        let matches = true;
        
        if (languageFilter !== 'All Languages' && !movie.language.includes(languageFilter)) {
            matches = false;
        }
        
        if (genreFilter !== 'All Genres' && !movie.genre.toLowerCase().includes(genreFilter.toLowerCase())) {
            matches = false;
        }
        
        // Price filter logic
        if (priceFilter !== 'All Prices') {
            const price = parseInt(movie.price.replace('₹', ''));
            if (priceFilter === '₹100 - ₹200' && (price < 100 || price > 200)) matches = false;
            if (priceFilter === '₹200 - ₹400' && (price < 200 || price > 400)) matches = false;
            if (priceFilter === '₹400+' && price < 400) matches = false;
        }
        
        return matches;
    });
    
    renderMovies(filteredMovies);
}

// Modal Functions
function openMovieModal(movieId) {
    const movie = movies.find(m => m.id === movieId);
    document.getElementById('modalBody').innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
            <div>
                <h2 style="font-size: 2.5rem; margin-bottom: 1rem;">${movie.title}</h2>
                <div style="display: flex; gap: 1rem; margin-bottom: 1rem; color: #ffd700; font-size: 1.1rem;">
                    <span>⭐ ${movie.rating}</span>
                    <span>${movie.duration}</span>
                    <span>${movie.language}</span>
                </div>
                <p style="margin-bottom: 2rem; line-height: 1.7;">Epic blockbuster now playing in select theaters near you. Experience the ultimate cinematic adventure with IMAX, 3D and Dolby Atmos formats available.</p>
                <div style="background: rgba(255,255,255,0.1); padding: 1.5rem; border-radius: 15px; margin-bottom: 2rem;">
                    <h4 style="margin-bottom: 1rem;">Showtimes Today</h4>
                    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                        <button style="background: #1e3c72; color: white; border: none; padding: 10px 20px; border-radius: 25px; cursor: pointer;" onclick="selectShowtime('10:30 AM')">10:30 AM</button>
                        <button style="background: #1e3c72; color: white; border: none; padding: 10px 20px; border-radius: 25px; cursor: pointer;" onclick="selectShowtime('1:15 PM')">1:15 PM</button>
                        <button style="background: #1e3c72; color: white; border: none; padding: 10px 20px; border-radius: 25px; cursor: pointer;" onclick="selectShowtime('4:45 PM')">4:45 PM</button>
                        <button style="background: #1e3c72; color: white; border: none; padding: 10px 20px; border-radius: 25px; cursor: pointer;" onclick="selectShowtime('8:30 PM')">8:30 PM</button>
                    </div>
                </div>
            </div>
            <div>
                <div style="background: linear-gradient(45deg, #1e3c72, #2a5298); height: 300px; border-radius: 20px; display: flex; align-items: center; justify-content: center; font-size: 6rem; margin-bottom: 2rem;">
                    ${movie.poster}
                </div>
                <div style="text-align: center;">
                    <h4 style="margin-bottom: 1rem;">Ticket Price</h4>
                    <div style="font-size: 2rem; font-weight: 700; color: #ffd700; margin-bottom: 1rem;">${movie.price}</div>
                    <button class="cta-btn" style="width: 100%; font-size: 1.1rem;" onclick="openBookingModal(${movie.id})">
                        Proceed to Book
                    </button>
                </div>
            </div>
        </div>
    `;
    movieModal.style.display = 'block';
}

function selectShowtime(time) {
    alert(`Selected showtime: ${time} ✅\nProceeding to seat selection...`);
}

function openBookingModal(movieId) {
    const movie = movies.find(m => m.id === movieId);
    document.getElementById('bookingContent').innerHTML = `
        <h2 style="margin-bottom: 1rem;">🎉 Booking Summary</h2>
        <div style="background: rgba(255,255,255,0.05); padding: 2rem; border-radius: 20px; margin-bottom: 2rem;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 1rem;">
                <span>${movie.title}</span>
                <span>${movie.price}</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 1rem; color: #ffd700;">
                <span><strong>Total (1 ticket)</strong></span>
                <span><strong>${movie.price}</strong></span>
            </div>
        </div>
        <div style="text-align: center; margin-bottom: 2rem;">
            <h3>✅ Demo Booking Complete!</h3>
            <p style="color: #90EE90; font-size: 1.1rem;">Your tickets have been successfully booked for this demo.</p>
            <p style="color: rgba(255,255,255,0.7);">In a real application, you would now:</p>
            <ul style="text-align: left; color: rgba(255,255,255,0.8); max-width: 400px; margin: 1rem auto;">
                <li>• Select seats from interactive seat map</li>
                <li>• Add food & beverages</li>
                <li>• Complete payment</li>
                <li>• Receive e-ticket via email/SMS</li>
            </ul>
        </div>
        <div style="display: flex; gap: 1rem;">
            <button class="cta-btn" style="flex: 1;" onclick="printTicket()">📄 Download Ticket</button>
            <button class="cta-btn" style="flex: 1; background: #1e3c72;" onclick="closeAllModals()">Book Another Movie</button>
        </div>
    `;
    movieModal.style.display = 'none';
    bookingModal.style.display = 'block';
}

function printTicket() {
    alert('🎫 Ticket downloaded successfully!\n\nThank you for using Friday Films Demo.\n\nThis is a fully functional demo showcasing:\n✅ Real-time search\n✅ Working filters\n✅ Interactive slider\n✅ Modal booking flow\n✅ Responsive design\n✅ Blue BookMyShow theme');
    closeAllModals();
}

function closeAllModals() {
    movieModal.style.display = 'none';
    bookingModal.style.display = 'none';
}

// Close modals on outside click
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
}

// Close modals with ESC key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeAllModals();
    }
});
