//Core Module (file system)
//질문 답
// readlin systme
// const readline = require('readline-sync');
// const name = readline.question('What is your name?');
// console.log(name);

// json
// javascript Object Notation
// file system (fs)
// const fs = require('fs');
// const data = fs.readFileSync("./vocab.json",{ encoding: "utf-8" });
// console.log(typeof JSON.parse(data));
// console.log(JSON.parse(data));
// console.log(typeof data);
// console.log(data);
// let arr = JSON.parse(data);
// console.log( arr[1] );

//const fs = require('fs');
//const data = fs.readFileSync("./vocab.json",{ encoding: "utf-8" });
//let arr = JSON.parse(data);
//console.log( arr[1] );

// let ob = {
//     name:"xellos",
//     age: 20,
//     description:"I go to school."
// };

//fs.writeFileSync("./test.json", JSON.stringify(ob) );
// JSON 형식으로 저장 옵션에서  ,null, 2 설정 
//fs.writeFileSync("./test.json", JSON.stringify(ob, null, 2));

// HTTP 서버 만들기
// const http = require("http");

// const server = http.createServer( (req,res) => {
//     if(req.url === "/"){
//         res.write("<h1>Hello from nodejs</h1>");    
//     }else{
//         res.write(`<h1>You have entered : ${req.url} </h1>`);
//     }
//     res.end();
// });

// server.listen(3000, ()=>{
//     console.log(" The server is listening on port 3000");
// });

// // EXPRESS 이용하여 HTTP 서버 만들기
//  const express = require('express');
//  const server = express();

// // //GET       www.facebook.com/
// // //PORT      ID:abc Pass:1234
// // //DELETE    
// // //PUT       

//  server.get("/",(req,res) => {
//      //res.send("<h1>Hello from nodejs</h1>");
//      //__dirname : 현재 폴더
//      //__filename : 실행 파일 명
//      res.sendFile(__dirname + "/index.html");
//  });

//  server.get("/about",(req,res) => {
//     res.sendFile(__dirname + "/about.html");
// });

// server.listen(3000,(err) => {
//     if(err) return console.log("err log :" + err);
//     console.log("The server if listening on port 3000");
// });

// // EXPRESS 이용하여 HTTP 서버, Middleware 만들기 
// const express = require('express');
// const server = express();

// // Middleware 부분
// // next 처리 끝나고 다음 단계로 이동 
// //  server.use((req, res, next) => {
// //   console.log("Hi from client");
// //   req.user = {
// //     id: "1234",
// //   };
// //   next();
// //  });

// server.use(express.static(__dirname + "/public"))

// server.get("/",(req,res) => {
//     // console.log(req.user);
//     res.sendFile(__dirname + "/index.html");
// });

// server.get("/about",(req,res) => {
//     res.sendFile(__dirname + "/about.html");
// });

// // 해당 페이지가 없는경우에는 404 발생하는 html 
// server.use((req, res) => {
//   res.sendFile(__dirname + "/404.html");
//  });

// server.listen(3000,(err) => {
//     if(err) return console.log("err log :" + err);
//     console.log("The server if listening on port 3000");
// });

// // express-handlebars 이용하여
const express = require('express');
const hds = require("express-handlebars");
const server = express();

server.use(express.static(__dirname + "/public"))

server.get("/",(req,res) => {
    // console.log(req.user);
    res.sendFile(__dirname + "/index.html");
});

server.get("/about",(req,res) => {
    res.sendFile(__dirname + "/about.html");
});

// 해당 페이지가 없는경우에는 404 발생하는 html 
server.use((req, res) => {
  res.sendFile(__dirname + "/404.html");
 });

server.listen(3000,(err) => {
    if(err) return console.log("err log :" + err);
    console.log("The server if listening on port 3000");
});