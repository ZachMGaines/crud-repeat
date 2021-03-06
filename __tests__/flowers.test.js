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

  it('finds all cars via GET', async () => {
    const lilly = await Flower.insert({
      name: 'lilly',
      price: 20,
      color: 'white'
    });

    const rose = await Flower.insert({
      name: 'rose',
      price: 40,
      color: 'black'
    });

    const daisy = await Flower.insert({
      name: 'daisy',
      price: 34,
      color: 'orange'
    });
    const res = await request(app).get('/api/v1/flowers');
    expect(res.body).toEqual([lilly, rose, daisy]);

  });

  it('updates flower via PUT', async () => {
    const flower = await Flower.insert({
      name: 'lilly',
      price: 40,
      color: 'white'
    });

    const newFlower = {
      name: 'lilly',
      price: 400,
      color: 'red'
    };

    const res = await request(app).put(`/api/v1/flowers/${flower.id}`).send(newFlower);
    expect(res.body).toEqual({ ...newFlower, id: 1 });

  });

  it('deletes a flower via DELETE', async () => {

    const flower = await Flower.insert({
      name: 'lilly',
      price: 450,
      color: 'blue'
    });
    const res = await request(app)
      .delete(`/api/v1/flowers/${flower.id}`)
      .send(flower);

    expect(res.body).toEqual(flower);

  });

});
