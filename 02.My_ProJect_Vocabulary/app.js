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
const http = require("http");

const server = http.createServer( (req,res) => {
    if(req.url === "/"){
        res.write("<h1>Hello from nodejs</h1>");    
    }else{
        res.write(`<h1>You have entered : ${req.url} </h1>`);
    }
    res.end();
});

server.listen(3000, ()=>{
    console.log(" The server is listening on port 3000");
});

