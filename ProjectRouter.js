const express = require('express');
const projectModel = require('./data/helpers/projectModel');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const projects = await projectsModel.get();
        res.status(200).json(projects);
    }catch(error) {
        res.status(404).json({ message: error});
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try{
        const project = await projectModel.get(id);
        res.status(200).json(project);
    } catch(error) {
        res.status(404).json({ message: `Project ${id} does not exist`})
    }
})

router.get('/projectActions/:projectId', async (req, res) => {
    const projectId = req.params.projectId;
    try{
        const actionsOfProject = await projectModel.getProjectActions(projectId);
        if (actionsOfProject.length !== 0) {
            res.status(200).json(actionsOfProject);
        }else{
            res.status(404).json({ message: `No actions for project ${projectId}`})
        }
    } catch(error) {
        res.status(418).json({message: error})
    }
})

router.post('/', async (req,res) => {
    try{
        const newProject = req.body;
        const addedProject = await projectModel.insert(newProject);
        res.status(201).json(addedProject);
    }catch(error) {
        res.status(500).json({message: error})
    }
})

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    try{
        const projectUpdate = req.body;
        const updatedProject = await projectModel.update(id, projectUpdate);
        if (updatedProject !== null) {
            res.status(200).json(updatedProject);
        }else{
            res.status(418).json(`Project ${id} does not exist`)
        }
    } catch(error) {
        res.status(500).json({ message: error})
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try{
        const deleteCount = await projectModel. remove(id);
        if (deleteCount !== 0) {
            res.status(200).json({deleteCount, id})
        } else{
            res.status(501).json({ message: `Project ${id} does not exist`})
        }
    } catch(error) {
        res.status(404).json({ message: error})
    }
})

module.exports = router;