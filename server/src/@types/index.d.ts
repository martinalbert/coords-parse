interface ICoords {
    Latitude: number
    Longitude: number
    Altitude: number
}

/**
 * Interface\
 * Interface for Entity of User
 *
 * @interface
 * @param  {number} id - Primary key of DB record
 * @param  {string} userName - Name of User
 * @param  {string} email - Email of User
 * @param  {string} password - password
 * @function toObject - Function that maps the user to object
 */
interface IUser {
    /**
     * Primary key of DB record
     */
    id: number
    /**
     * Name of User
     */
    userName?: string
    /**
     * Email of User
     */
    email: string
    /**
     * Password
     */
    password: string

    /**
     * Helper Function \
     * function that maps the user to object
     * @function toObject
     * @returns {Object} object with properties of user
     */
    toObject(): Object
}

/**
 * Interface\
 * Interface for Entity of Image
 *
 * @interface
 * @param  {number} id - Primary key of DB record
 * @param  {string} fileName - filename of the Image
 * @param  {string} imageName - (optional) name of the Image
 * @param  {ICoords} coordinates - object of coordinates
 * @param  {IUser} user - reference to owner of the Image
 * @function toObject - Function that maps the Image to object
 */
interface IImage {
    /**
     * Primary key of DB record
     */
    id: number
    /**
     * filename of the Image
     */
    fileName: string
    /**
     * name of the Image
     */
    imageName?: string
    /**
     * object of coordinates
     */
    coordinates: ICoords
    /**
     * reference to owner of Image
     */
    user: IUser

    /**
     * Helper Function \
     * function that maps the Image to object
     * @function toObject
     * @returns {Object} object with properties of Image
     */
    toObject(): Object
}

/**
 * Interface\
 * Interface for Object that is decoded by valid json web token
 *
 * @interface
 * @param  {number} id - id of encoded User
 * @param  {string} email - email of encoded User
 * @param  {number} iat - issued at - time at which the JWT was created
 * @param  {number} exp - expiration time - time on which JWT won't be accepted
 */
interface jwtObject {
    /**
     * id of encoded User
     */
    id: number
    /**
     * email of encoded User
     */
    email: string
    /**
     * issued at - time at which the JWT was created
     */
    iat: number
    /**
     * expiration time - time on which JWT won't be accepted
     */
    exp: number
}
