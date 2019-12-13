import { expect } from 'chai';
import request from 'supertest';
import httpStatus from 'http-status';
import mocha, { it, beforeEach } from 'mocha';
import server from '../../index';
import Favourite from '../../models/favourite.model';

describe('Favourite API test', () => {
    const newFavourite = {
        title: 'Lẩu ếch',
        description: 'Lẩu ếch',
        link: ['http://link.com'],
        image: ['http://image.com'],
        address: 'Ha noi',
        note: 'not'
    };

    const listFavourite = [
        {
            title: 'Lẩu ếch',
            description: 'Lẩu ếch',
            link: ['http://link.com'],
            image: ['http://image.com'],
            address: 'Ha noi',
            note: 'note'
        },
        {
            title: 'Nhất nướng',
            description: 'Nhất nướng',
            link: ['http://nhatnuong.com'],
            image: ['http://imagenhatnnuong.com'],
            address: 'Ha noi',
            note: 'note'
        },
        {
            title: 'Lẩu hải sản',
            description: 'Lẩu hải sản',
            link: ['http://linklauhaisan.com'],
            image: ['http://imagelauhaisan.com'],
            address: 'Hai Duong',
            note: 'note'
        }
    ];
    beforeEach(async () => {
        try {
            await Favourite.deleteMany({});
            await Favourite.insertMany(listFavourite);
        } catch (error) {
            throw error;
        }
    });
    describe('#1: Post a favourite', () => {
        it('it should be return a favourite', () => {
            return request(server)
                .post('/favourites')
                .send(newFavourite)
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body.title).equal(newFavourite.title);
                });
        });
    });

    describe('#2: Get list favourite', () => {
        it('it should be return list favourite', () => {
            return request(server)
                .get('/favourites')
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body).to.be.an('array');
                    expect(res.body).to.have.lengthOf(3);
                });
        });
    });

    describe('#3: Get one favourite', () => {
        it('it should be return a favourite', async () => {
            const favourite = await Favourite.findOne({ title: 'Lẩu ếch' });
            return request(server)
                .get(`/favourites/${favourite._id}`)
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body).to.be.a('object');
                });
        });

        it('it should be return 404 status code', async () => {
            return request(server)
                .get(`/favourites/5df34146f171911623d28227`)
                .expect(httpStatus.NOT_FOUND);
        });
    });
});
