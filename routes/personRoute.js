const express = require('express')//importing express
const personRouter = express.Router()//use methode Router from express
const persone = require('../models/mongooseSchema')//imorting person from mongooseSchema file


//adding post methode
personRouter.post('/AddPerson', async (req, res) => {
    try {
        const newPerson = new persone(req.body)
        await newPerson.save()
        res.status(200).json({ msg: 'person created successfly', newPerson })
    }
    catch (err) { res.status(500).json({ msg: err.message }) }
})
//show all records
personRouter.get('/AllPerson', async (req, res) => {
    try {
        const AllPerson = await persone.find()
        res.status(200).json({ msg: 'all records are following:', AllPerson })
    }
    catch (err) { res.status(500).json({ msg: err.message }) }
})
///display records by favorite food
personRouter.get('/personByFood', async (req, res) => {
    try {
        const food = req.body
        console.log(food)
        const FirstPerson = await persone.findOne({ favoriteFoods: food })
        res.status(200).json({ msg: 'person mached:', FirstPerson })
    }
    catch (err) { res.status(500).json({ msg: err.message }) }
})
///display records by id
personRouter.get('/personByID/:id', async (req, res) => {
    try {
        const id = (req.params.id)
        const ThePerson = await persone.findOne({ _id: id })
        res.status(200).json({ msg: 'person mached:', ThePerson })
    }
    catch (err) { res.status(500).json({ msg: err.message }) }
})
///Perform New Updates on a Document Using model.findOneAndUpdate
personRouter.put('/personUpdate/:id', async (req, res) => {
    try {
        const id = req.params.id
        const food = req.body
        const ThePerson = await persone.findOneAndUpdate({ _id: id }, { favoriteFoods: [food] })
        res.status(200).json({ msg: 'person mached:', ThePerson })
        console.log(id, food)
    }
    catch (err) { res.status(500).json({ msg: err.message }) }
})
//Delete One Document Using model.findByIdAndRemove

personRouter.delete('/personDelete/:id', async (req, res) => {
    try {
        const id = req.params.id
        const deletedPerson = await persone.deleteOne({ _id: id })
        res.status(200).json({ msg: 'person mached:', deletedPerson })
    }
    catch (err) { res.status(500).json({ msg: err.message }) }
})

personRouter.delete('/personManyDelete', async (req, res) => {
    try {
        const name = req.body
        const deletedPerson = await persone.deleteMany({ name: name })
        res.status(200).json({ msg: 'person mached:', deletedPerson })
    }
    catch (err) { res.status(500).json({ msg: err.message }) }
})
//Query Building
personRouter.get('/personFilter', async (req, res) => {
    try {
        const ThePerson = await persone.find({ favoriteFoods: { $all: ["burritos"] } })//filter by favorite food
            .sort({ name: 1 })//sort by name
            .limit(2)//limit to 2 records
            .select({ age: false })//hide age field
            .exec()//execute the query
        res.status(200).json({ msg: 'person mached:', ThePerson })
    }
    catch (err) { res.status(500).json({ msg: err.message }) }
})

module.exports = personRouter