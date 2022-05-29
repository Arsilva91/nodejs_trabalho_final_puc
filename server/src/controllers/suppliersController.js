import suppliers from "../models/Suppliers.js";

class SuppliersController{
    static listarSuppliers = (req, res) => {
        suppliers.find()
            .populate('tags')
            .exec((err, suppliers)=>{
                res.status(200).json(suppliers)
        })
    }
    static listarSuppliersPorTag = (req, res) => {
        const {tags} = req.query;        
        suppliers.find({'tags': tags})
            .populate('tags')
            .exec({}, (err, suppliers) => {
                if(err){
                    res.status(500).send({message: `${err.message} - falha ao consultar suppliers por tag.`})
                } else {
                    res.status(200).json(suppliers)
                }                
        })
    }
    static listarSuppliersPorLatitudeLongitude = (req, res) => {
        const {latitude, longitude} = req.query;        
        suppliers.find({'latitude': latitude, 'longitude':longitude})
            .populate('tags')
            .exec({}, (err, suppliers) => {
                if(err){
                    res.status(500).send({message: `${err.message} - falha ao consultar suppliers por localização.`})
                } else {
                    res.status(200).json(suppliers)
                }                
        })
    }
    static listarSuppliersPorId = (req, res) => {
        const {id} = req.params;
        suppliers.findById(id)
            .populate('tags')
            .exec((err, suppliers)=>{
            if(err){
                res.status(400).send({message: `${err.message} - Id do suppliers não localizado`})
            } else {
                res.status(200).json(suppliers);
            }
        })
    }
    static cadastrarSuppliers = (req, res)=>{
        let supplier = new suppliers(req.body);
        supplier.save((err)=> {
            if(err){
                res.status(500).send({message: `${err.message} - falha ao cadastrar o supplier.`})
            } else {
                res.status(201).send(supplier.toJSON())
            }
        })
    }
    static alterarSuppliers = (req, res) => {
        const {id} = req.params;
        suppliers.findByIdAndUpdate(id, {$set: req.body}, (err) =>{
            if(!err){
                res.status(200).send({message: "Suppliers atualizado com sucesso"})
            } else {
                res.status(500).send({message: err.message})
            }
        });
    }
    static excluirSuppliers = (req, res) => {
        const {id} = req.params;
        suppliers.findByIdAndDelete(id, (err) =>{
            if(!err){
                res.status(200).send({message: 'Suppliers excluido com sucesso.'})
            } else {
                res.status(500).send({message: err.message})
            }
        })
    }
}

export default SuppliersController;