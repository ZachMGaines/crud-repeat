import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Player from '../lib/models/Player.js';


describe('demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a player via POST', async () => {
    const res = await request(app)
      .post('/api/v1/players')
      .send({ name: 'kobe bryant', team: 'lakers', age: 29 });
    expect(res.body).toEqual({ id: 1, name: 'kobe bryant', team: 'lakers', age: 29 });
  });


});
