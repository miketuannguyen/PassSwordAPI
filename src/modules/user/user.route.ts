import * as express from 'express';
import * as userController from './user.controller';
const router = express.Router();

router.get('/', (req, res) => {
    void userController.getList(req, res);
});

export default router;
