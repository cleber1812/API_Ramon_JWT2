const Yup = require('yup');

// import * as Yup from 'yup';

const { Pessoa } = require ('../models/');
const { Op } = require("sequelize");
const jwt = require('jsonwebtoken');

class PessoaController {

    /* CRUD */

    async myData(req,res) {
        //console.log(req.userId)
        /* ID do Usuário está em : req.userId */
        try {
            const pessoa_encontrada = await Pessoa.findByPk(req.userId);
            if (pessoa_encontrada)
               return res.status(200).json(pessoa_encontrada)
            else
               return res.status(200).json({mensagem: "Pessoa não encontrada, erro"});
        }
        catch(e) {
            return res.status(400).json({error: e.message});
        }
        res.status(200).json({req: req.headers});
    }

    async login(req,res) {
        let email = req.body.email;
        let senha = req.body.senha;

        try {
            const pessoa_encontrada = await Pessoa.findOne({
                attributes: ['id','nome', 'email','createdAt','updatedAt'],
                where: {
                    [Op.and]: [
                        { 
                            email: {
                            [Op.eq]: email,
                            }
                        }, 
                        {                       
                            senha: {
                                [Op.eq]: senha,
                            }                  
                        }      
                    ]
                }
            }); 

            if (pessoa_encontrada) {
                const token = jwt.sign(
                    {id: pessoa_encontrada.id},
                    process.env.ACCESS_SECRET, {
                    expiresIn: 1500
                });

                return res.status(200).json({
                    auth: true,
                    token: token,
                    nome: pessoa_encontrada.nome, email,
                });  
            }                
            else 
                return res.status(200).json({mensagem: "Usuário ou senha inválido"})                     
        }
        catch(e) {
            return res.status(400).json({error: e.message});
        }
    }

    async create(req,res) { /* POST */
        const schema = Yup.object().shape({
            email: Yup.string().email().required(),
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({ error: 'Falha na validação.'})
        }

        try {
            const pessoa = await Pessoa.create(req.body);
            return res.status(200).json(pessoa);
        }
        catch (e) {
            return res.status(200).json({error: e});
        }
    }

    async readAll(req,res) { /* GET ALL */
        try {
            const pessoas = await Pessoa.findAll({
                attributes: ['id','nome', 'email','createdAt','updatedAt']
            }); /* SEQUELIZE findAll */
            return res.status(200).json(pessoas)            
        }
        catch(e) {
            return res.status(400).json({error: e.message});
        }
    }

    async readOne(req,res) { /* GET ONE */
        try {
            let pessoaResposta = await Pessoa.findByPk(req.params.id);
            if (!pessoaResposta) {
                pessoaResposta = {mensagem: "Pessoa não encontrada"};
            }
            return res.status(200).json(pessoaResposta);
        }
        catch (e) {
            return res.status(400).json({error: e.message});
        }

    }

    async update(req,res) { /* PUT */
        try {
            let pessoaUpdate = await Pessoa.findByPk(req.params.id);
            if (pessoaUpdate) {
                await pessoaUpdate.update(req.body);
                return res.status(200).json(pessoaUpdate);
            }
            else {
                return res.status(400).json({mensagem: "Pessoa não encontrada"})
            }
        }
        catch(e) {
            return res.status(400).json({error: e.message});
        }

    }

    async delete(req,res) { /* DELETE */
        try {
            let pessoaUpdate = await Pessoa.findByPk(req.params.id);
            if (pessoaUpdate) {
                await pessoaUpdate.destroy();
                return res.status(200).json({mensagem: "Pessoa deletada com sucesso"});
            }
            else {
                return res.status(400).json({mensagem: "Pessoa não encontrado"})
            }
        }
        catch(e) {
            return res.status(400).json({error: e.message});
        }

    }
}

module.exports = new PessoaController();