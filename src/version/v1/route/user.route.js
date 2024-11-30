
import {Router} from 'express';

import Validation from '../../../middleware/validation.js';
import VALIDATE from '../../../validate.js';

const userRoute = Router();

userRoute.post('/login', Validation(VALIDATE.USERLOGIN), (req, res) => {
    res.status(200).json({success: true, message: 'User login successfully'});
});


export default userRoute;