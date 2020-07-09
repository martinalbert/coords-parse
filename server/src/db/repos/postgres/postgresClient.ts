import { Sequelize, QueryTypes } from 'sequelize'
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
    logging: false,
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

export const getLastID = async () => {
    const imageCount = await sequelize.query(
        'SELECT setval(\'images_id_seq\', (SELECT MAX(id) FROM "images"));',
        { type: QueryTypes.SELECT }
    )
    const userCount = await sequelize.query(
        'SELECT setval(\'users_id_seq\', (SELECT MAX(id) FROM "users"));',
        { type: QueryTypes.SELECT }
    )
    return {
        imageCount: Number(imageCount[0].setval),
        userCount: Number(userCount[0].setval),
    }
}

/**
 * Function that drops all tables from database
 * @function dropAllTables
 */
export const dropAllTables = () => {
    sequelize.sync({ force: true })
}
