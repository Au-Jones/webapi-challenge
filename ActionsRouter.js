const express = require('express')
const actionModel = require('./data/helpers/actionModel')

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const actions = await actionsModel.get();
        res.status(200).json(actions);
    } catch(error) {
        res.status(404).json({ message: error})
    }
})

router.get('/:id', async (req, res) => {
    const id =req.params.id;
    try{
        const action = await actionsModel.get(id);
        res.status(200).json(action);
    } catch(error) {
        res.status(400).json({ message: `Action ${id} does not exist`})
    }
})

router.post('/', async (req, res) => {
    try{
        const newAction = req.body;
        const
    }
})

module.exports = router