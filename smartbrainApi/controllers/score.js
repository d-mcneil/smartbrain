const handleScore = (req, res, db) => {
    db('users').where({id: req.body.id})
        .increment('score', req.body.score)
        .returning('score')
        .then(array => res.json(array[0].score))
        .catch(err => res.status(400).json("error fetching score data"));
};

export default handleScore;
