import getRankRespondUser from "./getRankRespondUser.js";

const handleRegister = (req, res, db, bcrypt) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password){
      return res.status(400).json("Incorrect form submission: all fields are required");
  }
  db.select('email').from('users').where({email}).then(array => {
    if (array.length) {
      return res.status(400).json("Email address is already being used; select another email address.");
    } else {
      bcrypt.genSalt(10, function(err, salt) {
        if (!err) {
          bcrypt.hash(password, salt, function(err, hash) {
            if (!err) {
              db.transaction(trx => {
                trx.insert({email, hash}).into('login').returning('id').then(data => 
                  trx("users").insert({
                    id: data[0].id,
                    email: email,
                    name: name,
                    joined: new Date()
                  }).returning('*').then(user => getRankRespondUser(trx, user, res))
                ).then(trx.commit).catch(trx.rollback);
              }).catch(err => res.status(400).json("Unable to register new user: 1"));
            } else {
              res.status(400).json("Unable to register new user: 2");
            }
          });
        } else {
          res.status(400).json("Unable to register new user: 3")
        }
      });
    }
  }).catch(err => res.status(400).json("Unable to register new user: 4"));  
};

export default handleRegister;
