import ExifReader from 'exifreader'
const exifErrors = ExifReader.errors

/**
 * Abstract Class\
 * Parses the multiple tags from Image
 *
 * @abstract @class ImageParser
 * @private @param {Buffer} imageBuffer - buffer of provided image
 * @protected @param {ITags} tags - parsed tags from Image
 * @private @function getTags - function that parses all tags from image
 * @private @function listAllTags - function that logs all tags
 */
export default abstract class ImageParser {
    /**
     * @private buffer of provided image
     */
    private imageBuffer: Buffer
    /**
     * @protected parsed tags from Image
     */
    protected tags: ITags

    /**
     * @constructor of ImageParser
     * @param  {Buffer} imageBuffer - provided image buffer
     * @returns {ImageParser} instance of this class
     */
    constructor(imageBuffer: Buffer) {
        this.imageBuffer = imageBuffer
        this.tags = this.getTags()
    }

    /**
     * Function that parses all tags from Image.
     * @private @function getTags
     * @returns {ITags} all tags extracted from Image
     */
    private getTags(): ITags {
        let tags: ITags
        try {
            tags = ExifReader.load(this.imageBuffer, { expanded: true })
            if (tags.exif) {
                delete tags.exif['MakerNote']
            }

            return tags
        } catch (error) {
            if (error instanceof exifErrors.MetadataMissingError) {
                console.error('No Exif data found')
            }
            console.error(error.message)
        }
        return {}
    }

    /**
     * Function that logs all tags.
     * @private @function listAllTags
     */
    private listAllTags() {
        for (const group in this.tags) {
            for (const name in this.tags[group]) {
                if (group === 'gps') {
                    console.log(`${group}:${name}: ${this.tags[group][name]}`)
                } else if (group === 'Thumbnail' && name === 'image') {
                    console.log(`${group}:${name}: <image>`)
                } else if (group === 'Thumbnail' && name === 'base64') {
                    console.log(`${group}:${name}: <base64 encoded image>`)
                } else {
                    console.log(`${group}:${name}: ${this.tags[group][name].description}`)
                }
            }
        }
    }
}

/**
 * Interface\
 * Interface for tags extracted from Image.\
 * Provides indexing by string.
 *
 * @interface
 */
interface ITags {
    [key: string]: any
}
