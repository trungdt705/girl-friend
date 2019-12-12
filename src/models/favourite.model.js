import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../utils/APIError';
const Schema = mongoose.Schema;

const { ObjectId } = mongoose.Types;

const favouriteSchema = new Schema(
    {
        title: String,
        description: String,
        address: String,
        links: [String],
        image: [String],
        note: String,
        category: ObjectId
    },
    {
        timestamps: true
    }
);

favouriteSchema.statics = {
    async get(id) {
        try {
            const favourite = await this.findById(id);
            if (!favourite) {
                throw new APIError({
                    status: httpStatus.NOT_FOUND,
                    message: 'not found'
                });
            }
            return favourite;
        } catch (error) {
            throw error;
        }
    },

    async list() {
        const favourites = await this.find();
        return favourites;
    }
};

const Favourite = mongoose.model('Favourites', favouriteSchema);

module.exports = Favourite;
