import type { Request, Response } from "express";
import { contactModel } from "../models/contact.model.ts";


export const createContact = async (req:Request, res:Response)=>{
    try{
        let newContact = await contactModel.create(req.body);
        res.status(201).json({
            success: true,
            message: "Contact Created"
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: "Error in creating contact"
        })
    }
}

export const getContacts = async (req: Request, res: Response) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const search = req.query.search as string;

        const skip = (page - 1) * limit;

        let query = {};

        if (search) {
            query = {
                $or: [
                    { name: { $regex: search, $options: "i" } },
                    { email: { $regex: search, $options: "i" } }
                ]
            };
        }

        const results = await contactModel
            .find(query)
            .skip(skip)
            .limit(limit);

        const total = await contactModel.countDocuments(query);

        res.status(200).json({
            results,
            paginationData:{
                total,
                page,
                totalPages: Math.ceil(total / limit)
            }
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch contacts"
        });
    }
};



export const updateContact = async (req:Request, res:Response) =>{
    let id =req.params.id;
    console.log(req.body, "Update Body")
    try{
        let updatedContact = await contactModel.findByIdAndUpdate(id, req.body);
        res.status(200).json({
            success: true,
            message: "Updated Successfully!"
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            succes: false,
            message: "Error in updating contact"
        })
    }
}

export const deleteContact = async (req:Request, res:Response) =>{
    let id = req.params.id;
    try{
        let deletedContact = await contactModel.findByIdAndDelete(id);
        return res.status(200).json({success: true, message: "Deleted Successfuly"})
    }catch(err){

    }
}

export const getSingleContact = async (req:Request, res:Response)=>{
    let id = req.params.id;
    try{
        let result = await contactModel.findById(id);
        if(!result){
            return res.status(404).json({
                success: false,
                message: "Contact Not Found!"
            })
        };
        return res.status(200).json({
            status: true,
            contact: result
        })
    }catch(err){
        return res.status(500).json({
            message: "Error in fetching Conact!"
        })
    }
}


