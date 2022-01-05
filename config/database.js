import { Sequelize } from 'sequelize'
import 'dotenv/config'

export default new Sequelize('hw', process.env.DB_LOGIN, process.env.DB_PASS, {
  host: 'localhost',
  dialect: 'postgres'
});
