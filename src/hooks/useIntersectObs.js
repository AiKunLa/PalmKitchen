import { useEffect, useRef } from "react";

export default function useIntersectObs(callback) {
  const targetRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        callback();
      }
    });
    // 开始观察目标元素
    if (targetRef.current) {
      observer.observe(targetRef.current);
    }
    // 清理函数
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [callback]);
  return targetRef;
}

export { useIntersectObs };
