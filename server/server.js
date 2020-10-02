const express = require('express')
const Mock = require('mockjs')
const app=express()
const Random=Mock.Random
app.all('*',(req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Header','Content-Type')
    res.header('Access-Control-Allow-Method','*')
    res.header('Content-Type','application/json;charset=utf-8')
    next()
})
//获取文章列表
app.get('/posts',(req,res)=>{
    let posts=[]
    let number=100
    for(let i=0;i<number;i++){
        posts.push(Mock.mock({
            id:i,
            title:Random.cparagraph(1),
            content:Random.cparagraph(2,5),
            time:Random.datetime('yyyy-MM-dd hh:mm:ss'),
            author:Random.cname(),
            'like|1-1000':1
        }))
    }
    let currentPage=req.query.currentPage?Number(req.query.currentPage): 1
    let perPageNumber=req.query.perPageNumber?Number(req.query.perPageNumber):10
    // console.log(perPageNumber)
    let totalPage=Math.ceil(posts.length/perPageNumber)
    //模拟limit 截取文章列表
    let start=(currentPage-1)*perPageNumber
    let end=currentPage*perPageNumber<=posts.length?currentPage*perPageNumber:posts.length
    posts=posts.slice(start,end)
    res.json({content:posts,currentPage,totalPage})
})
app.listen(3001,()=>{
    console.log('Server port:3001')
})