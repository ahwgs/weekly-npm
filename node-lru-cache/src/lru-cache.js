class LRUCache {
  constructor(capacity) {
    this.cache = new Map();
    this.capacity = capacity;
  }
  get(key) {
    if (this.cache.has(key)) {
      // 存在即更新
      let temp = this.cache.get(key);
      this.cache.delete(key);
      this.cache.set(key, temp);
      return temp;
    }
    return -1;
  }
  set(key, value) {
    if (this.cache.has(key)) {
      // 存在即更新（删除后加入）
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      // 不存在即加入
      // 缓存超过最大值，则移除最近没有使用的
      this.cache.delete(this.cache.keys().next().value);
    }
    this.cache.set(key, value);
  }
}

const cache = new LRUCache(4);

cache.set("a", "123");

console.log(cache.get("a"));
