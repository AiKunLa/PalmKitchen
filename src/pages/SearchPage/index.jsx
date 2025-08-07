import styles from "./searchPage.module.css";
import { ArrowLeft } from "@react-vant/icons";
import { Search } from "react-vant";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSearchStore } from "@/store/useSearchStore";
import RecipeList from "@/components/RepiceList";

export default function SearchPage() {
  const [display, setDisplay] = useState(false);
  const navigate = useNavigate();

  const {
    recentSearches,
    suggestedSearches,
    searchResults,

    fetchRecentSearches,
    fetchSuggestedSearches,
    fetchSearchResults,

    clearRecentSearches,
    searchLoading,
    updateRecentSearches,

    searchQuery,
    setSearchQuery,
    resetSearch,
  } = useSearchStore();

  // 点击搜索按钮
  const handleSearchClick = () => {
    if (searchQuery.trim()) {
      resetSearch();
      fetchSearchResults();
      updateRecentSearches(searchQuery);

    } else {
      console.log("请输入搜索内容");
    }
    setDisplay(true);
  };

  // 点击返回按钮
  const handleBackClick = (e) => {
    if (searchQuery) {
      resetSearch();
    }
    if (display) {
      setDisplay(false);
    } else {
      navigate(-1);
    }
  };

  // 点击keyword区域
  const handleSearchAreasClick = (e) => {
    const keyword = e.target.innerText;
    if (keyword.trim()) {
      setSearchQuery(keyword);
      handleSearchClick();
    }
  };

  useEffect(() => {
    fetchRecentSearches();
    fetchSuggestedSearches();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.topNav}>
        <ArrowLeft className={styles.menuIcon} onClick={handleBackClick} />
        <div className={styles.searchContainer}>
          <Search
            value={searchQuery}
            onChange={(e) => setSearchQuery(e)}
            className={styles.searchBar}
            placeholder="搜索菜谱"
            shape="round"
            focus={true}
          />
        </div>
        <div className={styles.searchBtn} onClick={handleSearchClick}>
          搜索
        </div>
      </div>
      <div className={styles.content}>
        {display ? (
          <RecipeList
            recipes={searchResults}
            loading={searchLoading}
            fetchMore={fetchSearchResults}
          />
        ) : (
          <div className={styles.searchAreas} onClick={handleSearchAreasClick}>
            {/* 最近搜索区域 */}
            <div className={styles.recentSearches}>
              <div className={styles.sectionTitle}>
                <span>最近搜索</span>
                <span className={styles.clearBtn} onClick={clearRecentSearches}>
                  清空
                </span>
              </div>
              <div className={styles.keywordsContainer}>
                {recentSearches.length > 0 &&
                  recentSearches.map((keyword, index) => (
                    <div
                      key={index}
                      className={`${styles.keyword} ${
                        index === 0 ? styles.activeKeyword : ""
                      }`}
                    >
                      {index === 0 && (
                        <span className={styles.activityTag}>活动</span>
                      )}
                      {keyword}
                    </div>
                  ))}
              </div>
            </div>

            {/* 搜索发现区域 */}
            <div className={styles.searchDiscoveries}>
              <div className={styles.sectionTitle}>
                <span>搜索发现</span>
              </div>
              <div className={styles.keywordsContainer}>
                {suggestedSearches.length > 0 &&
                  suggestedSearches.map((keyword, index) => (
                    <div key={index} className={styles.keyword}>
                      {keyword}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
