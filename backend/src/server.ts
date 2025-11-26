import express from 'express';

import dotenv from 'dotenv';
import InstituicaoRoutes from './routes/InstituicaoRoutes.ts';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('API está rodando com sucesso!');
});

app.use('/instituicoes', InstituicaoRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});