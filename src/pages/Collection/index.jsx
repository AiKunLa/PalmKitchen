import styles from "./collection.module.css";
import { TopSearch } from "@/components/TopSearch";
import { useState } from "react";
import RecipeList from "@/components/RepiceList";
import { useCollectionStore } from "@/store/useCollectionStore";
import useTitle from "@/hooks/useTitle";
export default function Collection() {
  useTitle('收藏')
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ["所有菜谱", "菜单", "课程", "浏览历史"];
  const { collection, loading, fetchMoreCollection } = useCollectionStore();
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

        <RecipeList recipes={collection} loading={loading} fetchMore={fetchMoreCollection} />
      </div>
    </div>
  );
}
