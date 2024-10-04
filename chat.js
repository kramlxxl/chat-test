const apiKey = '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'; // Nahraď správným API klíčem

// Odeslání zprávy uživatele
async function sendMessage() {
    const userInput = document.getElementById('user-input').value;

    if (!userInput.trim()) return; // Pokud uživatel nic nenapsal, neodesílej

    // Zobrazení zprávy uživatele v chatovacím okně
    addMessage(userInput, 'user-message');
    document.getElementById('user-input').value = ''; // Vymaže textové pole

    // Odeslání dotazu na OpenAI API
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}` // Dbej na správný formát
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo', // Používáme GPT-3.5-turbo model
                messages: [{ role: 'user', content: userInput }],
                max_tokens: 150 // Limit odpovědi
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const botMessage = data.choices[0].message.content;

        // Zobrazení odpovědi od ChatGPT v chatovacím okně
        addMessage(botMessage, 'bot-message');
    } catch (error) {
        console.error('Error:', error);
        addMessage("Error: Unable to reach ChatGPT API.", 'bot-message');
    }
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

