import TypeOccurence from "../types/TypeOccurence";
import IGeographicLocation from "./IGeographicLocation";

export default interface IOccurence {
    title: string,
    type: TypeOccurence,
    date: Date,
    geographicLocation: IGeographicLocation
}