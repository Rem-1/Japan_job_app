import DataTypes from "sequelize"
import db from '../config/database.js'

const Applicant = db.define('applications', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    categories: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        validate: {
            isValidValue(values) {
                const args = ['nodejs', 'angular', 'javascript', 'react']
                values.forEach(val =>{
                    if (!args.includes(val)){
                        throw new Error("Allowed categories: nodejs, angular, javascript, react.");
                    }
                })
                return values
            }
        }
    },
    japaneseKnowledge: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    level: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: {
                args: [['junior', 'middle', 'senior']],
                msg: "Allowed levels: junior, middle, senior."
              }
        }
    }

})

export default Applicant