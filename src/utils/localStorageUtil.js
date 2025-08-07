/**
 * localStorage 工具类
 * 提供对 localStorage 的便捷操作，包括类型支持、过期时间等功能
 */
export const LocalStorageUtil = {

  /**
   * 设置存储项
   * @param {string} key 键名
   * @param {*} value 值（可以是对象，会自动序列化）
   * @param {number} [expires] 过期时间（毫秒），可选
   */
  set(key, value, expires) {
    if (!window.localStorage) {
      console.warn("浏览器不支持localStorage");
      return;
    }

    const item = {
      data: value,
      timestamp: Date.now(),
      expires: expires ? Date.now() + expires : null,
    };

    try {
      localStorage.setItem(key, JSON.stringify(item));
    } catch (e) {
      console.error("localStorage 存储失败:", e);
      // 存储空间已满时，尝试清理过期项目后重试
      this._clearExpiredItems();
      try {
        localStorage.setItem(key, JSON.stringify(item));
      } catch (e) {
        console.error("重试存储仍然失败:", e);
      }
    }
  },

  /**
   * 获取存储项
   * @param {string} key 键名
   * @param {*} [defaultValue] 默认值（可选）
   * @return {*} 存储的值或默认值
   */
  get(key, defaultValue = null) {
    if (!window.localStorage) {
      console.warn("浏览器不支持localStorage");
      return defaultValue;
    }

    const itemStr = localStorage.getItem(key);
    if (!itemStr) return defaultValue;

    try {
      const item = JSON.parse(itemStr);
      // 检查是否过期
      if (item.expires && Date.now() > item.expires) {
        this.remove(key);
        return defaultValue;
      }
      return item.data;
    } catch (e) {
      console.error("解析 localStorage 数据失败:", e);
      return defaultValue;
    }
  },

  /**
   * 移除存储项
   * @param {string} key 键名
   */
  remove(key) {
    if (!window.localStorage) {
      console.warn("浏览器不支持localStorage");
      return;
    }
    localStorage.removeItem(key);
  },

  /**
   * 清空所有存储项
   */
  clear() {
    if (!window.localStorage) {
      console.warn("浏览器不支持localStorage");
      return;
    }
    localStorage.clear();
  },

  /**
   * 检查是否存在某个键
   * @param {string} key 键名
   * @return {boolean} 是否存在
   */
  has(key) {
    if (!window.localStorage) {
      console.warn("浏览器不支持localStorage");
      return false;
    }
    return localStorage.getItem(key) !== null;
  },

  /**
   * 获取所有键名
   * @return {string[]} 键名数组
   */
  keys() {
    if (!window.localStorage) {
      console.warn("浏览器不支持localStorage");
      return [];
    }
    return Object.keys(localStorage);
  },

  /**
   * 获取剩余过期时间（毫秒）
   * @param {string} key 键名
   * @return {number|null} 剩余时间（毫秒），null表示永不过期或不存在
   */
  getExpires(key) {
    if (!window.localStorage) {
      console.warn("浏览器不支持localStorage");
      return null;
    }

    const itemStr = localStorage.getItem(key);
    if (!itemStr) return null;

    try {
      const item = JSON.parse(itemStr);
      if (!item.expires) return null;
      return Math.max(0, item.expires - Date.now());
    } catch (e) {
      console.error("解析 localStorage 数据失败:", e);
      return null;
    }
  },

  /**
   * 内部方法：清理过期项目
   */
  _clearExpiredItems() {
    const keys = this.keys();
    keys.forEach((key) => {
      // 调用get方法会自动清理过期项目
      this.get(key);
    });
  },
};

export default LocalStorageUtil;
