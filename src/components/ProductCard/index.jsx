import styles from "./productCard.module.css";
import useLazyLoadImg from "@/hooks/useLazyLoadImg";


export default function ProductCard({ product }) {
  const { targetRef, imageLoaded } = useLazyLoadImg();

  return (
    <div className={styles.productCard}>
      <div className={styles.productImage}>
        <img
          ref={targetRef}
          data-src={product.image}
          src="/loading.gif"
          alt={product.name}
          className={imageLoaded ? styles.coverImgLoaded : styles.coverImgLoading}
        />
      </div>
      <div className={styles.productInfo}>
        <div className={styles.productName}>{product.name}</div>

        {/* 销售情况 */}
        <div className={styles.productSales}>
          <span className={styles.productPrice}>¥{product.price}</span>
          {product.originalPrice && (
            <span className={styles.productOriginalPrice}>
              ¥{product.originalPrice}
            </span>
          )}
          {/* 商品标签 */}
          {product.tag && (
            <div className={styles.productTag}>{product.tag}</div>
          )}
          {/* 销售数量 */}
          {product.salesCount && (
            <div className={styles.productSalesCount}>
              已售{product.salesCount}件
            </div>
          )}
        </div>
        {product.status && (
          <div className={styles.productStatus}>{product.status}</div>
        )}
      </div>
    </div>
  );
}
