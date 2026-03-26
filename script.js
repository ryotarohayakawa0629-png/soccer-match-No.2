document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for fade-in elements
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing after it becomes visible once
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));

    // Initialize Poll
    initPoll();
});

// Win Prediction Logic
let votes = {
    mst: 68,
    isc: 42
};

function initPoll() {
    const userVoted = localStorage.getItem('matchPollVoted');
    if (userVoted) {
        showPollResults();
    }
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
    if (savedVotes) {
        votes = JSON.parse(savedVotes);
    }
    
    const total = votes.mst + votes.isc;
    const mstPercent = Math.round((votes.mst / total) * 100);
    const iscPercent = 100 - mstPercent;
    
    document.getElementById('poll-buttons').style.display = 'none';
    const resultsDiv = document.getElementById('poll-results');
    resultsDiv.style.display = 'block';
    
    // Animate bars slightly after display changes
    setTimeout(() => {
        document.getElementById('mst-percent').innerText = mstPercent + '%';
        document.getElementById('mst-bar').style.width = mstPercent + '%';
        
        document.getElementById('isc-percent').innerText = iscPercent + '%';
        document.getElementById('isc-bar').style.width = iscPercent + '%';
        
        document.getElementById('total-votes-text').innerText = 'Total votes: ' + total;
    }, 50);
}
