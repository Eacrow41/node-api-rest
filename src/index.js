const express = require('express');
const app = express();
const morgan = require('morgan');

//senttings
//toma el puerto si esta definido en el servicio si no toma el 3000 por defecto
app.set('port', process.env.PORT || 3000)
app.set('json spaces', 2);

//middlewares
app.use(morgan('dev'));
// funciona para interpretar los datos que provienen desde la peticion se declara flase para que sean datos sencillos
//datos que vienen desde inputs
app.use(express.urlencoded({extended: false}));
app.use(express.json());


// routes
app.use(require('./routes/index'));
app.use('/api/movies', require('./routes/movies'));
app.use('/api/users', require('./routes/users'));


// starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`)
})