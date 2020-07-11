import Sequelize, { Model } from 'sequelize'
import sequelize from '../../../sequelize'
import UserModel from './User'

/**
 * Sequelize Model Class\
 * Entity: Image\
 * Represent table in database
 *
 * @class ImageModel
 * @extends Model
 */
class ImageModel extends Model {}
ImageModel.init(
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            unique: true,
            allowNull: false,
            autoIncrement: true,
        },
        fileName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        imageName: {
            type: Sequelize.STRING,
            allowNull: true,
            validate: {
                len: [3, 30],
            },
        },
        latitude: {
            type: Sequelize.FLOAT,
            allowNull: false,
            validate: {
                isFloat: true,
                min: -90,
                max: 90,
            },
        },
        longitude: {
            type: Sequelize.FLOAT,
            allowNull: false,
            validate: {
                isFloat: true,
                min: -180,
                max: 180,
            },
        },
        altitude: {
            type: Sequelize.FLOAT,
            allowNull: true,
            validate: {
                isFloat: true,
            },
        },
        user: {
            type: Sequelize.INTEGER,
            references: {
                model: UserModel,
                key: 'id',
            },
        },
    },
    {
        sequelize,
        modelName: 'image',
    }
)

export default ImageModel
