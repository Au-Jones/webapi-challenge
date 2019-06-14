const express = require('express')
const actionModel = require('./data/helpers/actionModel')

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const actions = await actionModel.get();
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
        const addedAction = await actionModel.insert(newAction);
        res.status(201).json(addedAction);
    }catch(error){
        res.status(500).json({message: error})
    }
})

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    try{
        const actionUpdate = req.body;
        const updatedAction = await actionModel.update(id, actionUpdate);
        if (updatedAction !== null) {
            res.status(200).json(updatedAction);
        }else{
            res.status(418).json(`Action ${id} does not exist`)
        }
    } catch(error) {
        res.status(500).json({message: error})
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try{
        const deleteCount = await actionModel. remove(id);
        if (deleteCount !== 0) {
            res.status(200).json({deleteCount, id})
        }else{
            res.status(501).json({ message: `Action ${id} does not exist`})
        }
    } catch(error) {
        res.status(404).json({ message:error})
    }
})




module.exports = router