import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Dog from '../lib/models/Dog.js';

describe('demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('CREATES a dog via POST', async () => {
    const res = await request(app)
      .post('/api/v1/dogs')
      .send({ name: 'spacey', price: 500, color: 'black' });
    expect(res.body).toEqual({ id: 1, name: 'spacey', price: 500, color: 'black' });
  });

  it('finds a dog via GET', async () => {
    const dog = await Dog.insert({
      name: 'spacey',
      price: 500,
      color: 'black'
    });
    const res = await request(app).get(`/api/v1/dogs/${dog.id}`);
    expect(res.body).toEqual(dog);
  });

});
