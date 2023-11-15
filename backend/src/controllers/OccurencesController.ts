import { Request, Response } from "express";
import IGeographicLocation from "../interfaces/IGeographicLocation";
import IOccurence from "../interfaces/IOccurrence";
import Occurence from "../models/Occurences";

const create = async (req: Request, res: Response) => {
    try {
        let occurence: IOccurence = req.body;
        
        let occurenceCreated  = await Occurence.create(occurence);

        let geographicLocation: IGeographicLocation = {type: occurenceCreated.geographicLocation.type, coordinates: occurenceCreated.geographicLocation.coordinates};

        occurence.title = occurenceCreated.title;
        occurence.type = occurenceCreated.type;
        occurence.date = occurenceCreated.date;
        occurence.geographicLocation = geographicLocation;

        return res.status(200).send(occurence);
    } catch (error: any) {
        res.status(501).send(error.message);
    }
}

export default {
    create
}