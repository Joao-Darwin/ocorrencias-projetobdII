import { Schema, model } from "mongoose";
import IGeographicLocation from "../interfaces/IGeographicLocation";
import IOccurence from "../interfaces/IOccurrence";

const pointSchema = new Schema<IGeographicLocation>({
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  });

const occurencesSchema = new Schema<IOccurence>({
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true
    },
    geographicLocation: pointSchema
})

const Occurence = model<IOccurence>("Occurence", occurencesSchema);

export default Occurence;