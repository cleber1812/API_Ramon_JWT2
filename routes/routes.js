const { Router } = require('express');
const CarrosController = require('../controllers/CarrosController');
const PessoaController = require('../controllers/PessoaController');
const routes = Router();
const verificar = require ('../middlewares/autenticacao');

/* MIDDLEWARES */

// routes.get('/', (req,res) => {
//     res.statusCode = 200;
//     res.json({mensagem: "Hello World"});
// });

//ROTAS PESSOAS//

routes.get('/', (req,res) => {
    res.status(200).json({
        mensagem: "Hello World",
        // access_life: process.env.ACCESS_LIFE,
        // access_secret: process.env.ACCESS_SECRET
    });
})

routes.post('/login', PessoaController.login);

routes.post('/logout', (req,res) => {
    res.json({auth: false, token:null});
});

// routes.get('/pessoas', verificar(), PessoaController.readAll);
routes.get('/pessoas', PessoaController.readAll);
routes.post('/pessoas', PessoaController.create);
// routes.get('/meusdados', verificar(), PessoaController.myData)
routes.get('/meusdados', PessoaController.myData)

routes.get('/pessoa/:id', PessoaController.readOne);
routes.put('/pessoa/:id', PessoaController.update);
routes.delete('/pessoa/:id', PessoaController.delete);


//ROTAS CARROS//

routes.get('/carros', CarrosController.listarCarros);
routes.get('/carro/:id', CarrosController.listarCarro);
routes.get('/carros/marca', CarrosController.listarCarrosMarca);
routes.post('/carros', CarrosController.inserirCarro);
routes.put('/carro/:id', CarrosController.atualizarCarro);
routes.delete('/carro/:id', CarrosController.deletarCarro);


module.exports = routes;