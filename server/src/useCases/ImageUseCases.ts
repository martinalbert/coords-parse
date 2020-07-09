import {
    CreateImageController,
    GetImageByIDController,
    GetAllImagesController,
    DeleteImageController,
} from '../controllers/ImageController'
import { ImageRepo, UserRepo } from '../db'

/**
 * Instance of Repository Class\
 * Class that handles communication with database
 *
 * @class ImageRepo
 * @instance
 */
const imageRepo = new ImageRepo()
/**
 * Instance of Repository Class\
 * Class that handles communication with database
 *
 * @class UserRepo
 * @instance
 */
const userRepo = new UserRepo()

/**
 * Instance of Controller Class\
 * Controller that handles HTTP Requests with method GET on image /images/:id
 *
 * @class GetMonitoredEndpointByIDController
 * @instance
 */
export const getImageByID = new GetImageByIDController(imageRepo)
/**
 * Instance of Controller Class\
 * Controller that handles HTTP Requests with method GET on image /images
 *
 * @class GetAllMonitoredImagesController
 * @instance
 */
export const getAllImages = new GetAllImagesController(imageRepo)
/**
 * Instance of Controller Class\
 * Controller that handles HTTP Requests with method POST on image /images
 *
 * @class CreateMonitoredImageController
 * @instance
 */
export const createImage = new CreateImageController(imageRepo, userRepo)
/**
 * Instance of Controller Class\
 * Controller that handles HTTP Requests with method DEL on image /images/:id
 *
 * @class DeleteMonitoredImageController
 * @instance
 */
export const deleteImage = new DeleteImageController(imageRepo)
