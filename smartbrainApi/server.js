import express from "express";
import cors from "cors";
import knex from "knex";
import bcrypt from "bcryptjs";
import handleRegister from "./controllers/register.js"; 
import handleProfile from "./controllers/profile.js";
import handleScore from "./controllers/score.js";
import handleSignIn from "./controllers/signIn.js";
import handleApiCall from "./controllers/apiCall.js";
import databaseInfo from "./databaseInfo.js";

const db = knex(databaseInfo);

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => res.json("all is good"));

app.post("/sign-in", (req, res) => {handleSignIn(req, res, db, bcrypt)})
// app.post("/sign-in", (req, res) => {
//   const { email, password } = req.body;
//   db.select('hash').from('login').where({email})
//     .then(data => {
//       if (data.length){
//         return bcrypt.compare(password, data[0].hash);
//       } else {
//         return false;
//       }
//     }).then(isValidPassword => {
//       if (isValidPassword) {
//         db.select('*').from('users').where({email})
//           .then(user => res.json(user[0]))
//           .catch(err => res.status(400).json("Error logging in user."));
//       } else {
//         res.json("That combination of email and password is not valid.");
//       }
//     }).catch(err => res.status(400).json("Error logging in user."));
// });

app.post("/register", (req, res) => {handleRegister(req, res, db, bcrypt)})
// app.post("/register", (req, res) => {
//   const { name, email, password } = req.body;
//   bcrypt.genSalt(10, function(err, salt) {
//     if (!err) {
//       bcrypt.hash(password, salt, function(err, hash) {
//         if (!err) {
//           db.transaction(trx => {
//             trx.insert({email, hash}).into('login').returning('id').then(data => 
//               trx("users").insert({
//                 id: data[0].id,
//                 email: email,
//                 name: name,
//                 joined: new Date()
//               }).returning('*').then(user => res.json(user[0]))
//             ).then(trx.commit).catch(trx.rollback)
//           }).catch(err => res.status(400).json("unable to register new user"));
//         } else {
//           res.status(400).json("unable to register new user")
//         }
//       });
//     } else {
//       res.status(400).json("unable to register new user")
//     }
//   });
// });

app.get("/profile/:id", (req, res) => {handleProfile(res, req, db)});
// app.get("/profile/:id", (req, res) => {
//   db.select('*').from('users').where({id: req.params.id})
//   .then(user => {
//     if (user.length) {
//       res.json(user[0]);
//     } else {
//       res.status(400).json("user not found");
//     }
// })
//   .catch(err => res.status(400).json("error fetching user data"));
// })

app.put("/score", (req, res) => {handleScore(req, res, db)});
// app.put("/image", (req, res) => {
//   db('users').where({id: req.body.id})
//   .increment('score', 1)
//   .returning('score')
//   .then(array => res.json(array[0].score))
//   .catch(err => res.status(400).json("error fetching score data"));
//   }
// );

app.post("/image", (req, res) => {handleApiCall(req, res)});

app.listen(3001, () => {
  console.log("SmartBrain is running on port 3001.");
});

// root route - GET
// sign-in route - POST = succes/fail
// register - POST = {user}
// profile/:userID - GET = {user}
// image - PUT = user
