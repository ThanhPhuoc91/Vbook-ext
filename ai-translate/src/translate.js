function execute(text, apiKey) {
    return translateContent(text, apiKey);
}

async function translateContent(text, apiKey) {
    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo", // Hoặc model khác bạn muốn dùng
                messages: [
                    {
                        role: "system",
                        content: "Bạn là một công cụ dịch thuật chuyên nghiệp từ tiếng Trung sang tiếng Việt. Hãy dịch văn bản người dùng cung cấp một cách chính xác."
                    },
                    {
                        role: "user",
                        content: `Dịch văn bản sau sang tiếng Việt: ${text}`
                    }
                ]
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Lỗi từ OpenAI API:", errorData);
            return `Lỗi dịch thuật: ${errorData.error?.message || response.statusText}`;
        }

        const data = await response.json();
        const translatedText = data.choices[0].message.content.trim();
        return translatedText;

    } catch (error) {
        console.error("Lỗi trong quá trình dịch:", error);
        return `Lỗi dịch thuật: ${error.message}`;
    }
}

