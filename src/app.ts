import express from 'express';
import centroRoutes from './routes.ts/centro.routes'

const app = express();

app.use(express.json());
app.use('/centros', centroRoutes);


export default app;