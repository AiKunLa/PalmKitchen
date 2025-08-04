import styles from "./shop.module.css";
import { TopSearch } from "@/components/TopSearch";
import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { useShopStore } from "@/store/useShopStore";
import LoadingMore from "@/components/LoadingMore";
import GlobalLoading from "@/components/GlobalLoading";

export default function Shop() {
  const [activeTab, setActiveTab] = useState(3); // 初始选中"商店"标签
  const [activeRankTab, setActiveRankTab] = useState(0); // 初始选中"全部"标签
  const tabs = ["关注", "推荐", "减脂", "商店", "分类"];
  const rankTabs = ["全部", "时令果蔬", "地方特色", "早餐", "方便速食"];

  const {
    newProducts,
    rankProducts,
    fetchNewProducts,
    fetchMoreRanKProducts,
    newProductsLoading,
    rankProductsLoading,
  } = useShopStore();

  useEffect(() => {
    fetchNewProducts();
  }, []);

  if(newProductsLoading) return <GlobalLoading />

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <TopSearch type={3} />
      </header>
      <div className={styles.content}>
        {/* 分类标签 */}
        {/* <div className={styles.tabs}>
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`${styles.tab} ${activeTab === index ? styles.active : ''}`}
              onClick={() => setActiveTab(index)}
            >
              {tab}
            </button>
          ))}
        </div> */}

        {/* 每日上新区域 */}
        <div className={styles.newProducts}>
          <div className={styles.sectionTitle}>
            <span>每日上新</span>
            <span onClick={() => fetchNewProducts()} className={styles.more}>想要的商品</span>
          </div>
          <div className={styles.productGrid}>
            {newProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* 7天销量榜区域 */}
        <div className={styles.salesRank}>
          <div className={styles.sectionTitle}>
            <span>7天销量榜</span>
          </div>
          <div className={styles.rankTabs}>
            {rankTabs.map((tab, index) => (
              <button
                key={index}
                className={`${styles.rankTab} ${
                  activeRankTab === index ? styles.active : ""
                }`}
                onClick={() => setActiveRankTab(index)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className={styles.rankGrid}>
            {rankProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <LoadingMore loadMore={fetchMoreRanKProducts} loading={rankProductsLoading} />
        </div>
      </div>
    </div>
  );
}
