const express = require("express");
const cors = require("cors");
const { mongoose } = require("mongoose");
const User = require("./Models/User");
const Post = require("./Models/Posts");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const CookieParser = require('cookie-parser');
const multer = require('multer');


const app = express();

const salt = bcrypt.genSaltSync(10);
const secret = 'abcdefghijklmnopqrstuvwxyz1234567890';


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploades')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+'-' +file.originalname)
    }
  })
const upload = multer({storage:storage})

app.use(cors({credentials:true, origin:'http://localhost:3000'}));
app.use(express.json());
app.use(CookieParser());
app.use('/uploades', express.static(__dirname +'/uploades'))

mongoose.connect("mongodb+srv://Santosh:santosh@cluster0.a0zwk.mongodb.net/?retryWrites=true&w=majority")

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const userData = await User.create(
            {
                username,
                password: bcrypt.hashSync(password, salt)
            }
        );
        res.json(userData);
    } catch (e) {
        res.status(400).json(e);
    }

})
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const userData = await User.findOne({ username });
    const passOk = bcrypt.compareSync(password, userData.password);
    if (passOk) {
        // login
        jwt.sign({username,id:userData._id}, secret, {}, (err, token)=>{
            if(err){throw err}
            res.cookie('token', token).json(
                {
                    id:userData._id,
                    username
                })
        });
    } else {
        res.status(400).json("Wrong Credentials !")
        
    }
})
app.get('/profile', (req, res)=>{
    const {token} = req.cookies
    jwt.verify(token, secret, {}, (err, info)=>{
        if(err)throw err;
        res.json(info);
    })
})
app.post('/logout', (req, res)=>{
    res.cookie('token', "").json('ok');
})

app.post('/post', upload.single('file'), async(req, res)=>{
    
    const {token} = req.cookies
    jwt.verify(token, secret, {}, async(err, info)=>{
        if(err)throw err;
        const postData=await Post.create({
            title:req.body.title,
            summary:req.body.summary,
            content:req.body.content,
            cover:req.file.filename,
            author:info.id
        })
        res.json(postData);
    })
})
app.put('/post', async(req, res)=>{
    const {token} = req.cookies
    jwt.verify(token, secret, {}, async(err, info)=>{
        if(err)throw err;
        const {id, title, summary, content} = req.body;
        const postDoc = await Post.findById(id)
        const isAuthor=express.json.stringify(postDoc.author)===express.json.stringify(info.id)
        if(!isAuthor){
            res.status(400).json("you are not author")
        }
        const newfile=false;
        if(req.file.filename==postDoc.cover){
            newfile=true;
        }
        await postDoc.update({
            title,
            summary,
            content,
            cover: newfile?req.file.filename:postDoc.cover
         })
       
        res.json(postData);
    })
})
app.get("/post",upload.single('file'), async(req, res)=>{
    const posts = await Post.find().populate('author', ['username'])
    res.json(posts)
})

app.get("/post/:id", async(req, res)=>{
    const {id} = req.params;
    const postdata =await Post.findById(id).populate('author', ['username'])
    console.log(postdata)
    res.json(postdata);
})

app.listen(4000);
