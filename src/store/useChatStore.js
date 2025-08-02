import { create } from "zustand";
import { kimiChat } from "@/llm/chat";

export const useChatStore = create((set, get) => ({
  messages: [
    {
      id: 1,
      content: "有什么可以帮助您的吗？",
      isAI: true,
      time: new Date().toLocaleTimeString(),
    },
  ],
  loading: false,

  sendMessage: async (msg) => {
    if (!msg.trim()) return;
    if (get().loading) return;

    // user 的消息
    const newMessage = {
      id: get().messages.length + 1,
      content: msg,
      isAI: false,
      time: new Date().toLocaleTimeString(),
    };

    const aiMessage = {
      id: get().messages.length + 2,
      content: "",
      isAI: true,
      time: new Date().toLocaleTimeString(),
    };

    set((state) => ({
      messages: [...state.messages, newMessage, aiMessage],
      loading: true,
    }));

    // 发送请求
    try {
      const res = await kimiChat([{ role: "user", content: msg }]);
      // 处理返回的消息
      aiMessage.content = res.content;
    } catch (error) {
      aiMessage.content = "请求失败，请稍后重试";
    } finally {
      set((state) => ({
        messages: [...state.messages.slice(0, -1), aiMessage],
        loading: false,
      }));
    }
  },
}));
