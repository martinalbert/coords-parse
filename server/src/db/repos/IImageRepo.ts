import Image from '../../entities/Image'
/**
 * Abstract Class\
 * Contains abstractions of all functions that communicate with database
 *
 * @abstract @class IImageRepo
 * @function getByID - Function that finds one image represented by its ID
 * @function getAll - Function that finds all images corresponding to its owner
 * @function create - Function that creates new image corresponding to image passed in
 * @function delete - Function that deletes image represented by its ID
 */
export default abstract class IImageRepo {
    /**
     * Function that finds one image represented by its its ID
     * @abstract @async @function getByID
     * @param {number} id - ID of Image
     * @param {number} uID - ID of User
     * @returns {Promise<Image>} found Image
     */
    abstract async getByID(id: number, uID: number): Promise<Image>
    /**
     * Function that finds all images corresponding to its owner
     * @abstract @async @function getAll
     * @param {number} uID - ID of User
     * @returns {Promise<Image[]>} found Images
     */
    abstract async getAll(uID: number): Promise<Image[]>
    /**
     * Function that creates new image corresponding to image passed in
     * @abstract @async @function create
     * @param {Image} image - image that is going to be created
     * @returns {Promise<Image>} created Image
     */
    abstract async create(image: Image): Promise<Image>
    /**
     * Function that deletes image represented by its ID
     * @abstract @async @function delete
     * @param {number} id - ID of Image
     * @param {number} uID - ID of User
     * @returns {Promise<boolean>} value that indicates whether image was deleted or not
     */
    abstract async delete(id: number, uID: number): Promise<boolean>
}
