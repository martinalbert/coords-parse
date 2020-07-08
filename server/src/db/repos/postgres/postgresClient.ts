import { Sequelize } from 'sequelize'
import config from '../../../config'
const POSTGRES_PORT = Number(config.POSTGRES_PORT)

/**
 * Instance of Sequelize\
 * Represent connection to database.
 *
 * @instance of Sequelize
 */
export const sequelize = new Sequelize(config.POSTGRES_DB, config.POSTGRES_USER, '', {
    host: config.POSTGRES_URL,
    port: POSTGRES_PORT,
    dialect: 'postgres',
})

/**
 * Function that authenticate connection to database.
 * @function connect
 */
export const connect = () => {
    sequelize
        .authenticate()
        .then(() => {
            console.log('Connection has been established successfully.')

            // synchronize database
            sequelize.sync()
        })
        .catch((err: Error) => {
            console.error('Unable to connect to the database:', err)
        })
}

/**
 * Function that drops all tables from database
 * @function dropAllTables
 */
export const dropAllTables = () => {
    sequelize.sync({ force: true })
}
