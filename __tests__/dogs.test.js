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

  it('finds all dogs via GET', async () => {
    const spacey = await Dog.insert({
      name: 'spacey',
      price: 500,
      color: 'black'
    });

    const lucy = await Dog.insert({
      name: 'lucy',
      price: 600,
      color: 'white'
    });

    const valerian = await Dog.insert({
      name: 'valerian',
      price: 800,
      color: 'brown'
    });
    const res = await request(app).get('/api/v1/dogs');
    expect(res.body).toEqual([spacey, lucy, valerian]);

  });

  it('updates car via PUT', async () => {
    const spacey = await Dog.insert({
      name: 'spacey',
      price: 500,
      color: 'black'
    });

    const newSpacey = {
      name: 'spacey',
      price: 1000,
      color: 'black and white'
    };

    const res = await request(app).put(`/api/v1/dogs/${spacey.id}`).send(newSpacey);
    expect(res.body).toEqual({ ...newSpacey, id: 1 });

  });

  it('deletes a dog via DELETE', async () => {

    const spacey = await Dog.insert({
      name: 'spacey',
      price: 500,
      color: 'black'
    });
    const res = await request(app)
      .delete(`/api/v1/dogs/${spacey.id}`)
      .send(spacey);

    expect(res.body).toEqual(spacey);

  });

});
