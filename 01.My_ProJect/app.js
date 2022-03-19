// module( library, dependency, package )

// Core Module (file system)
// 질문 답
// const readline = require('readline');
// const { stdin: input, stdout: output } = require('process');

// const rl = readline.createInterface({ input, output });

// rl.question('What is your name? ', (answer) => {
//     console.log(`Hello ${answer}`);
//     rl.close();
// });

// file system
const fs = require("fs");

// current file
// const list = fs.readdirSync(".");
// console.log(list);

// write
// fs.writeFileSync("./hello.txt", "Hello Youtubers");

// read
//const data = fs.readFileSync("./hello.txt",{encoding: "utf-8"});
//console.log(data);

// append
//fs.appendFileSync("./hello.txt", "\nWelcom!");


// Synchronous vs Asynchronous
// Block.......vs Non-Block

let text = "default";
//const data = fs.readFileSync("./hello.txt",{encoding: "utf-8"});
// Async (비동기 방식)
// const data = fs.readFile("./hello.txt",{encoding: "utf-8"}, (err, data) => {
//     console.log(data);
//     text = data;
// });
// console.log(text);
let startTime = Date.now();

setTimeout(()=>{
    console.log("Print after 5 seconds");
    console.log(Date.now() - startTime, "First");
}, 5000);
console.log(Date.now() - startTime, "Second");

