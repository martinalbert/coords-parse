import _, { LoDashWrapper } from 'lodash'
import BaseImageParser from './BaseImageParser'

class CoordsParser extends BaseImageParser {
    private coords: LoDashWrapper<ICoords>

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

interface ICoords {
    Latitude: number
    Longitude: number
    Altitude: number
}

export default CoordsParser
