const router = require('express').Router();
const Blog = require('../models/Blog')
var bodyParser = require('body-parser')

router.use(bodyParser.urlencoded({ extended: false }))


// Your routing code goes here
router.get('/',async (req,res)=>{
    // res.json({ok:'blog'})
    try{
        return res.status(200).send("<h1>Assignment 6</h1>")

    }catch(e){
        return res.status(400).json({
            status: "Failed",
            message:e.message
        })
    }
})


router.get('/blog',async (req,res)=>{
    // res.json({ok:'blog'})
    try{
        let page= parseInt(req.query.page);
        let search= req.query.search;
        // console.log(page, search)
        if(search){
            let posts= await Blog.find({topic:search})
            return res.status(200).json({
                status: "Success",
                result:posts
            })
        }else if(page){

        let skip= (page-1)*5;
        let limit=page*5;

        const posts= await Blog.find().limit(limit).skip(skip)
        return res.status(200).json({
            status: "Success",
            result:posts
        })
        
    }else{
        const posts= await Blog.find()
        return res.status(200).json({
            status: "Success",
            result:posts
        })
    }

    }catch(e){
        return res.status(400).json({
            status: "Failed",
            message:e.message
        })
    }
})

router.post('/blog',async (req, res)=>{
    // console.log(req.body)
    try{
        let blog= await Blog.create({
            topic:req.body.topic,
            description:req.body.description,
            posted_at: req.body.posted_at,
            posted_by: req.body.posted_by
        })

        return res.status(200).json({
            status: "Success",
            result: blog
        })
    }catch(e){
        return res.status(400).json({
            status:"Failed",
            message: e.message
        })
    }


})

router.put('/blog/:id',async (req, res)=>{
    // console.log(req.body)
    try{
        let blog= await Blog.findOneAndUpdate({_id:req.params.id}, req.body)

        return res.status(200).json({
            status: "Success",
            result: blog
        })
    }catch(e){
        return res.status(400).json({
            status:"Failed",
            message: e.message
        })
    }


})

router.delete('/blog/:id',async (req, res)=>{
    // console.log(req.body)
    try{
        let blog= await Blog.findOneAndDelete({_id:req.params.id})

        return res.status(200).json({
            status: "Success",
            result: blog
        })
    }catch(e){
        return res.status(400).json({
            status:"Failed",
            message: e.message
        })
    }


})



module.exports = router;