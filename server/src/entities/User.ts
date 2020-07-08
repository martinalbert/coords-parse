/**
 * Entity Class\
 * class that represent entity of user across application
 *
 * @class User
 * @implements {IUser}
 * @param  {number} id - primary key of db record
 * @param  {string} userName - name of User
 * @param  {string} email - email of User
 * @param  {string} password - password
 * @function toObject - function that maps the user to object
 */
export default class User implements IUser {
    id: number
    userName?: string
    email: string
    password: string

    constructor(id: number, userName: string, email: string, password: string) {
        this.id = id
        this.userName = userName
        this.email = email
        this.password = password
    }

    /**
     * Helper Function \
     * function that maps the user to object
     * @function toObject
     * @returns {Object} object with properties of user
     */
    toObject(): Object {
        return {
            id: this.id,
            userName: this.userName,
            email: this.email,
            password: this.password,
        }
    }
}
