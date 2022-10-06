const handleScore = (req, res, db) => {
    const { id, score } = req.body;
    db('users').where({id})
        .increment('score', score).returning('score')
        .then(scoreArray => {
            const subquery = db.select('id').from('users').rank('rank', db.raw('order by score desc')).as('rankings');
            db.select('rank').from(subquery).where({id}).then(rankArray => res.json({score: scoreArray[0].score, rank: rankArray[0].rank}))
        }).catch(err => res.status(400).json("error fetching score data"));
};

export default handleScore;
