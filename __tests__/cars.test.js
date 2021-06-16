import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Car from '../lib/models/Car.js';

describe('demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('CREATES a car via POST', async () => {
    const res = await request(app)
      .post('/api/v1/cars')
      .send({ name: 'porsche', price: 250000, color: 'silver' });
    expect(res.body).toEqual({ id: 1, name: 'porsche', price: 250000, color: 'silver' });
  });
});