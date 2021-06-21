import { Router } from 'express';
import Flower from '../models/Flower';

export default Router()
  .post('/api/v1/flowers', async (req, res) => {
    try {
      const flower = await Flower.insert(req.body);
      res.send(flower);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })

  .get('/api/v1/flowers/:id', async (req, res) => {
    try {
      const flower = await Flower.findById(req.params.id);
      res.send(flower);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })

  .get('/api/v1/flowers', async (req, res) => {
    try {
      const flowers = await Flower.findAll();
      res.send(flowers);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })

  .put('/api/v1/flowers/:id', async (req, res) => {
    try {
      const flower = await Flower.update(req.body, req.params.id);
      res.send(flower);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })

  .delete('/api/v1/flowers/:id', async (req, res) => {
    try {
      const flower = await Flower.delete(req.params.id);
      res.send(flower);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });
