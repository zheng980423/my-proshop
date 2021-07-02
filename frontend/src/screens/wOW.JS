// Step 1
console.log(1);

// Step 2
setTimeout(() => {
  console.log(2);
  Promise.resolve().then(() => {
    console.log(3);
  });
}, 0);

// Step 3
new Promise((resolve, reject) => {
  console.log(4);
  resolve();
}).then(() => {
  console.log(5);
});

// Step 4
setTimeout(() => {
  console.log(6);
}, 0);

// Step 5
console.log(7);

// Step N
// ...

// Result
/*
  1
  4
  7
  5
  2
  3
  6
*/
