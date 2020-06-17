require('should');

const request = require('supertest');
const mongoose = require('mongoose');

process.env.ENV = 'Test';

const app = require('../app.js');

const Book = mongoose.model('Book');
const agent = request.agent(app);

describe('Book Crud Test', () => {
    it('should allow a book to be posted and return read and _it', (done) => {
        const bookPost = {
            title: 'My Book',
            author: 'AKKA',
            genre: 'Fiction'
        };

        agent.post('/api/books').send(bookPost).expect(200).end((err, result) => {
            // console.log(result);
            result.body.read.should.not.equal('false');
            result.body.should.have.property("_id");
            done();
        })
    });

    afterEach((done) => {
        Book.deleteMany({}).exec();
        done();
    });

    after((done) => {
        mongoose.connection.close();
        app.server.close(done());
    })
});