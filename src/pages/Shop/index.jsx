import styles from "./shop.module.css";
import { TopSearch } from "@/components/TopSearch";
import { useEffect, useState } from "react";
import useIntersectObs from "@/hooks/useIntersectObs";
import ProductCard from "@/components/ProductCard";
import { useShopStore } from "@/store/useShopStore";
import { Loading } from "react-vant";
// 模拟商品数据
const newProducts = [
  {
    id: 1,
    name: "有机本草银耳",
    image: "https://picsum.photos/300/400?random=1",
    price: 29.9,
    originalPrice: 39.9,
    status: "4天后下架",
    tag: "新品",
  },
  {
    id: 2,
    name: "五常有机黑土大米",
    image: "https://picsum.photos/300/400?random=2",
    price: 39.9,
    originalPrice: 49.9,
    status: "4天后下架",
    tag: "热销",
  },
  {
    id: 3,
    name: "江西广昌干莲子",
    image: "https://picsum.photos/300/400?random=3",
    price: 34.9,
    originalPrice: 44.9,
    status: "4天后下架",
    tag: "推荐",
  },
  {
    id: 4,
    name: "宁夏中宁枸杞",
    image: "https://picsum.photos/300/400?random=4",
    price: 25.9,
    originalPrice: 35.9,
    status: "4天后下架",
    tag: "特价",
  },
  {
    id: 5,
    name: "新鲜水蜜桃",
    image: "https://picsum.photos/300/400?random=5",
    price: 39.9,
    originalPrice: 59.9,
    status: "10天后下架",
    tag: "补贴价",
  },
  {
    id: 6,
    name: "新鲜脆甜青苹果",
    image: "https://picsum.photos/300/400?random=6",
    price: 34.9,
    originalPrice: 49.9,
    status: "10天后下架",
    tag: "补贴价",
  },
];

// 模拟销量榜数据
const salesRankProducts = [
  {
    id: 1,
    name: "澳洲和牛雪花牛排",
    image: "https://picsum.photos/300/400?random=7",
    price: 129.0,
    salesCount: 1000,
  },
  {
    id: 2,
    name: "新西兰羊排",
    image: "https://picsum.photos/300/400?random=8",
    price: 89.0,
    salesCount: 1000,
  },
];

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

  const targetRef = useIntersectObs(fetchMoreRanKProducts);

  useEffect(() => {
    fetchNewProducts();
  }, []);

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
            <span className={styles.more}>想要的商品</span>
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
          <div ref={targetRef}>
            {rankProductsLoading && (
              <Loading type="spinner" style={{ textAlign: "center" }} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
