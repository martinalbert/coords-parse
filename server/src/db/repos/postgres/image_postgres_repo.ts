import IImageRepo from '../IImageRepo'
import { resetSequence } from './actions'
import ImageModel from './models/Image'
import Image from '../../../entities/Image'

/**
 * Repository Class\
 * Entity: Image\
 * Class that handles communication with database
 *
 * @class ImageRepo
 * @extends IImageRepo
 * @function register - Function that creates(register) new User
 * @function login - Function that logs in user which is authenticated
 * @function getCurrent - Function that finds user that is currently loged in
 * @function getAll - Function that finds all users
 * @function delete - Function that deletes user represented by his ID
 */
export default class ImageRepo extends IImageRepo {
    /**
     * Function that finds one image represented by its its ID
     * @async @function getByID
     * @param {number} id - ID of Image
     * @param {number} uID - ID of User
     * @returns {Promise<Image>} found Image
     */
    async getByID(id: number, uID: number): Promise<Image> {
        const image = await ImageModel.findOne({ where: { id: id, user: uID } })

        if (!image) {
            throw new Error('This User doesnt have access to this image')
        }

        if (image) return image

        throw new Error(`There is no image with id: ${id} for this User.`)
    }
    /**
     * Function that finds all images corresponding to its owner
     * @async @function getAll
     * @param {number} uID - ID of User
     * @returns {Promise<Image[]>} found Images
     */
    async getAll(uID: number): Promise<Image[]> {
        const images = await ImageModel.findAll({ where: { user: uID } })

        if (images) return images

        throw new Error(`There are no images for this User.`)
    }
    /**
     * Function that creates new image corresponding to image passed in
     * @async @function create
     * @param {Image} image - image that is going to be created
     * @returns {Promise<Image>} created Image
     */
    async create(image: Image): Promise<Image> {
        const newImage = await ImageModel.create(image.toObject())

        // reset postgres sequence
        await resetSequence('images')

        if (newImage) return newImage

        throw new Error('Creating new image failed.')
    }
    /**
     * Function that deletes image represented by its ID
     * @async @function delete
     * @param {number} id - ID of Image
     * @param {number} uID - ID of User
     * @returns {Promise<boolean>} value that indicates whether image was deleted or not
     */
    async delete(id: number, uID: number): Promise<boolean> {
        const image = await ImageModel.findOne({ where: { id: id, user: uID } })

        if (!image) {
            throw new Error('This User doesnt have access to this image')
        }

        if (image.dataValues) {
            const deleted = await ImageModel.destroy({
                where: {
                    id: id,
                    user: uID,
                },
                restartIdentity: true,
            })

            // reset postgres sequence
            await resetSequence('images')

            return deleted
        }

        throw new Error(`There is no image with id: ${id} for this User`)
    }
}
