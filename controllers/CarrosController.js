const { Carro } = require('../models');
const { Op } = require("sequelize");

const Yup = require("yup");

// const Carros = require('../models/carros.json');

class CarrosController {
    async listarCarros(req, res) {
        /* Escrever toda a lógica de negócio */
        let carros = await Carro.findAll();
        console.log(carros);
        res.status(200).json(carros)
            // Carro.listar)
    }

    async listarCarrosMarca(req, res) {
        let marca = req.query.marca;
        try { 
            let carrosResposta = await Carro.findAll({
                where: {
                    marca: {
                        [Op.eq]: marca,
                    }
                }
            })

            if (!carrosResposta.length) {
                carrosResposta = {mensagem: "Carros não encontrado para marca: " + marca};
            }
            return res.status(200).json(carrosResposta);

        }
        catch (e) {
            return res.status(400).json({error: e.message});
        }
    }

    async listarCarro(req,res) {
        try {
            let carroResposta = await Carro.findByPk(req.params.id);
            if (!carroResposta) {
                carroResposta = {mensagem: "Carro não encontrado"};
            }
            return res.status(200).json(carroResposta);
        }
        catch (e) {
            return res.status(400).json({error: e.message});
        }
    }

    async inserirCarro(req,res) {
        /* Escrever lógica de negócio */
        const schema = Yup.object().shape({
            marca: Yup.string().required(),
            modelo: Yup.string().required(),
            anoFabricacao: Yup.number().positive().integer().min(1950),
            anoModelo: Yup.number().positive().integer().min(1950),
            cor: Yup.string().required(),
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({ error: 'Preencha todos os dados'})
        }
        
        try {
            let carroParaInserir = req.body;
            const carroResultado = await Carro.create(carroParaInserir);
            return res.status(200).json(carroResultado);
        }
        catch (err) {
            return res.status(400).json({error: err.message});
        }
    }

    async deletarCarro(req,res){
        try {
            let carroUpdate = await Carro.findByPk(req.params.id);
            if (carroUpdate) {
                await carroUpdate.destroy();
                return res.status(200).json({mensagem: "Carro deletado com sucesso"});
            }
            else {
                return res.status(400).json({mensagem: "Carro não encontrado"})
            }
        }
        catch(e) {
            return res.status(400).json({error: e.message});
        }
    }

    async atualizarCarro(req,res) {
        const schema = Yup.object().shape({
            anoFabricacao: Yup.number().positive().integer().min(1950),
            anoModelo: Yup.number().positive().integer().min(1950),
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({ error: 'Ano de Fabricação e Modelo devem ser maior que 1950'})
        }

        try {
            let carroUpdate = await Carro.findByPk(req.params.id);
            if (carroUpdate) {
                await carroUpdate.update(req.body);
                return res.status(200).json(carroUpdate);
            }
            else {
                return res.status(400).json({mensagem: "Carro não encontrado"})
            }
        }
        catch(e) {
            return res.status(400).json({error: e.message});
        }
    }

 
    
}

module.exports = new CarrosController();