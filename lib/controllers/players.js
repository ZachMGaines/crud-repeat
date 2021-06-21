import { Router } from 'express';
import Player from '../models/Player';

export default Router()
  .post('/api/v1/players', async (req, res) => {
    try {
      const player = await Player.insert(req.body);
      res.send(player);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })

  .get('/api/v1/players', async (req, res) => {
    try {
      const players = await Player.findAll();
      res.send(players);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })

  .get('/api/v1/players/:id', async (req, res) => {
    try {
      const players = await Player.findById(req.params.id);
      res.send(players);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });
