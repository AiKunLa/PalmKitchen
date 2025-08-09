import { Arrow } from "@react-vant/icons";
import { Card } from "react-vant";
import styles from "./recipeCard.module.css";
import useLazyLoadImg from "@/hooks/useLazyLoadImg";

export default function RecipeCard({ recipe }) {
  const { targetRef, imageLoaded } = useLazyLoadImg();
  return (
    <>
      <Card className={styles.recipeCard}>
        <Card.Cover className={styles.cover}>
          <img
            ref={targetRef}
            data-src={recipe.image}
            src={"/loading.gif"}
            data-recipeid={recipe.id}
            className={
              imageLoaded ? styles.coverImgLoaded : styles.coverImgLoading
            }
          />
        </Card.Cover>
        <Card.Header extra={<Arrow />}>{recipe.title}</Card.Header>
        <Card.Body className={styles.body}>{recipe.author}</Card.Body>
      </Card>
    </>
  );
}
