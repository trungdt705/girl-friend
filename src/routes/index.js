import express from 'express';
import favouriteRoutes from './favourite.route';

const router = express.Router();

router.use('/favourites', favouriteRoutes);

export default router;
