const avatarPrompt = `
  请生成一个卡通风格的用户头像。
  返回JSON数据：
  {
    "avatar_url": "生成的头像图片URL"
  }
`;

export const generateAvatar = async () => {
  const endpoint = "https://api.moonshot.cn/v1/chat/completions";
  const headers = {
    Authorization: `Bearer ${import.meta.env.VITE_KIMI_API_KEY}`,
    "Content-Type": "application/json",
  };

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        model: "moonshot-v1-8k-vision-preview", 
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: avatarPrompt,
              },
            ],
          },
        ],
        // 可选：增加 temperature=0 让输出更确定
        temperature: 0,
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`API request failed with status ${res.status}: ${errorText}`);
    }

    const data = await res.json();

    // 提取模型返回的文本内容
    const content = data.choices[0]?.message?.content;
    if (!content) {
      throw new Error("No content returned from API");
    }

    // 解析 content 中的 JSON 字符串
    let parsedContent;
    try {
      parsedContent = JSON.parse(content);
    } catch (parseError) {
      console.error("Failed to parse JSON from model output:", content);
      throw new Error("Model returned invalid JSON");
    }

    // 返回标准化的 { avatar_url: "..." }
    return {
      avatar_url: parsedContent.avatar_url,
    };

  } catch (error) {
    console.error("Error generating avatar:", error);
    throw error;
  }
};