import express from 'express';
import beersController from '../lib/controllers/beers.js';
import carsController from '../lib/controllers/cars.js';
import playersController from '../lib/controllers/players.js';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';


const app = express();

app.use(express.json());





app.use(beersController);
app.use(carsController);
app.use(playersController);




app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
