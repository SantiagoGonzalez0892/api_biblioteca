const express = require('express');
const routerLibros = require('./routes/libros');
const errorHandler = require('./middlewares/errorHandler');


const app = express();


app.use(express.json());
app.use('/libros', routerLibros);
app.use(errorHandler);



app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});
