# 每周一个 npm 轮子学习之 qs

> 计划每周学习一个开源 npm 包，本篇是 [qs](https://www.npmjs.com/package/qs)

本文所有内容都开源在 https://github.com/ahwgs/weekly-npm/tree/master/qs

## 开篇

qs 是一个高达 6.6k star 的字符串解析格式化库。

在一些常见的字符串解析功能上，我们可以使用该库来解决我们的问题

qs 目前在 npm 官方镜像上周下载量达到**54,126,612**。目前已经迭代至 `v6.10.1`

## 安装和使用

### 安装

我们可以直接通过 npm 来安装

```bash
npm install qs --save
```

### 使用

qs 主要具有两大功能，分别是`qs.parse` `qs.stringify`

#### stringify

序列化字符串。先看函数签名

```typescript
interface IStringifyOptions {
  delimiter?: string | undefined;
  strictNullHandling?: boolean | undefined;
  skipNulls?: boolean | undefined;
  encode?: boolean | undefined;
  encoder?:
    | ((
        str: any,
        defaultEncoder: defaultEncoder,
        charset: string,
        type: "key" | "value"
      ) => string)
    | undefined;
  filter?:
    | Array<string | number>
    | ((prefix: string, value: any) => any)
    | undefined;
  arrayFormat?: "indices" | "brackets" | "repeat" | "comma" | undefined;
  indices?: boolean | undefined;
  sort?: ((a: any, b: any) => number) | undefined;
  serializeDate?: ((d: Date) => string) | undefined;
  format?: "RFC1738" | "RFC3986" | undefined;
  encodeValuesOnly?: boolean | undefined;
  addQueryPrefix?: boolean | undefined;
  allowDots?: boolean | undefined;
  charset?: "utf-8" | "iso-8859-1" | undefined;
  charsetSentinel?: boolean | undefined;
}

function stringify(obj: any, options?: IStringifyOptions): string;
```

- format 参数

其中对于`format`字段，我们需要先知道 **RFC 3986 and RFC 1738 space encoding**

1. [HTTP URL 字符转义 字符编码 、 RFC 3986 编码规范](https://www.cnblogs.com/panchanggui/p/9436348.html)](https://www.cnblogs.com/panchanggui/p/9436348.html)

2. [统一资源定位符 (URL)](https://datatracker.ietf.org/doc/html/rfc1738)

有兴趣的可以认真看一看。这里我们只需要知道，这两种标准大概是对`url`中不安全的字符的一种编码规范

对于**RFC 3986**标准

我们会把比如 `b c` 给转换成 `b%20c`

对于**RFC 1738**

我们会把比如 `b c` 给转换成 `b+c`

默认使用 `RFC 3986` 规范

```javascript
// 按照指定编码格式化

const qs = require("qs");

// default
console.log("result:", qs.stringify({ a: "a b c" })); //a=a%20b%20c

// RFC3986
console.log("result:", qs.stringify({ a: "a b c" }, { format: "RFC3986" })); //a=a%20b%20c

// RFC1738
console.log("result:", qs.stringify({ a: "a b c" }, { format: "RFC1738" })); //a=a+b+c
```

- arrayFormat 参数

对于我们需要序列化数组的场景，支持 `'indices' | 'brackets' | 'repeat' | 'comma'` 几种方式

```javascript
// arrayFormat 对于数组的格式化

console.log(
  "result:",
  qs.stringify({ a: ["b", "c"] }, { arrayFormat: "indices" })
); // 'a%5B0%5D=b&a%5B1%5D=c'

console.log(
  "result:",
  qs.stringify({ a: ["b", "c"] }, { arrayFormat: "brackets" })
); // 'a%5B%5D=b&a%5B%5D=c'

console.log(
  "result:",
  qs.stringify({ a: ["b", "c"] }, { arrayFormat: "repeat" })
); // 'a=b&a=c'

console.log(
  "result:",
  qs.stringify({ a: ["b", "c"] }, { arrayFormat: "comma" })
); // 'a=b%2Cc'
```

- 其他参数

  对于其他参数的使用方式，我们可以直接看官方文档即可

  [https://github.com/ljharb/qs/blob/master/README.md#stringifying](https://github.com/ljharb/qs/blob/master/README.md#stringifying)

#### parse

格式化字符串，函数签名如下

```typescript
interface IParseOptions {
  comma?: boolean | undefined;
  delimiter?: string | RegExp | undefined;
  depth?: number | false | undefined;
  decoder?:
    | ((
        str: string,
        defaultDecoder: defaultDecoder,
        charset: string,
        type: "key" | "value"
      ) => any)
    | undefined;
  arrayLimit?: number | undefined;
  parseArrays?: boolean | undefined;
  allowDots?: boolean | undefined;
  plainObjects?: boolean | undefined;
  allowPrototypes?: boolean | undefined;
  parameterLimit?: number | undefined;
  strictNullHandling?: boolean | undefined;
  ignoreQueryPrefix?: boolean | undefined;
  charset?: "utf-8" | "iso-8859-1" | undefined;
  charsetSentinel?: boolean | undefined;
  interpretNumericEntities?: boolean | undefined;
}

function parse(
  str: string,
  options?: IParseOptions & { decoder?: never | undefined }
): ParsedQs;
function parse(
  str: string | Record<string, string>,
  options?: IParseOptions
): { [key: string]: unknown };
```

第一个参数是我们要格式化的字符串，第二个参数为我们自定义格式化的配置
