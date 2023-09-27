import pickupPointModel from '../models/pickupModel.js'

export const getPickupPoints = async(req, res) =>{
    try {
        const pickupPoints = await pickupPointModel.find();
        res.send({
            message: 'Fetched pickup points',
            data: pickupPoints
        });
    } catch (error) {
        res.send({
            message: 'Error occured',
            data: error.message
        });
    }
}
export const getPickupPoint = async(req, res) =>{
    try {
        const pickupPoint = await pickupPointModel.findOne({_id : req.params.id});
        res.send({
            message: 'Fetched pickup point',
            data: pickupPoint
        });
    } catch (error) {
        res.send({
            message: 'Error occured',
            data: error.message
        })
    }
}
export const createPickupPoint = async(req, res) =>{
    try {
        const newPickupPoint = new pickupPointModel({
            location: req.body.location,
            name: req.body.name
        });
        let pickupPoint = await newPickupPoint.save();
        res.send({
            message: 'Created pickup point',
            data: pickupPoint
        })
    } catch (error) {
        res.send({
            message: 'Error occured',
            data: error.message
        })
    }
}
export const updatePickupPoint = async(req, res) =>{
    try {
        const pickupPoint = await pickupPointModel.findOne({_id: req.params.id});
        pickupPoint.location = req.body.location;
        pickupPoint.name = req.body.name;
        const newPickupPoint = await pickupPoint.save();
        res.send({
            message: 'Updated pickup point',
            data: newPickupPoint
        })
    } catch (error) {
        res.send({
            message: 'Error occured',
            data: error.message
        })
    }
}

export const deletePickupPoint = async(req, res)=>{
    try {
        await pickupPointModel.deleteOne({_id : req.params.id})
        res.send({
            message:'deleted pickup points'
        })
    } catch (error) {
        res.send({
            message: 'Error occured',
            data: error.message
        })
    }
}