import styles from "./collection.module.css";
import { TopSearch } from "@/components/TopSearch";
import { useState } from "react";
import CollectionRecipeCard from "@/components/CollectionRecipeCard";
import { useIntersectObs } from "@/hooks/useIntersectObs";
import { Loading } from "react-vant";
import { useCollectionStore } from "@/store/useCollectionStore";



export default function Collection() {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ["所有菜谱", "菜单", "课程", "浏览历史"];

  const { collection, loading, fetchMoreCollection } = useCollectionStore();

  const targetRef = useIntersectObs(fetchMoreCollection);

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
        <div className={styles.recipeGrid}>
          {collection.map((recipe) => (
            <CollectionRecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>

        <div ref={targetRef}>
          {loading && (
            <Loading type="spinner" style={{ textAlign: "center" }} />
          )}
        </div>
      </div>
    </div>
  );
}
