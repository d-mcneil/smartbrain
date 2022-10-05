const handleProfile = (req, res, db) => {
    db.select('*').from('users').where({id: req.params.id})
        .then(user => {
            if (user.length) {
                res.json(user[0]);
            } else {
                res.status(400).json("user not found");
            }
        }).catch(err => res.status(400).json("error fetching user data"));
};

export default handleProfile;
