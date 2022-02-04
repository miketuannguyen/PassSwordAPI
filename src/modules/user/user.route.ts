import * as express from 'express';
import { authentication } from '../../middleware';
import { ROUTES } from '../../utils';
import * as userController from './user.controller';

const router = express.Router();

router.post(ROUTES.USER.LOGIN, (req, res) => {
    void userController.login(req, res);
});

router.get(ROUTES.USER.PROFILE, authentication.tokenVerifier, userController.getProfile);

export default router;
