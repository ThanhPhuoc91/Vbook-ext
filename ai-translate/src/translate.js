load("language_list.js");

function execute(text) {
    return translateContent(text, 0);
}

function translateContent(text, retryCount) {
    if (retryCount > 2) return null;

    const apiUrl = 'https://text.pollinations.ai/';

    const headers = {
        'Content-Type': 'application/json'
    };

    const requestBody = JSON.stringify({
        messages: [
            {
                role: "user",
                content: `Dịch đoạn văn bản sau sang tiếng Việt: "${text}"` // Prompt dịch thuật
            }
        ],
        model: 'openai'
    });

    let response = fetch(apiUrl, {
        method: 'POST',
        headers: headers,
        body: requestBody
    });

    if (response.ok) {
        let result = response.json();
        let translatedText = result.response.trim();
        return Response.success(translatedText);
    } else {
        return translateContent(text, retryCount + 1);
    }
}
