//const http=require('http');
/*const express=require('express');
const bodyParser=require('body-parser')

const app=express();
app.use(bodyParser.urlencoded({extended: false}));
app.get('/users',(req,res)=>{
    res.send(`<h1>suor</h1>`)
})
app.get('/users/add',(req,res)=>{
    res.send(`<form method="POST">
    <input name='un'>
    <button>user</button></form>`
)
}
)
app.post('/users/add',(req,res)=>{
    console.log(req.body);
})

const server=http.createServer((req,res)=>{
    if(req.url==='/')
    {
         return sety(req,res);
    }
    
    if(req.url==='/vuda')
    {
         return submitx(req,res);
    }
})
function submitx(req,res)
{
    res.setHeader('Content-Type','text/html');
    return res.end(`
    <h1>bessa</h1>
    `)
}
function sety(req,res)
{
res.setHeader('Content-Type','text/html');

return res.end
    (`
    <!doctype html>
    <html>
    <head>
    <title>xxxx</title>
    </head>
    <body>
    <form action="vuda" method="post">
    <input type="text" name="kutta">
    <input type="submit" value="send">
    </form>
    </body>
    </html>
    `)
}*/
//app.listen(3000);