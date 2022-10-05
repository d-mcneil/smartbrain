const handleRegister = (req, res, db, bcrypt) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password){
        return res.status(400).json("Incorrect form submission: all fields are required")
    }
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
                }).returning('*').then(user => res.json(user[0]))
              ).then(trx.commit).catch(trx.rollback)
            }).catch(err => res.status(400).json("unable to register new user"));
          } else {
            res.status(400).json("unable to register new user")
          }
        });
      } else {
        res.status(400).json("unable to register new user")
      }
    });
  };

  export default handleRegister; 
