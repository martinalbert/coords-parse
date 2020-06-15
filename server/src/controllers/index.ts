import express, { Request, Response } from 'express'
import { BaseController } from './BaseController'
import Parser from '../../../coords-parse/dist'

interface IRecordService {
    id: number,
    imageName: string,
    lat: number,
    long: number,
    alt: number
}

export class CreateRecordController extends BaseController {

    private recordService: IRecordService

    constructor (recordService: IRecordService) {
        super()
        this.recordService = recordService
    }

    protected async executeImpl (req: Request, res: Response): Promise<void | any> {
        try {
            // handle request
            const imageBuffer: Buffer = req.file.buffer
            const coordsParser = new Parser(imageBuffer)

            console.log('after parse', coordsParser.coordinates)
            res.status(200).send(coordsParser.coordinates)

            // save record

        } catch (err) {
            return this.fail(res, err.toString())
        }
    }
}

export class GetRecordController extends BaseController {
    
    private recordService: IRecordService

    constructor (recordService: IRecordService) {
        super()
        this.recordService = recordService
    }

    protected async executeImpl (req: Request, res: Response): Promise<void | any> {
        try {
            // handle request
            const image = req.body
            res.status(200).send(image)

            // save record

        } catch (err) {
            return this.fail(res, err.toString())
        }
    }
}