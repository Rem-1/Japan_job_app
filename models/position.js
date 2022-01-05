import DataTypes from 'sequelize'
import db from '../config/database.js'

const Position = db.define('position', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: {
                args: [['nodejs', 'angular', 'javascript', 'react']],
                msg: 'Allowed categories: nodejs, angular, javascript, react.'
              }
        }
    },
    level: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: {
                args: [['junior', 'middle', 'senior']],
                msg: 'Allowed levels: junior, middle, senior.'
              }
        }
    },
    company: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    japaneseRequired: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
})

export default Position