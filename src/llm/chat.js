/**
 * chat 聊天
 *
 */
const DEEPSEEK_CHAT_API_URL = "https://api.deepseek.com/chat/completions";
const KEM_CHAT_API_URL = "https://api.moonshot.cn/v1/chat/completions";

/**
 *
 * @param {string} messages
 * @param {string} api_url
 * @param {string} api_key
 * @param {string} model
 * @returns
 */
export const chat = async (
  messages,
  api_url = DEEPSEEK_CHAT_API_URL,
  api_key = import.meta.env.VITE_DEEPSEEK_API_KEY,
  model = "deepseek-chat"
) => {
  try {
    const response = await fetch(api_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${api_key}`,
      },
      body: JSON.stringify({
        model,
        messages,
        stream: false,
      }),
    });
    const data = await response.json();
    return {
      role: "assistant",
      content: data.choices[0].message.content,
    };
  } catch (err) {
    return {
      code: 0,
      msg: "出错了...",
    };
  }
};

/**
 * deepSeek Chat
 * @param {Array} messages
 * @returns
 */
export const deepseekChat = async (messages) => {
  const res = await chat(
    messages,
    DEEPSEEK_CHAT_API_URL,
    import.meta.env.VITE_DEEPSEEK_API_KEY,
    "deepseek-chat"
  );
  return res;
};

/**
 * kimi Chat
 * @param {Array} messages
 * @returns
 */
export const kimiChat = async (messages) => {
  const res = await chat(
    messages,
    KEM_CHAT_API_URL,
    import.meta.env.VITE_KIMI_API_KEY,
    "kimi-k2-0711-preview"
  );
  return res;
};

export const generateAvatar = async (text) => {
  const prompt = `
    你是一位漫画设计师，需要为用户设计头像，主打奶龙风格。
    用户的信息是${text}
  `
};
