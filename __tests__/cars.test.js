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

  it('finds a car via GET', async () => {
    const car = await Car.insert({
      name: 'viper',
      price: 450000,
      color: 'blue'
    });
    const res = await request(app).get(`/api/v1/cars/${car.id}`);
    expect(res.body).toEqual(car);
  });

  it('finds all cars via GET', async () => {
    const viper = await Car.insert({
      name: 'viper',
      price: 450000,
      color: 'blue'
    });

    const mclaren = await Car.insert({
      name: 'mclaren',
      price: 1000000,
      color: 'green'
    });

    const toyota = await Car.insert({
      name: 'toyota',
      price: 4000,
      color: 'black'
    });
    const res = await request(app).get('/api/v1/cars');
    expect(res.body).toEqual([viper, mclaren, toyota]);

  });

  it('updates car via PUT', async () => {
    const viper = await Car.insert({
      name: 'viper',
      price: 450000,
      color: 'blue'
    });
    const newViper = {
      name: 'viper',
      price: 400000,
      color: 'white'
    };
    const res = await request(app).put(`/api/v1/cars/${viper.id}`).send(newViper);
    expect(res.body).toEqual(newViper);
  });

});
