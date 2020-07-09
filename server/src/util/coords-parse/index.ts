import _, { LoDashWrapper } from 'lodash'
import ImageParser from './ImageParser'

/**
 * Parser Class\
 * Acquire coordinates from compatible image.
 *
 * @class CoordsParser
 * @extends ImageParser
 * @param  {ICoords} coords - Object with coordinates - contains latitude, longitude and altitude
 * @private @function getCoords - extracts the coordinates from exif data
 * @public @static @function checkCompatibility - function that checks image compatibility with exifReader
 */
class CoordsParser extends ImageParser {
    /**
     * @private Object with coordinates
     * @property latitude
     * @property longitude
     * @property altitude
     */
    private coords: ICoords

    /**
     * @constructor of CoordsParser
     * @param  {Buffer} imageBuffer - buffer of image that will be parsed
     * @param  {string} format - (optional) format of coordinates
     * @returns {CoordsParser} instance of this class
     */
    constructor(imageBuffer: Buffer, format?: string) {
        super(imageBuffer)
        this.coords = this.getCoords()
    }

    /**
     * Extracts the coordinates from exif data.
     * @private @function getCoords
     */
    private getCoords() {
        return _.filter(this.tags, (val, key) => key === 'gps')[0]
    }

    /**
     * Getter for coordinates.
     * @property {ICoords} coords
     */
    get coordinates() {
        return this.coords
    }

    /**
     * Function that checks image compatibility with exifReader.
     * @param  {string} mimetype
     */
    public static checkCompatibility(mimetype: string): boolean {
        switch (mimetype) {
            case 'image/jpeg':
                return true

            case 'image/tiff':
                return true

            case 'image/png':
                return false

            case 'image/heic':
                return true

            case 'image/heif':
                return true

            default:
                return false
        }
    }
}

export default CoordsParser
