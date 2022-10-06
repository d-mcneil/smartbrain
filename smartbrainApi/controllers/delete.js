const handleDelete = (req, res, db) => {
    const { email } = req.body;
    db.transaction(trx => 
        trx('login').where({email}).del().then( () =>
            trx('users').where({email}).del().then( () => res.json("user deleted"))
        ).then(trx.commit).catch(trx.rollback)
    ).catch(err => res.status(400).json('Error deleting user: 0'));
};

export default handleDelete;
