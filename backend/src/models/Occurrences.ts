import { Schema, model } from "mongoose";
import IGeographicLocation from "../interfaces/IGeographicLocation";
import IOccurrence from "../interfaces/IOccurrence";

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

const occurrencesSchema = new Schema<IOccurrence>({
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ["Assalto", "Furto", "Assassinato", "Tentativa de Homicídio", "Outros"],
        required: true,
    },
    date: {
        type: Date,
        required: true
    },
    geographicLocation: pointSchema
})

const Occurrence = model<IOccurrence>("Occurrence", occurrencesSchema);

export default Occurrence;