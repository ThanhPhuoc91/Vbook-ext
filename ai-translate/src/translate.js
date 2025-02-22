load("language_list.js"); // Có thể không cần thiết

function execute(text) {
    return translateContent(text, 0);
}

function translateContent(text, retryCount) {
    if (retryCount > 2) return null;

    const apiUrl = 'https://text.pollinations.ai/'; // Endpoint API của Pollinations.AI Text Generation (POST)

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
        model: 'openai' // Hoặc 'mistral' - chọn model theo ý bạn
    });

    let response = fetch(apiUrl, {
        method: 'POST',
        headers: headers,
        body: requestBody
    });

    if (response.ok) {
        let result = response.json();
        // **Pollinations.AI trả về văn bản dịch trực tiếp trong response, không có cấu trúc lồng nhau như OpenAI**
        let translatedText = result.response.trim(); // Lấy văn bản dịch từ response.response
        return Response.success(translatedText);
    } else {
        // Xử lý lỗi tương tự
        console.error("Lỗi dịch thuật từ Pollinations.AI API:", response.status, response.statusText);
        return translateContent(text, retryCount + 1); // Thử lại
    }
}