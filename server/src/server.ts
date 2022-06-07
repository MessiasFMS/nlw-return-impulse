import express from 'express';
import { routes } from './routes';
import cors from 'cors';

const app = express();

// GET, POST, PUT, PATCH , DELETE

// GET = Buscar Informações
// Post = Cadastrar Informações
// PUT = Atualizar informações de uma entidade
// Patch = Atualizar uma informção de uma unica entidade
// Delete = Deletar uma informação

app.use(cors());
app.use(express.json());
app.use(routes);


app.listen(process.env.PORT || 3333, () => {
  console.log('HTTP Server running!');
});