/**
 * Entity Class\
 * class that represent entity of image across application
 *
 * @class Image
 * @implements {IImage}
 * @param  {number} id - Primary key of DB record
 * @param  {string} fileName - filename of the image
 * @param  {string} imageName - (optional) name of the image
 * @param  {ICoords} coordinates - object of coordinates
 * @function toObject - Function that maps the Image to object
 */
export default class Image implements IImage {
    id: number
    fileName: string
    imageName?: string
    coordinates: ICoords
    user: IUser

    constructor(
        id: number,
        fileName: string,
        coordinates: ICoords,
        user: IUser,
        imageName?: string
    ) {
        this.id = id
        this.fileName = fileName
        this.coordinates = coordinates
        this.user = user

        if (imageName) this.imageName = imageName
    }

    /**
     * Helper Function \
     * function that maps the Image to object
     * @function toObject
     * @returns {Object} object with properties of Image
     */
    toObject(): Object {
        return {
            id: this.id,
            fileName: this.fileName,
            imageName: this.imageName,
            latitude: this.coordinates.Latitude,
            longitude: this.coordinates.Longitude,
            altitude: this.coordinates.Altitude,
            user: this.user.id,
        }
    }
}
