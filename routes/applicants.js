import express from "express";
import Applications from '../models/applicant.js'

const applicantsRouter = express.Router()

applicantsRouter.post('/', async(req, res, next) => {
    const applicant = Applications.build({
        email: req.body.email,
        categories: req.body.categories,
        level: req.body.level,
        japaneseKnowledge: req.body.japaneseKnowledge
    })
    try {
        const savedApplicant = await applicant.save()
        if (!savedApplicant){
            res.status(500)
        } else {
            res.status(201)
           .send(`Created, ID:${result.id} in "${Applications.getTableName()}"`)
        }
    } catch (error) {
        res.status(400)
        .send(error.message)
    }
    next()
})

applicantsRouter.put('/:id', async(req, res, next) => {
    const applicant = Applications.build({},{
        isNewRecord: false
        }
    )
    if(req.body.email){
        applicant.email = req.body.email
    }
    if(req.body.categories){
        applicant.categories = req.body.categories
    }
    if((req.body.japaneseKnowledge != null) && ((typeof(req.body.japaneseKnowledge)) == 'boolean')){
        applicant.japaneseKnowledge = req.body.japaneseKnowledge
    }
    if(req.body.level){
        applicant.level = req.body.level
    }

    try {
        const applicantToUpdate = await Applications.update(applicant.dataValues,
            {
                where:{
                    id: req.params.id
                }
            }
        )
        if(!applicantToUpdate){
            res.status(500).send('Server error')
        }else if(applicantToUpdate[0] !=1){
            res.status(404).send('Not found')
        }else{
            res.status(200).send('Ok')
        }
    } catch (error) {
        res.status(400)
        .send(error.message)
    }
    next()
})


applicantsRouter.delete('/:id', async(req, res, next) => {
    try {
        const appticantToDelete = await Applications.destroy({
            where: {
                id: req.params.id
            }
        })

        if(!appticantToDelete){
            res.status(500).send('Server error')
        }else if(appticantToDelete !=1){
            res.status(404).send('Not found')
        }else{
            res.status(204).send('No Content')
        }
    } catch (error) {
        res.status(500)
        .send(error.message)
    }
    next()
})

export default applicantsRouter