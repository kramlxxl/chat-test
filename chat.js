// API klíč OpenAI - dbej na bezpečnost a v produkci ho nedávej přímo do klientského kódu
const apiKey = 'TVŮJ_OPENAI_API_KLÍČ'; // Nahraď svým API klíčem

// Odeslání zprávy uživatele
async function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    
    if (!userInput.trim()) return; // Pokud uživatel nic nenapsal, neodesílej

    // Zobrazení zprávy uživatele v chatovacím okně
    addMessage(userInput, 'user-message');
    document.getElementById('user-input').value = ''; // Vymaže textové pole

    // Odeslání dotazu na OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo', // Používáme GPT-3.5-turbo model
            messages: [{ role: 'user', content: userInput }],
            max_tokens: 150 // Limit odpovědi
        })
    });

    const data = await response.json();
    const botMessage = data.choices[0].message.content;

    // Zobrazení odpovědi od ChatGPT v chatovacím okně
    addMessage(botMessage, 'bot-message');
}

// Přidání zprávy do chatovacího okna
function addMessage(message, className) {
    const messageContainer = document.createElement('div');
    messageContainer.classList.add('message', className);
    messageContainer.textContent = message;

    const chatMessages = document.getElementById('chat-messages');
    chatMessages.appendChild(messageContainer);
    chatMessages.scrollTop = chatMessages.scrollHeight; // Automaticky posouvá chat dolů
}
