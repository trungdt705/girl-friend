import express from 'express';
import controller from '../controllers/favourite.controller';

const router = express.Router();

router.param('favouriteId', controller.load);

router.route('/:favouriteId').get(controller.get);

router
    .route('/')
    .get(controller.list)
    .post(controller.create);

module.exports = router;
