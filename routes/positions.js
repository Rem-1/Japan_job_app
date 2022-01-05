import express from 'express'
import Position from '../models/position.js'
import myEmitter  from '../listener.js'

const positionsRouter = express.Router()

positionsRouter.get('/', async (req, res, next) => {
    let where = {}
    if(req.query.category){
        where.category = req.query.category
    }
    if(req.query.level){
        where.level = req.query.level
    }
    try {
        const getAllPosition = await Position.findAll({
            where: where
        })

        if(!getAllPosition){
            res.status(500).send('Server Error')
        }else if(!getAllPosition.length){
            res.status(404).send('Not Found')
        }else{
            res.status(200).send(getAllPosition)
        }
    } catch (error) {
        res.status(500)
        .send(error)
    }
    next()
})

positionsRouter.get('/:id', async(req, res, next) => {
    try {
        const positionToFind = await Position.findOne({
            where:{
                id: req.params.id
            }
        })

        if(!positionToFind){
            res.status(404).send('Not Found')
        }else{
            res.status(200).send(positionToFind.dataValues)
        }
    } catch (error) {
        res.status(500).send({
            message: error
        })
    }
    next()
})

positionsRouter.post('/', async(req, res, next) => {
    const position = Position.build({
        category: req.body.category,
        level: req.body.level,
        company: req.body.company,
        description: req.body.description,
        japaneseRequired: req.body.japaneseRequired
    })
    try {
        const positionAdded = await position.save()

        if (!positionAdded){
            res.status(500).send('Server Error')
        } else {
            myEmitter.emit('positionAdded', req.body, 'Position added.')
            res.status(201)
           .send(`Created, ID:${positionAdded.id} in "${Position.getTableName()}"`)
        }
    } catch (error) {
        res.status(500)
        .send(error.message)
    }
    next()
})

positionsRouter.patch('/:id', async(req, res, next) => {
    let toUpdate = {}
    if(req.body.description){
        toUpdate.description = req.body.description
    }
    if((req.body.japaneseRequired != null) && ((typeof(req.body.japaneseRequired)) == 'boolean')){
        toUpdate.japaneseRequired = req.body.japaneseRequired
    }
    if(Object.keys(toUpdate) != 0){
        try {
            const positionToUpdate = await Position.update(toUpdate,
                {
                    where:{
                        id: req.params.id
                    }
                }
            )

            if(!positionToUpdate){
                res.status(500).send('Server error')
            }else if(positionToUpdate[0] !=1){
                res.status(404).send('Not found')
            }else{
                res.status(200).send('Ok')
            }
        } catch (error) {
            res.status(500).send(
                error.message
            )
        }
    }else{
        res.status(400).send("No Value(s) To Update.")
    }
    next()
})

positionsRouter.delete('/:id', async(req, res, next) => {
    try {
        const position = await Position.findOne({
            where:{
                id: req.params.id
            }
        })

        if(!position){
            res.status(404).send('Not Found')
        }else{
            const positionToDelete = await Position.destroy({
                where: {
                    id: req.params.id
                }
            })
            if(!positionToDelete){
                res.status(500).send('Server error')
            }else{
                myEmitter.emit('positionRemoved', position.dataValues, 'Position deleted.');
                res.status(204)
                .send('No Content')
            }
        }
    } catch (error) {
        res.status(500)
        .send(error.message)
    }
    next()
})

export default positionsRouter