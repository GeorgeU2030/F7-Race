import { Brand } from "./Brand";
import { SeasonBrand } from "./SeasonBrand";
import { SeasonRace } from "./SeasonRace";

export interface Season {
    seasonId: number;
    edition: number;
    winnerId?: number;
    winner?: Brand;
    secondId?: number;
    second?: Brand;
    thirdId?: number;
    third?: Brand;
    races?: SeasonRace[];
    brands?: SeasonBrand[];
    userId: number;
}