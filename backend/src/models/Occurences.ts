import { Schema, Model } from "mongoose"
import IOccurence from "../interfaces/IOccurrence";

const occurencesShema = new Schema<IOccurence>({
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
    geographicLocation: {
        type: Location,
        require: true
    }
})

export default new Model("Occurence", occurencesShema);