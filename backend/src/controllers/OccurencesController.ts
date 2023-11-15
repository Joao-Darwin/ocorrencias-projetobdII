import { Request, Response } from "express";
import IGeographicLocation from "../interfaces/IGeographicLocation";
import IOccurence from "../interfaces/IOccurrence";
import Occurence from "../models/Occurences";
import TypeOccurence from "../types/TypeOccurence";

const create = async (req: Request, res: Response) => {
    try {
        let occurence: IOccurence = req.body;
        
        let occurenceCreated  = await Occurence.create(occurence);

        let geographicLocation: IGeographicLocation = {type: occurenceCreated.geographicLocation.type, coordinates: occurenceCreated.geographicLocation.coordinates};

        occurence.title = occurenceCreated.title;
        occurence.type = occurenceCreated.type;
        occurence.date = occurenceCreated.date;
        occurence.geographicLocation = geographicLocation;

        return res.status(201).send(occurence);
    } catch (error: any) {
        res.status(501).send(error.message);
    }
}

const findAll = async (req: Request, res: Response) => {
    try {
        const allOccurences = await Occurence.find();

        res.status(200).send(allOccurences);
    } catch (error: any) {
        res.status(400).send(error.message);
    }
}

const findById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        const occurence = await Occurence.findById(id);

        if(occurence) {
            return res.status(200).send(occurence);
        }

        return res.status(404).send(`Occurence not founded. Id: ${id}`);
    } catch (error: any) {
        res.status(400).send(error.message);
    }
}

const findByOccurenceType = async (req: Request, res: Response) => {
    try {
        let occurenceType = req.query.type;
        console.log(occurenceType);

        if(!occurenceType) {
            return res.send("Type invalid");
        }

        let occurences = await Occurence.find({type: occurenceType});

        return res.status(200).send(occurences);
    } catch (error: any) {
        res.status(400).send(error.message);
    }
}

const update = async (req: Request, res: Response) => {
    try {
        let id = req.params.id;
        let occurence: IOccurence = req.body;

        let occurenceWasUpdated = await Occurence.updateOne({_id: id}, {$set: occurence});

        if(occurenceWasUpdated.modifiedCount) {
            let occurenceUpdated = await Occurence.findById(id);
            return res.status(200).send(occurenceUpdated);
        }

        return res.status(501).send("Occurence don't updated :(");
    } catch (error: any) {
        res.status(400).send(error.message);
    }
}

const remove = async (req: Request, res: Response) => {
    try {
        let id = req.params.id;

        let occurenceWasRemoved = await Occurence.deleteOne({_id: id});

        if(occurenceWasRemoved.deletedCount) {
            return res.status(200).send("Occurence were deleted!");
        }

        return res.status(404).send(`Occurence not founded. Id: ${id}`);
    } catch (error: any) {
        res.status(400).send(error.message);
    }
}

export default {
    create,
    findAll,
    findByOccurenceType,
    findById,
    update,
    remove
}