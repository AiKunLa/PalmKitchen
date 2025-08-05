import styles from "./repicelist.module.css";
import CollectionRecipeCard from "@/components/CollectionRecipeCard";
import LoadingMore from "@/components/LoadingMore";
import { useNavigate } from "react-router-dom";

export default function RecipeList({ recipes, loading, fetchMore }) {
  const navigate = useNavigate();
  const handleRecipeClick = (e) => {
    const recipeCard = e.target.closest("[data-recipe-id]");
    console.log(recipeCard);
    const recipeId = recipeCard.dataset.recipeId;
    if (recipeId) {
      navigate(`/recipe/detail/${recipeId}`);
    }
  };
  return (
    <div className={styles.recipeGrid} onClick={handleRecipeClick}>
      {recipes.length > 0 &&
        recipes.map((recipe) => (
          <CollectionRecipeCard key={recipe.id} recipe={recipe}/>
        ))}
      <LoadingMore loadMore={fetchMore} loading={loading} />
    </div>
  );
}
