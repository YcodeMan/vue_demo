const express = require('express')
const MovieModel = require('../models/movie')

const router = express.Router()

// 查找所有的数据
router.get('/movie', (req, res) => {
    MovieModel.find({})
    .sort({createdAt: -1})
    .then(
        movie => res.json(movie)
    ).catch(
        err => res.json(err)
    )
})

// 通过id查找数据
router.get('/movie/:id', (req, res) => {
    MovieModel.findById(req.params.id)
    .then(
        movie => res.json(movie)
    )
    .catch(
        err => res.json(err)
    )
})

// 添加数据
router.post('/movie', (req, res) => {
    MovieModel.create(req.body)
    .then(
        movie => res.json(movie)
    )
    .catch(
        err => res.json(err)
    )
})

// 更新数据
router.put('/movie/:id', (req, res) => {
    MovieModel.findOneAndUpdate({_id: req.params.id}, {
        $set: {
            title: req.body.title,
            poster: req.body.poster,
            rating: req.body.rating,
            introduction: req.body.introduction 
        }
    },{
            new : true
    }) 
    .then( movie => res.json(movie) )
    .catch( err => res.json(err) )
})

// 删除数据
router.delete('/movie/:id', (req, res) => {
    MovieModel.findOneAndRemove({_id: req.params.id})
    .then( movie => res.json(movie) )
    .catch( err => res.json(err) )
})

module.exports = router