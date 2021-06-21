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

  it('finds a player via GET', async () => {
    const player = await Player.insert({
      name: 'kobe bryant',
      team: 'lakers',
      age: 29
    });
    const res = await request(app).get(`/api/v1/players/${player.id}`);
    expect(res.body).toEqual(player);
  });

  it('finds all players via Get', async () => {
    const kobe = await Player.insert({
      name: 'kobe bryant',
      team: 'lakers',
      age: 29
    });

    const brady = await Player.insert({
      name: 'tom brady',
      team: 'new england',
      age: 35
    });

    const lebron = await Player.insert({
      name: 'lebron',
      team: 'cavaliers',
      age: 24
    });
    const res = await request(app).get('/api/v1/players');
    expect(res.body).toEqual([kobe, brady, lebron]);
  });

  it('updates player via PUT', async () => {
    const kobe = await Player.insert({
      name: 'kobe bryant',
      team: 'lakers',
      age: 29
    });
    const newKobe = {
      name: 'kobe bryant',
      team: 'lakers',
      age: 29
    };
    const res = await request(app).put(`/api/players/${kobe.id}`).send(newKobe);
    expect(res.body).toEqual({ ...newKobe, id: 1 });
  });
});
