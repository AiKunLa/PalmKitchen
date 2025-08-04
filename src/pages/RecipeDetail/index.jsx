import { useParams } from "react-router-dom";
import { useEffect } from "react";
import styles from "./recipeDetail.module.css";
import { ActionBar, Progress } from "react-vant";
import { ChatO, Star, AddO } from "@react-vant/icons";
import TopDetail from "@/components/TopDetail";
import { useRecipeDetailStore } from "@/store/useRecipeDetailStore";
import GlobalLoading from "@/components/GlobalLoading";
import LoadingMore from "@/components/LoadingMore";

// 评论项组件
const CommentItem = ({ comment }) => {
  return (
    <div className={styles.commentItem}>
      <div className={styles.commentHeader}>
        <img
          src={comment.user.avatar}
          alt={comment.user.name}
          className={styles.commentAvatar}
        />
        <div className={styles.commentInfo}>
          <div className={styles.commentUsername}>
            {comment.user.name}
            {comment.isAuthor && (
              <span style={{ color: "#ff6b00", marginLeft: 8 }}>作者</span>
            )}
          </div>
          <div className={styles.commentDate}>{comment.date}</div>
        </div>
      </div>
      <div className={styles.commentContent}>{comment.content}</div>
      <div className={styles.commentFooter}>
        <button className={styles.likeButton}>👍 {comment.likes}</button>
        {comment.isLikedByAuthor && (
          <span style={{ marginLeft: 8, color: "#ff6b00" }}>作者赞过</span>
        )}
      </div>
    </div>
  );
};

export default function RecipeDetail() {
  const params = useParams();
  const {
    recipeDetail,
    fetchRecipeDetail,
    loading,
    commentLoading,
    comments,
    fetchMoreComments,
    clearComments,
  } = useRecipeDetailStore();

  useEffect(() => {
    fetchRecipeDetail(params.id);
    return () => {
      clearComments();
    }
  }, []);


  if (loading) return <GlobalLoading />;
  // 获取菜谱数据（实际项目中可能从API获取）
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <TopDetail />
      </header>

      {/* 菜谱图片 */}
      <div className={styles.imageContainer}>
        <img
          src={recipeDetail.image}
          alt={recipeDetail.title}
          className={styles.recipeImage}
        />
      </div>

      <div className={styles.content}>
        {/* 标题和评分 */}
        <div className={styles.titleSection}>
          <h1 className={styles.title}>{recipeDetail.title}</h1>

          <div className={styles.ratingSection}>
            <div className={styles.ratingleft}>
              <span className={styles.ratingValue}>{recipeDetail.rating}</span>
              <span className={styles.reviewCount}>
                {recipeDetail.reviewCount}人做过
              </span>
            </div>
            <div className={styles.ratingright}>
              <div className={styles.ratingProgress}>
                <Progress inactive percentage={recipeDetail.rates[0]} />
              </div>
              <div className={styles.ratingProgress}>
                <Progress inactive percentage={recipeDetail.rates[1]} />
              </div>
              <div className={styles.ratingProgress}>
                <Progress inactive percentage={recipeDetail.rates[2]} />
              </div>
            </div>
          </div>
        </div>

        {/* 作者信息 */}
        <div className={styles.authorSection}>
          <img
            src={recipeDetail.authoravatar || "/avatar.png"}
            alt={recipeDetail.authorname}
            className={styles.authorAvatar}
          />
          <div className={styles.authorInfo}>
            <div className={styles.authorName}>{recipeDetail.author.name}</div>
          </div>
          <button className={styles.followButton}>关注</button>
        </div>

        {/* 描述 */}
        <div className={styles.description}>{recipeDetail.description}</div>

        {/* 选项卡 */}
        {/* <div className={styles.tabs}>
          <div
            className={`${styles.tab} ${
              activeTab === "ingredients" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("ingredients")}
          >
            用料
          </div>
          <div
            className={`${styles.tab} ${
              activeTab === "comments" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("comments")}
          >
            评论 ({recipe.comments.length})
          </div>
        </div> */}

        <div>
          <h2 className={styles.ingredientsTitle}>用料</h2>
          <div className={styles.ingredientsList}>
            {recipeDetail.ingredients.map((ingredient, index) => (
              <div key={index} className={styles.ingredientItem}>
                <span className={styles.ingredientName}>{ingredient.name}</span>
                <span className={styles.ingredientAmount}>
                  {ingredient.amount}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.commentsSection}>
          <h2 className={styles.commentsTitle}>
            这道菜的评论 {comments.length}
          </h2>
          {comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </div>
          
        <LoadingMore loadMore={fetchMoreComments} loading={commentLoading} />
         
      </div>

      {/* 底部工具栏 */}
      <div className={styles.footer}>
        <ActionBar>
          <ActionBar.Icon
            icon={<Star color="rgb(248, 102, 79)" />}
            text="1.2万"
            onClick={() => console.log("chat click")}
          />
          <ActionBar.Icon
            icon={<ChatO />}
            text="评论"
            onClick={() => console.log("cart click")}
          />
          <ActionBar.Icon
            icon={<AddO />}
            text="交作业"
            onClick={() => console.log("shop click")}
          />

          <ActionBar.Button
            type="danger"
            text="立即购买"
            onClick={() => console.log("button click")}
          />
        </ActionBar>
      </div>
    </div>
  );
}
