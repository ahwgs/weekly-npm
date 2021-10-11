// formats 按照指定编码格式化
const qs = require("qs");
// default
console.log("result:", qs.stringify({ a: "a b c" })); //a=a%20b%20c

// RFC3986
console.log("result:", qs.stringify({ a: "a b c" }, { format: "RFC3986" })); //a=a%20b%20c

// RFC1738
console.log("result:", qs.stringify({ a: "a b c" }, { format: "RFC1738" })); //a=a+b+c

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
