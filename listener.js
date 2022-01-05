import EventEmitter from 'events'
import Applications from './models/applicant.js'
import sequelize from 'sequelize'
import sendMail from './mailSender.js'
const { Op } = sequelize;

const myEmitter = new EventEmitter()

myEmitter.on('positionAdded', handlePositionChanges)
myEmitter.on('positionRemoved', handlePositionChanges)


async function handlePositionChanges(position, msg) {
    let positionToFind = {}
    positionToFind.categories = {
        [Op.contains]: [position.category]
    }
    positionToFind.level = position.level
    if(position.japaneseRequired != false){
        positionToFind.japaneseKnowledge = position.japaneseRequired
    }
    try {
        const applicants = await Applications.findAll({
            where: positionToFind
        })

        if(!applicants){
            throw new Error({
                name:'Error',
                message: 'No Value(s).'
            })
        }else{
            applicants.forEach(item => {
                sendMail(item.email, position, msg)
            })
        }
    } catch (error) {
        console.log(error)
    }
}
export default myEmitter