const express = require('express');
const cors = require('cors');

const loginRoute = require('./src/routes/loginRoute');
const usersRoute = require('./src/routes/usersRoute');
const productsRoute = require('./src/routes/productsRoute');
const imagesRoute = require('./src/routes/imagesRoute');
const salesRoute = require('./src/routes/salesRoute');
const errorMiddleware = require('./src/middleware/error');

const app = express();

app.use(cors());
app.use(express.json());

app.use(loginRoute);
app.use(usersRoute);
app.use(productsRoute);
app.use(imagesRoute);
app.use(salesRoute);

// código apenas para testes
// const usersModel = require('./src/models/usersModel');
// app.get('/', async (req,res)=>{
//     const allUsers = await usersModel.getAllUsers();
//     res.status(200).json(allUsers)
// })

app.use(errorMiddleware);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
});
