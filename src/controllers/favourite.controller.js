import Favourite from '../models/favourite.model';
import { handler as errorHandler } from '../utils/error';
import { client } from '../config/redis';

exports.load = async (req, res, next, id) => {
    try {
        let favourite = await client.getAsync(`favourite:${id}`);
        if (!favourite) {
            favourite = await Favourite.get(id);
            client.setAsync(`favourite:${id}`, JSON.stringify(favourite));
        }
        req.locals = req.locals ? req.locals : {};
        const parseFavourite = JSON.parse(favourite);
        req.locals.favourite = parseFavourite;
        next();
    } catch (error) {
        console.log(error);

        errorHandler(error, req, res, next);
    }
};

exports.list = async (req, res, next) => {
    try {
        const favourite = await Favourite.list();
        res.json(favourite);
    } catch (error) {
        errorHandler(error, req, res, next);
    }
};

exports.get = (req, res) => res.json(req.locals.favourite);

exports.create = async (req, res, next) => {
    try {
        const favourite = new Favourite({
            title: req.body.title,
            description: req.body.description
        });
        const savedFavourite = await favourite.save();
        res.json(savedFavourite);
    } catch (error) {
        errorHandler(error, req, res, next);
    }
};
