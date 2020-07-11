import { Sequelize } from 'sequelize'
import config from '../config'
const POSTGRES_PORT = Number(config.POSTGRES_PORT)

/**
 * Instance of Sequelize\
 * Represent connection to database.
 *
 * @instance of Sequelize
 */
const sequelize = new Sequelize(config.POSTGRES_DB, config.POSTGRES_USER, config.POSTGRES_PW, {
    host: config.POSTGRES_URL,
    port: POSTGRES_PORT,
    dialect: 'postgres',
    logging: false,
})

export default sequelize
