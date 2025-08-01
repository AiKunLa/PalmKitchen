import { useParams } from "react-router-dom";
import './recipeDetail.module.css'

export default function RecipeDetail() {
  const params = useParams();
  return (
    <div>
      <h1>菜谱详情页</h1>
      <p>菜谱ID: {params.id}</p>
    </div>
  );
}
