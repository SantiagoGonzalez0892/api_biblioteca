const express = require('express');
const routerLibros = require('./routes/libros');
const errorHandler = require('./middlewares/errorHandler');
const { auth } = require('express-oauth2-jwt-bearer');



const autenticacion = auth({
  audience: "http://localhost:3000/api/productos",
  issuerBaseURL: "https://dev-utn-frc-iaew.auth0.com/",
  tokenSigningAlg: "RS256"
});



const app = express();


app.use(express.json());
app.use('/libros', autenticacion, routerLibros);
app.use(errorHandler);



app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});
