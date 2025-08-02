import styles from "./camera.module.css";
import useTitle from "@/hooks/useTitle";
import TopSearch from "@/components/TopSearch";
import { useState, useRef, useEffect } from "react";
import { Input, Button, Image, Loading } from "react-vant";
import { ArrowUp, Upgrade } from "@react-vant/icons";
import { useChatStore } from "@/store/useChatStore";
import ReactMarkdown from "react-markdown";

export default function Camera() {
  useTitle("智能识别");
  const { messages, sendMessage, loading } = useChatStore();

  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);
  const messagesRef = useRef(null);

  //  发送消息后自动滚动到距离底部
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToTop = () => {
    messagesRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 发送消息
  const handleKeyPress = async () => {
    sendMessage(inputValue);
    setInputValue("");
  };

  return (
    <div className={styles.container}>
      {/* 顶部导航栏 */}
      <header className={styles.header}>
        <TopSearch />
      </header>

      {/* 内容区 */}
      <div className={styles.content}>
        {/* 对话消息区域 */}
        <div className={styles.messagesContainer} ref={messagesRef}>
          {messages.map((message) => (
            <div
              key={message.id}
              className={`${styles.messageWrapper} ${
                message.isAI ? styles.aiMessage : styles.userMessage
              }`}
            >
              <Image
                round
                className={message.isAI ? styles.aiAvatar : styles.userAvatar}
                src={"/AI.png"}
              />
              <div className={styles.messageContent}>
                <div className={styles.messageText}>
                  {message.isAI && message.content === "" ? (
                    <Loading size="24px">加载中...</Loading>
                  ) : (
                    <ReactMarkdown>{message.content}</ReactMarkdown>
                  )}
                </div>
                {/* <div className={styles.messageTime}>{message.time}</div> */}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* 回到顶部按钮 */}
        <button className={styles.scrollTopButton} onClick={scrollToTop}>
          <ArrowUp size={18} />
        </button>

        {/* 输入区域 */}
        <div className={styles.inputContainer}>
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e)}
            placeholder="请输入消息..."
            className={styles.input}
          />
          <Button
            onClick={handleKeyPress}
            className={styles.sendButton}
            disabled={loading}
          >
            <Upgrade />
          </Button>
        </div>
      </div>
    </div>
  );
}
