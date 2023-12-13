import { Request, Response } from "express";
import IGeographicLocation from "../interfaces/IGeographicLocation";
import IOccurrence from "../interfaces/IOccurrence";
import Occurrence from "../models/Occurrences";
import redis from "../database/redis";

const create = async (req: Request, res: Response) => {
  try {
    let occurrence: IOccurrence = req.body;

    let occurrenceCreated = await Occurrence.create(occurrence);

    let geographicLocation: IGeographicLocation = {
      type: occurrenceCreated.geographicLocation.type,
      coordinates: occurrenceCreated.geographicLocation.coordinates,
    };

    occurrence.title = occurrenceCreated.title;
    occurrence.type = occurrenceCreated.type;
    occurrence.date = occurrenceCreated.date;
    occurrence.geographicLocation = geographicLocation;

    return res.status(201).send(occurrence);
  } catch (error: any) {
    res.status(501).send(error.message);
  }
};

const findAll = async (req: Request, res: Response) => {
  try {
    const allOccurrences = await Occurrence.find();

    res.status(200).send(allOccurrences);
  } catch (error: any) {
    res.status(400).send(error.message);
  }
};

const findById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const occurrence = await Occurrence.findById(id);

    if (occurrence) {
      return res.status(200).send(occurrence);
    }

    return res.status(404).send(`Occurrence not founded. Id: ${id}`);
  } catch (error: any) {
    res.status(400).send(error.message);
  }
};

const findTop3 = async (req: Request, res: Response) => {
  const keyWithTop3Occurrences = "top3";
  try {
    const cachedData = await redis.get(keyWithTop3Occurrences);

    if (cachedData) {
      return res.status(200).json(JSON.parse(cachedData));
    }

    const top3 = await Occurrence.aggregate([
      {
        $sortByCount: "$type",
      },
      {
        $limit: 3,
      },
      {
        $replaceWith: { type: "$_id", count: "$count" },
      },
    ]).then((r) => r);

    redis.setEx(keyWithTop3Occurrences, 60, JSON.stringify(top3));

    return res.status(200).json(top3);
  } catch (error: any) {
    res.status(400).send(error.message);
  }
};

const findByOccurrenceType = async (req: Request, res: Response) => {
  try {
    let occurrenceType = req.query.type;

    if (!occurrenceType) {
      return res.send("Type invalid");
    }

    let occurrences = await Occurrence.find({ type: occurrenceType });

    return res.status(200).send(occurrences);
  } catch (error: any) {
    res.status(400).send(error.message);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    let id = req.params.id;
    let occurrence: IOccurrence = req.body;

    let occurrenceWasUpdated = await Occurrence.updateOne(
      { _id: id },
      { $set: occurrence }
    );

    if (occurrenceWasUpdated.modifiedCount) {
      let occurrenceUpdated = await Occurrence.findById(id);
      return res.status(200).send(occurrenceUpdated);
    }

    return res.status(501).send("Occurrence don't updated :(");
  } catch (error: any) {
    res.status(400).send(error.message);
  }
};

const remove = async (req: Request, res: Response) => {
  try {
    let id = req.params.id;

    let occurrenceWasRemoved = await Occurrence.deleteOne({ _id: id });

    if (occurrenceWasRemoved.deletedCount) {
      return res.status(200).send("Occurrence were deleted!");
    }

    return res.status(404).send(`Occurrence not founded. Id: ${id}`);
  } catch (error: any) {
    res.status(400).send(error.message);
  }
};

export default {
  create,
  findAll,
  findByOccurrenceType,
  findById,
  findTop3,
  update,
  remove,
};
