import useIntersectObs from "@/hooks/useIntersectObs";
import { useCallback, useState } from "react";

export default function useLazyLoadImg() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const lazyLoadImg = useCallback(() => {
    // 提前加载图片
    const img = new Image();
    img.src = targetRef.current.dataset.src;
    // 图片加载完成后，再显示图片
    img.onload = () => {
      setImageLoaded(true);
      targetRef.current.src = targetRef.current.dataset.src;
    };
    
  });
  const targetRef = useIntersectObs(lazyLoadImg);
  return {
    targetRef,
    imageLoaded,
  };
}
