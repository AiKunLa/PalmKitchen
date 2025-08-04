import styles from "./collection.module.css";
import { TopSearch } from "@/components/TopSearch";
import { useState } from "react";
import CollectionRecipeCard from "@/components/CollectionRecipeCard";

import { useCollectionStore } from "@/store/useCollectionStore";
import { useNavigate } from "react-router-dom";
import LoadingMore from "@/components/LoadingMore";
import GlobalLoading from "@/components/GlobalLoading";

export default function Collection() {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ["所有菜谱", "菜单", "课程", "浏览历史"];
  const { collection, loading, fetchMoreCollection } = useCollectionStore();

  const navigate = useNavigate();

  const handleRecipeClick = (e) => {
    console.log(e.target);
    const recipeId = e.target.dataset.recipeid;
    navigate(`/recipe/detail/${recipeId}`);
  };

  if(loading) return <GlobalLoading />

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <TopSearch type={3} />
      </header>
      <div className={styles.content}>
        {/* 选项卡 */}
        <div className={styles.tabs}>
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`${styles.tab} ${
                activeTab === index ? styles.active : ""
              }`}
              onClick={() => setActiveTab(index)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* 菜谱列表 */}
        <div className={styles.recipeGrid} onClick={handleRecipeClick}>
          {collection.map((recipe) => (
            <CollectionRecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>

        <LoadingMore loadMore={fetchMoreCollection} loading={loading} />
      </div>
    </div>
  );
}
