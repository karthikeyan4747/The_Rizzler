require('dotenv').config()
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID)

const Groq = require('groq-sdk');
const groq = new Groq({apiKey:process.env.GROQ_API})

const DB_HOST=process.env.DB_HOST
const DB_USER=process.env.DB_USER
const DB_PASSWORD=process.env.DB_PASSWORD
const DB_NAME=process.env.DB_NAME

const app = express();

app.use(express.json());
app.use(cors({origin:"https://the-rizzler-one.vercel.app/"}));

const db = mysql.createConnection({
    database:DB_NAME,
    host:DB_HOST,
    user:DB_USER,
    password:DB_PASSWORD
})


db.connect((err)=>{
    if(err){
        console.log("Error cannot connect to db");
        return;
    }
    console.log("DB Connected")
})

app.get('/',(req,res)=>{
    res.json({Message:"BAckend working"})
})

app.post('/auth/login', async (req,res)=>{
    try{
    const token = req.body.token;

    const response = await client.verifyIdToken({
        idToken:token,
        audience:process.env.client_id
    })

    const {name,email} = response.getPayload();

    db.query('select * from users where email=?',[email],(err,result)=>{
        if (err) throw err;
        if(result.length === 0){
            db.query('insert into users(name,email) values(?,?)',[name,email])
        }
        res.json({name,email})
    })
    } catch (err) {
        return res.status(401).json({Message:'errer'})
    }
})

const PORT = process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`);
})