const flashcardData = [
    {
        term: "EVM 📟",
        definition: "Electronic Voting Machine. A simple device used to record votes electronically instead of paper ballots!"
    },
    {
        term: "VVPAT 📜",
        definition: "Voter Verifiable Paper Audit Trail. It shows you a tiny slip to confirm your vote went to the right candidate!"
    },
    {
        term: "MCC ⚖️",
        definition: "Model Code of Conduct. Rules that parties and candidates must follow to keep elections fair and clean."
    },
    {
        term: "ECI 🏛️",
        definition: "Election Commission of India. The super-cool body that manages all the elections in our country!"
    },
    {
        term: "NOTA ⚪",
        definition: "None of the Above. If you don't like any candidate, you can pick this option to show your choice!"
    },
    {
        term: "EPIC 🆔",
        definition: "Electors Photo Identity Card. Your official 'Voter ID' card that makes you a superhero of democracy!"
    }
];

const flashcardsGrid = document.getElementById('flashcards-grid');

function createFlashcard(data) {
    const card = document.createElement('div');
    card.className = 'flashcard';
    
    card.innerHTML = `
        <div class="flashcard-inner">
            <div class="flashcard-front">
                <h3>${data.term}</h3>
                <p style="font-size: 0.9rem; color: var(--text-muted);">Click to reveal</p>
            </div>
            <div class="flashcard-back">
                <p>${data.definition}</p>
            </div>
        </div>
    `;
    
    card.addEventListener('click', () => {
        card.classList.toggle('flipped');
    });
    
    return card;
}

// Initialize Flashcards
flashcardData.forEach(item => {
    flashcardsGrid.appendChild(createFlashcard(item));
});

// Smooth Scroll for navigation (if needed)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add some scroll entrance animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.timeline-item, .step-card, .flashcard').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// AI Chat Logic
const chatToggle = document.getElementById('chat-toggle');
const chatWindow = document.getElementById('chat-window');
const chatBody = document.getElementById('chat-body');
const chatInput = document.getElementById('chat-input');
const chatSend = document.getElementById('chat-send');

chatToggle.addEventListener('click', () => {
    chatWindow.classList.toggle('active');
});

const responses = {
    "hello": "Hello! What can I help you with today? 🏛️",
    "how to vote": "To vote: 1. Go to your assigned polling booth. 2. Show your ID (EPIC card). 3. Get your finger inked. 4. Press the button next to your candidate on the EVM!",
    "where": "You can find your polling booth location by checking your name in the Voter List on the ECI website or by calling 1950. 📍",
    "nota": "NOTA stands for 'None of the Above'. It is the last button on every EVM. Pressing it means you do not wish to vote for any of the candidates listed. ⚪",
    "help": "Tip: Always carry your Voter ID (EPIC) or another valid photo ID like Aadhaar to the booth! 💡",
    "register": "Registration is done via the Voter Service Portal (voters.eci.gov.in). Use Form 6 for new applications!",
    "age": "The voting age in India is 18 years. 🎂",
    "evm": "Electronic Voting Machines (EVMs) are used to record your vote electronically. 📟",
    "vvpat": "VVPAT shows you a paper slip for 7 seconds to confirm your vote. 📜",
    "document": "You need an ID like Aadhaar, Passport, or Voter ID to vote. 🌸",
    "lok sabha": "Lok Sabha is the lower house. Members are directly elected for 5 years.",
    "rajya sabha": "Rajya Sabha is the upper house. Members are elected by state legislatures.",
    "bye": "Goodbye! Don't forget to cast your vote. 🇮🇳",
    "default": "I can help with: how to vote, where to vote, NOTA, or registration. What can I help you? 🏛️"
};

function addMessage(text, sender) {
    const msg = document.createElement('div');
    msg.className = `message ${sender}`;
    msg.innerText = text;
    chatBody.appendChild(msg);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function handleChat() {
    const query = chatInput.value.toLowerCase().trim();
    if (!query) return;

    addMessage(chatInput.value, 'user');
    chatInput.value = '';

    // Simple AI simulation
    setTimeout(() => {
        let response = responses.default;
        for (let key in responses) {
            if (query.includes(key)) {
                response = responses[key];
                break;
            }
        }
        addMessage(response, 'ai');
    }, 600);
}

chatSend.addEventListener('click', handleChat);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleChat();
});
