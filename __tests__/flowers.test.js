import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Flower from '../lib/models/Flower.js';

describe('demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('CREATES a flower via POST', async () => {
    const res = await request(app)
      .post('/api/v1/flowers')
      .send({ name: 'lilly', price: 20, color: 'white' });
    expect(res.body).toEqual({ id: 1, name: 'lilly', price: 20, color: 'white' });
  });

  it('finds a flower via GET', async () => {
    const flower = await Flower.insert({
      name: 'lilly',
      price: 500,
      color: 'white'
    });
    const res = await request(app).get(`/api/v1/flowers/${flower.id}`);
    expect(res.body).toEqual(flower);
  });
});
