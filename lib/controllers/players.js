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
  })

  .put('/api/v1/players/:id', async (req, res) => {
    try {
      const player = await Player.update(req.body, req.params.id);
      res.send(player);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })

  .delete('/api/v1/players/:id', async (req, res) => {
    try {
      const player = await Player.delete(req.params.id);
      res.send(player);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });
