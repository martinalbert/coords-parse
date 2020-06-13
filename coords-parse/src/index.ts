import fs from 'fs'

const path: string = './image.jpeg'

const fileStream = fs.readFile(path, (err, data) => {
    if (err)
        console.error(err.message)
})