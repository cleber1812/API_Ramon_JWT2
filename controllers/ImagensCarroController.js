const { ImagensCarro } = require('../models');

//descobrir se estas duas vão no Index ou na Rota.
const path = require('path');
const cloudinary = require('../config/cloudinary');
const fs = require('fs');


class ImagensCarroController {

//Seguindo a aula de CELKE
    // async uploadImage(req,res) {
    //     // if (req.file === true){
    //     if (req.file){
    //         console.log (req.file)
    //         await ImagensCarro.create({image: req.file.filename})
    //         .then(() => {
    //             return res.json({
    //                 erro: false,
    //                 mensagem: "Upload realizado com sucesso"
    //             });
    //         })
    //         .catch(() => {
    //             return res.status(400).json({
    //                 erro: true, 
    //                 mensagem: "Erro: Falha no upload"
    //             });
    //         });            
    //     }
    //     return res.status(400).json({
    //         erro: true, 
    //         mensagem: "Erro: Falha no upload. Envie uma imagem jpg ou png."
    //     });                
    // }   

//Seguindo o modelo de Ramon *Tray Catch
    // async uploadImage(req,res) {
    //   if (req.file){
    //         console.log (req.file)
    //     try {
    //         let imagemParaInserir = {image: req.file.filename};
    //         const imagemResultado = await ImagensCarro.create(imagemParaInserir);
    //         return res.status(200).json(imagemResultado);
    //     }
    //     catch (err) {
    //         return res.status(400).json({error: err.message});
    //     }
    //   }
    //   return res.status(400).json({
    //      erro: true, 
    //      mensagem: "Erro: Falha no upload. Envie uma imagem jpg ou png."
    //   });
    // }

//Seguindo a aula de Cloudinary
    async uploadImage(req,res) {
        if (req.file){
            //   console.log (req.file)
            
            // const uploader = async (path) => await cloudinary.uploads(path, 'Images')
            const uploader = async (path) => await cloudinary.uploads(path, 'public/upload/carros')

            // const urls = []
            // const files = req.files

            // for (const file of files) {
            //     const { path } = file
            //     const newPath = await uploader(path)
            //     urls.push(newPath)
            //     fs.unlinkSync(path)
            // }

            const urls = []
            const file = req.file            
            const { path } = file
            const newPath = await uploader(path)
            urls.push(newPath)
            fs.unlinkSync(path)

            // console.log (newPath)

//Salvar o nome da imagem no DB
//Arquivos com caracteres especiais não gera ID e salva nome random ao invés do original.
//Consegui pegar o nome gerado pelo Cloudinary ao invés do filename do Body (newPath.id).
//Cloudinary Não passa a extensão da imagem no nome.       
//Resolvi a extensao com a library Mime no middlewares.

        // let imagemParaInserir = {image: req.file.filename};        
        // let imagemParaInserir = {image: newPath.id};
        // let imagemParaInserir = {image: newPath.id, body};
        const body = req.body;
        let imagemParaInserir = {image: newPath.id, marca:body.marca};
        // let carroParaInserir = req.body;
        // const imagemResultado = await ImagensCarro.create(imagemParaInserir, carroParaInserir);
        const imagemResultado = await ImagensCarro.create(imagemParaInserir);

        // console.log (newPath.id)         
        // console.log ({image: newPath.id})         
        console.log (imagemParaInserir)
        // console.log (carroParaInserir) 
            
            res.status(200).json({
                message:'Image uploaded succesfully',
                data: urls,
                body,
                imagemParaInserir,
                imagemResultado
            })           
        }else{
            res.status(405).json({
                err:'Image NOT uploaded succesfully',                
            })
        }        
    }

    // async listImage(req, res) {        
    //     let imagens = await ImagensCarro.findAll();
    //     console.log(imagens);
    //     res.status(200).json({
    //         imagens,
    //         // url: "http://localhost:3000/files/carros/"
    //         url: "http://res.cloudinary.com/dd6rpe5b4/image/upload/v1652446798/public/upload/carros/"
    //     })
    // }

    async listImage(req, res) {        
        await ImagensCarro.findAll()
        .then((imagens) => {
            return res.json({
                erro: false, 
                imagens,
                // url: "http://localhost:3000/files/carros/"
                url: "http://res.cloudinary.com/dd6rpe5b4/image/upload/v1652446798/public/upload/carros/"
            });

        }).catch(() => {
            return res.status(400).json({
                erro: true, 
                mensagem: "Imagens não encontradas"
            })
        })

        // res.status(200).json(imagens)
    }
    
}

module.exports = new ImagensCarroController();