import express from "express";
import bcrypt from "bcrypt-nodejs";
import cors from "cors";
import knex from "knex";
import { text } from "stream/consumers";
import register from "./controllers/register.js";
import signin from "./controllers/signin.js";
import profile from "./controllers/profile.js";
import image from "./controllers/image.js";


const db = knex ({
    client: 'pg',
    connection: {
      connectionString : process.env.DATABASE_URL,
      ssl: {rejectUnauthorized: false},
      host : process.env.DATABASE_HOST,
      port : 5432,
      user : process.env.DATABASE_USER,
      password: process.env.DATABASE_PW,
      database : process.env.DATABASE_DB
    }
  });

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {res.send(database.users);})
app.post('https://smartbrainapp-8q6s.onrender.com/signin',(req, res) => {signin.handleSignIn(req, res, bcrypt, db)}) 
app.post('https://smartbrainapp-8q6s.onrender.com/register',(req,res) => {register.handleRegister(req, res, bcrypt, db)})
app.get('https://smartbrainapp-8q6s.onrender.com/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)})
app.put('https://smartbrainapp-8q6s.onrender.com/image', (req, res) => {image.handleImage(req, res, db)})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

