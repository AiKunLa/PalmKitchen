import { Card, Image } from "react-vant";
import { Arrow } from "@react-vant/icons";
import useIntersectObs from "@/hooks/useIntersectObs";
import { memo, useCallback, useState } from "react";
import styles from "./collectionRecipeCard.module.css";

// 内部 RecipeCard 组件，按照图片布局定制

const CollectionRecipeCard = memo(({ recipe }) => {
   const [imageLoaded, setImageLoaded] = useState(false);

  const lazyLoadImg = useCallback(() => {
    if (!imageLoaded && targetRef.current) {
      targetRef.current.src = targetRef.current.dataset.src;
      setImageLoaded(true);
    }
  }, [imageLoaded]);

  const targetRef = useIntersectObs(lazyLoadImg);

  return (
    <Card className={styles.recipeCard}>
      <Card.Cover className={styles.cover}>
        <img ref={targetRef} data-src={recipe.image} src="/loading.gif" alt={recipe.title} />
      </Card.Cover>

      <div className={styles.cardInfo}>
        <Card.Header className={styles.cardHeader}>{recipe.title}</Card.Header>
        <Card.Body className={styles.cardBody}>
          <div className={styles.ratingInfo}>
            <span className={styles.rating}>{recipe.rating}</span>
            {/* <span className={styles.star}>★</span> */}
          </div>
          <span className={styles.cookedCount}>{recipe.cookedCount}人做过</span>
        </Card.Body>
        <Card.Footer className={styles.cardFooter}>
          <div className={styles.authorInfo}>
            <img
              className={styles.avatar}
              src={`https://picsum.photos/40/40?random=${recipe.id}`}
              alt={recipe.author}
            />
            <span className={styles.author}>{recipe.author}</span>
          </div>
        </Card.Footer>
      </div>
    </Card>
  );
});

export default CollectionRecipeCard;
