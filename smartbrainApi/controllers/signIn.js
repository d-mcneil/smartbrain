import getRankRespondUser from "./getRankRespondUser.js";

const handleSignIn = (req, res, db, bcrypt) => {
    const { email, password } = req.body;
    if (!email || !password){
        return res.status(400).json("Incorrect form submission: all fields required")
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
                db.select('*').from('users').where({email}).then(user => getRankRespondUser(db, user, res))
                .catch(err => res.status(400).json('Error fetching user information'));

            } else {
                res.status(400).json("Invalid combination of email and password");
            }
        }).catch(err => res.status(400).json("Error logging in user: 1"));   
};

export default handleSignIn;
