const Result = require('../models/result')
const router = require('express').Router();

//get all data available
router.get('/api/results', (request, response) => {
    Result.find({}).then(results => {
        response.json(results)
    })
})

//single search using id
router.get('/api/searchResult/:id', (request, response) => {
    Result.findById(request.params.id)
        .then(result => {
            if (result) {
                response.json(result)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => {
            console.log(error)
            response.status(400).send({ error: 'malformatted id' })
        })
})

//single search which returns latest one recorded
router.get('/api/getLatest', (request, response) => {
    Result.findOne({}, {}, { sort: { 'date': -1 } }, function (err, result) {
        console.log(result)
        if (result) {
            response.json(result)
        } else {
            response.json({})
        }
    })
})


//add new item
router.post('/api/addResult', (request, response) => {
    const body = request.body
    console.log(request.body)

    const result = new Result({
        date: body.date,
        data: body.data,
        client: body.client
    })

    result.save().then(savedResult => {
        response.json(savedResult)
    })
})

//remove item by id
router.delete('/api/removeResult/:id', (request, response, next) => {
    Result.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

//update client name with id
router.put('/api/update/:id', (request, response) => {

    Result.findByIdAndUpdate(request.params.id, { client: request.body.client }, { new: true })
        .then(updatedResult => {
            response.json(updatedResult)
        })
        .catch(error => next(error))
})

module.exports = router;