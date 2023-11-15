import { Schema, Model } from "mongoose"
import IOccurence from "../interfaces/IOccurrence";
import IGeographicLocation from "../interfaces/IGeographicLocation";

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

export default new Model("Occurence", occurencesSchema);