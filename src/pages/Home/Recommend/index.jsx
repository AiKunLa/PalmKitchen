import { useHomeStore } from "@/store/useHomeStore";
import styles from "./recommend.module.css";
import RecipeCard from "@/components/RecipeCard";
import { useNavigate } from "react-router-dom";
import LoadingMore from "@/components/LoadingMore";

/**
 * Home 页面中的推荐组件
 * @returns
 */
export default function Recommend() {
  const { recipes, loading, fetchMoreRecipes } = useHomeStore();
  const navigate = useNavigate();
  const handleRecipeClick = (e) => {
    const recipeId = e.target.dataset.recipeid;
    navigate(`/recipe/detail/${recipeId}`);
  };
  return (
    <>
      <div onClick={handleRecipeClick} className={styles.recipeGrid}>
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
      <LoadingMore loadMore={fetchMoreRecipes} loading={loading} />
    </>
  );
}
export { Recommend };
