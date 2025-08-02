import { useHomeStore } from "@/store/useHomeStore";
import { useIntersectObs } from "@/hooks/useIntersectObs";
import { Loading } from "react-vant";
import styles from "./recommend.module.css";
import RecipeCard from "@/components/RecipeCard";

/**
 * Home 页面中的推荐组件
 * @returns 
 */
export default function Recommend() {
  const { recipes, loading, fetchMoreRecipes } = useHomeStore();
  const targetRef = useIntersectObs(fetchMoreRecipes);
  return (
    <>
      <div className={styles.recipeGrid}>
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
      <div ref={targetRef}>
        {loading && <Loading type="spinner"  style={{ textAlign: "center" }} />}
      </div>
    </>
  );
}
export { Recommend };
