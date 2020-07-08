import User from '../entities/User'
import Image from '../entities/Image'

const user1 = new User(1, 'Martin', 'info@martin.com', 'password12345')
const user2 = new User(2, 'Batman', 'batman@example.com', '12345password')

const image1 = new Image(
    1,
    '/test/image1.png',
    { Longitude: 45, Latitude: 45, Altitude: 200 },
    user1
)
const image2 = new Image(
    2,
    '/test/image2.png',
    { Longitude: 45, Latitude: 45, Altitude: 200 },
    user1
)
const image3 = new Image(
    3,
    '/test/image3.png',
    { Longitude: 45, Latitude: 45, Altitude: 200 },
    user1
)
const image4 = new Image(
    4,
    '/test/image4.png',
    { Longitude: 45, Latitude: 45, Altitude: 200 },
    user1
)

const image5 = new Image(
    5,
    '/test/image5.png',
    { Longitude: 45, Latitude: 45, Altitude: 200 },
    user2
)
const image6 = new Image(
    6,
    '/test/image6.png',
    { Longitude: 45, Latitude: 45, Altitude: 200 },
    user2
)
const image7 = new Image(
    7,
    '/test/image7.png',
    { Longitude: 45, Latitude: 45, Altitude: 200 },
    user2
)
const image8 = new Image(
    8,
    '/test/image8.png',
    { Longitude: 45, Latitude: 45, Altitude: 200 },
    user2
)

export default {
    users: [user1, user2],
    images: [image1, image2, image3, image4, image5, image6, image7, image8],
}
