import tags from "../models/Tag.js";

class TagController{
    static listarTags = (req, res) => {
        tags.find((err, tags)=>{
            res.status(200).json(tags)
        })    
    }
    static listarLivrosPorTag = (req, res) => {
        const {tag} = req.query;        
        tags.find({'tag': tag}, {}, (err, tags) => {
            if(err){
                res.status(500).send({message: `${err.message} - falha ao consultar tag.`})
            } else {
                res.status(200).json(tags)
            }                
        })
    }
    static listarTagPorId = (req, res) => {
        const {id} = req.params;
        tags.findById(id,(err, tags)=>{
            if(err){
                res.status(400).send({message: `${err.message} - Id da tag não localizado`})
            } else {
                res.status(200).json(tags);
            }
        })    
    }
    static cadastrarTag = (req, res)=>{
        let tag = new tags(req.body);
        tag.save((err)=> {
            if(err){
                res.status(500).send({message: `${err.message} - falha ao cadastrar o tag.`})
            } else {
                res.status(201).send(tag.toJSON())
            }
        })
    }
    static alterarTag = (req, res) => {        
        const {id} = req.params;        
        tags.findByIdAndUpdate(id, {$set: req.body}, (err) =>{
            if(!err){
                res.status(200).send({message: "Tag atualizado com sucesso"})
            } else {
                res.status(500).send({message: err.message})
            }
        });
    }
    static excluirTag = (req, res) => {
        const {id} = req.params;
        tags.findByIdAndDelete(id, (err) =>{
            if(!err){
                res.status(200).send({message: 'Tag excluido com sucesso.'})
            } else {
                res.status(500).send({message: err.message})
            }
        })
    }
}

export default TagController;