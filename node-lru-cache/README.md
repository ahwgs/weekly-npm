# 每周一个 npm 轮子学习之 lru-cache

> 计划每周学习一个开源 npm 包，本篇是 [lru-cache](https://www.npmjs.com/package/lru-cache)

本文所有内容都开源在 https://github.com/ahwgs/weekly-npm/tree/master/node-lru-cache

## 开篇

在一般业务场景中，可能需要做一些缓存以提高系统性能，但是又不需要使用`Redis`等缓存服务时，这时我们可以使用

`lru-cache` 来解决我们的问题

今天主要看一下什么是`lru`和`lru-cache`如何使用

## 什么是 LRU

LRU（Least recently used，最近最少使用）算法根据数据的历史访问记录来进行淘汰数据，其核心思想是“如果数据最近被访问过，那么将来被访问的几率也更高”。

![img](https://static.ahwgs.cn/blog-img20211011165237.jpg)

1.新数据插入到链表头部

2.每当缓存命中（即缓存数据被访问），则将数据移到链表头部；

3.当链表满的时候，将链表尾部的数据丢弃。

![img](https://static.ahwgs.cn/blog-img20211011170134.jpg)

1.最开始时，内存空间是空的，因此依次进入 A、B、C 是没有问题的

2.当加入 D 时，就出现了问题，内存空间不够了，因此根据 LRU 算法，内存空间中 A 待的时间最为久远，选择 A,将其淘汰

3.当再次引用 B 时，内存空间中的 B 又处于活跃状态，而 C 则变成了内存空间中，近段时间最久未使用的

4.当再次向内存空间加入 E 时，这时内存空间又不足了，选择在内存空间中待的最久的 C 将其淘汰出内存，这时的内存空间存放的对象就是 E->B->D

## 如何使用

### 安装

```bash
 npm install lru-cache --save
```

### 使用

使用方式参考官方文档即可

```javascript
const LRU = require("lru-cache");

const cache = new LRU({
  max: 4,
  maxAge: 20000,
});

cache.set("key1", "ahwgs");
cache.set("key2", 123123);
cache.set("key3", { name: "ahwgs" });
cache.set("key4", true);
cache.set("key5", true);

console.log("result", cache.get("key1")); // 'ahwgs'
console.log("result", cache.get("key2")); // 123123
console.log("result", cache.get("key3")); // {name:'ahwgs'}
console.log("result", cache.get("key4")); // true
console.log("result", cache.get("key5")); // undefined 因为max4
```

Lru-cache 为我们提供了丰富的配置和 api，可以直接参考官方文档

## 源码

具体查看 https://github.com/isaacs/node-lru-cache/blob/master/index.js

手写简单 LRU-CACHE 算法

```javascript
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
```

## 应用场景

1.多账号登录：某些业务场景下需要限制多台设备登录账号数量。再不使用`redis`的情况下可以使用

2.[LruCache 在美团 DSP 系统中的应用演进](https://zhuanlan.zhihu.com/p/53118773)

## 缺点

因为 lru 是基于内存的缓存方案，所以在分布式项目中没法搞，无法做不同机器下的同步

## 引用

1.[缓存淘汰算法--LRU 算法](https://zhuanlan.zhihu.com/p/34989978)

2.[LruCache 在美团 DSP 系统中的应用演进](https://zhuanlan.zhihu.com/p/53118773)
