import styles from "./account.module.css";
import { useEffect } from "react";
import { useTitle } from "@/hooks/useTitle";
import TopSearch from "@/components/TopSearch";
import { useAccountStore } from "@/store/useAccountStore";

export default function Account() {
  useTitle("个人中心");
  const { account, getAccount } = useAccountStore();

  useEffect(() => {
    getAccount();
  }, []);

  return (
    <div className={styles.container}>
      {/* 顶部导航栏 */}
      <header className={styles.header}>
        <TopSearch />
      </header>

      {/* 内容区 */}
      <div className={styles.content}>
        {/* 用户信息区域 */}
        <div className={styles.userInfo}>
          <div className={styles.avatarContainer}>
            <img
              src={account.avatar}
              alt="用户头像"
              className={styles.avatar}
            />
          </div>
          <div className={styles.userDetail}>
            <h2 className={styles.username}>{account.username}</h2>
            <p className={styles.userDesc}>
              {account.gender === 0 ? "男" : "女"} · {account.joinTime}加入 ·
              职业：{account.occupation}
            </p>
            <p> 家乡：{account.homeAddress}</p>
            <p className={styles.userIp}>IP属地：{account.ip}</p>
            <p className={styles.userSignature}>{account.signature}</p>
          </div>
          <button className={styles.editBtn}>
            {/* <Upload size={20} /> */}
          </button>
        </div>

        {/* 统计数据 */}
        <div className={styles.statsContainer}>
          <div className={styles.statItem}>
            <p className={styles.statNumber}>{account.followCount}</p>
            <p className={styles.statLabel}>关注</p>
          </div>
          <div className={styles.statItem}>
            <p className={styles.statNumber}>{account.fansCount}</p>
            <p className={styles.statLabel}>粉丝</p>
          </div>
        </div>

        {/* 会员区域 */}
        <div className={styles.memberContainer}>
          <button className={styles.memberBtn}>开通下厨房会员</button>
          <span className={styles.memberPrice}>最低0.3元/天</span>
        </div>

        {/* 月份统计 */}
        <div className={styles.calendarContainer}>
          <div className={styles.calendarTabs}>
            <span className={styles.calendarTab}>3月</span>
            <span className={styles.calendarTab}>4月</span>
            <span className={styles.calendarTab + " " + styles.active}>
              5月
            </span>
            <span className={styles.calendarTab}>6月</span>
            <span className={styles.calendarTab}>7月</span>
            <span className={styles.calendarTab}>8月</span>
          </div>
          <div className={styles.calendarGrid}>
            {/* 生成30天的日历格子 */}
            {Array(30)
              .fill(null)
              .map((_, i) => (
                <div key={i} className={styles.calendarDay}></div>
              ))}
          </div>
        </div>

        {/* 作品和菜谱统计 */}
        <div className={styles.contentStats}>
          <div className={styles.contentTab + " " + styles.active}>菜谱</div>
          <div className={styles.contentTab}>作品</div>
          <div className={styles.contentCount}>0</div>
          <div className={styles.contentCount}>0</div>
        </div>

        {/* 空状态提示 */}
        <div className={styles.emptyState}>
          <p>创建菜谱的人是厨房里的天使</p>
        </div>
      </div>
    </div>
  );
}
