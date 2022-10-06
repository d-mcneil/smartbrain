const getRankRespondUser = (db, user, res) => {
    const subquery = db.select('id').from('users').rank('rank', db.raw('order by score desc')).as('rankings');
    return db.select('rank').from(subquery).where({id: user[0].id}).then(data => {
        return res.json({
            id: user[0].id,
            name: user[0].name,
            email: user[0].email,
            score: user[0].score,
            joined: user[0].joined,
            rank: data[0].rank
        });
    });
};

export default getRankRespondUser; 
