import ExifReader from 'exifreader'
const exifErrors = ExifReader.errors

export default abstract class BaseImageParser {

    private imageBuffer: Buffer
    protected tags: ITags

    constructor(imageBuffer: Buffer) {

        this.imageBuffer = imageBuffer
        this.tags = this.getTags()
    }
    
    // get tags from file buffer
    private getTags(): ITags {
    
        let tags: ITags
        try {

            tags = ExifReader.load(this.imageBuffer, {expanded: true})
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

    private listAllTags () {
        for (const group in this.tags) {
            for (const name in this.tags[group]) {
                if (group === 'gps') {
                    console.log(`${group}:${name}: ${this.tags[group][name]}`);
                } else if ((group === 'Thumbnail') && (name === 'image')) {
                    console.log(`${group}:${name}: <image>`);
                } else if ((group === 'Thumbnail') && (name === 'base64')) {
                    console.log(`${group}:${name}: <base64 encoded image>`);
                } else {
                    console.log(`${group}:${name}: ${this.tags[group][name].description}`);
                }
            }
        }
    }
}

interface ITags {
    [key: string]: any
}