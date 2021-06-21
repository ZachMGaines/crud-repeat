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
  });
