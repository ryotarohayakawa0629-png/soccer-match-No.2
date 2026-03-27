document.addEventListener('DOMContentLoaded', () => {
    // Sticky Nav Logic
    const stickyNav = document.getElementById('sticky-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            stickyNav.classList.add('visible');
        } else {
            stickyNav.classList.remove('visible');
        }
    });

    // Initializations
    initPoll();
    initCountdown();
});

// Countdown Timer Logic
function initCountdown() {
    const targetDate = new Date('April 8, 2026 13:20:00').getTime();

    const updateTimer = () => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            document.getElementById('countdown').innerHTML = "<p style='font-size: 2rem; color: var(--primary)'>MATCH STARTED</p>";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').innerText = String(days).padStart(2, '0');
        document.getElementById('hours').innerText = String(hours).padStart(2, '0');
        document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
        document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');
    };

    updateTimer();
    setInterval(updateTimer, 1000);
}



// Win Prediction Logic
let votes = { mst: 68, isc: 42 };

function initPoll() {
    const userVoted = localStorage.getItem('matchPollVoted');
    if (userVoted) showPollResults();
}

function castVote(team) {
    if (localStorage.getItem('matchPollVoted')) return;
    votes[team]++;
    localStorage.setItem('matchPollVoted', 'true');
    localStorage.setItem('matchPollVotes', JSON.stringify(votes));
    showPollResults();
}

function showPollResults() {
    const savedVotes = localStorage.getItem('matchPollVotes');
    if (savedVotes) votes = JSON.parse(savedVotes);
    
    const total = votes.mst + votes.isc;
    const mstPercent = Math.round((votes.mst / total) * 100);
    const iscPercent = 100 - mstPercent;
    
    document.getElementById('poll-buttons').style.display = 'none';
    const resultsDiv = document.getElementById('poll-results');
    resultsDiv.style.display = 'block';
    
    setTimeout(() => {
        document.getElementById('mst-percent').innerText = mstPercent + '%';
        document.getElementById('mst-bar').style.width = mstPercent + '%';
        document.getElementById('isc-percent').innerText = iscPercent + '%';
        document.getElementById('isc-bar').style.width = iscPercent + '%';
        document.getElementById('total-votes-text').innerText = 'Total votes: ' + total;
    }, 50);
}
