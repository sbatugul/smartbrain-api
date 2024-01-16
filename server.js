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
      host : '127.0.0.1',
      port : 5432,
      user : 'postgres',
      password: 'batu',
      database : 'smart_brain'
    }
  });

const app = express();

app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {res.send(database.users);})
app.post('/signin',(req, res) => {signin.handleSignIn(req, res, bcrypt, db)}) 
app.post('/register',(req,res) => {register.handleRegister(req, res, bcrypt, db)})
app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)})
app.put('/image', (req, res) => {image.handleImage(req, res, db)})

app.listen(3000, () => {
    console.log('app is running on port 3000');
})

