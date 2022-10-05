const handleSignIn = (req, res, db, bcrypt) => {
    const { email, password } = req.body;
    if (!email || !password){
        return res.status(400).json("Incorrect form submission: all fields are required")
    }
    db.select('hash').from('login').where({email})
        .then(data => {
        if (data.length){
            return bcrypt.compare(password, data[0].hash);
        } else {
            return false;
        }
        }).then(isValidPassword => {
            if (isValidPassword) {
                db.select('*').from('users').where({email})
                    .then(user => {
                        const subquery = db.select('id').from('users').rank('rank', db.raw('order by score desc')).as('rankings')
                        db.select('rank').from(subquery).where({id: user[0].id}).then(data => {
                            res.json({
                                id: user[0].id,
                                name: user[0].name,
                                email: user[0].email,
                                score: user[0].score,
                                joined: user[0].joined,
                                rank: data[0].rank
                            })
                        })
                    })
                    .catch(err => res.status(400).json("Error logging in user."));
            } else {
                res.status(400).json("That combination of email and password is not valid.");
            }
        }).catch(err => res.status(400).json("Error logging in user."));   
};

export default handleSignIn;
