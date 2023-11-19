import TypeOccurrence from "../types/TypeOccurrence";
import IGeographicLocation from "./IGeographicLocation";

export default interface IOccurrence {
    title: string,
    type: TypeOccurrence,
    date: Date,
    geographicLocation: IGeographicLocation
}