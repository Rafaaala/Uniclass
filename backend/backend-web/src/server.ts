import express from 'express';
import dotenv from 'dotenv';
import InstituicaoRoutes from './routes/InstituicaoRoutes.ts';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const staticPath = "C:/dev/NodeJs/Uniclass/backend/backend-web/frontend/scr";
app.use(express.static(staticPath))

app.get('/', (req, res) => {
    res.redirect('/home/home.html');
});

app.use('/instituicoes', InstituicaoRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});