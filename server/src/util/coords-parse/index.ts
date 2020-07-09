import _, { LoDashWrapper } from 'lodash'
import ImageParser from './ImageParser'

class CoordsParser extends ImageParser {
    private coords: ICoords

    constructor(imageBuffer: Buffer, format?: string) {
        super(imageBuffer)
        this.coords = this.getCoords()
    }

    // get coordinates from tags
    private getCoords() {
        return _.filter(this.tags, (val, key) => key === 'gps')[0]
    }

    get coordinates() {
        return this.coords
    }
}

export default CoordsParser
