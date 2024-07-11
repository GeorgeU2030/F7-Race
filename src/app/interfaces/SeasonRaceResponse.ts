import { SeasonBrand } from "./SeasonBrand";

export interface SeasonRaceResponse {
    seasonRaceId: number;
    seasonId: number;
    name: string;
    flagRace: string;
    laps: number;
    imageCircuit: string;
    firstPosition?: SeasonBrand;
    secondPosition?: SeasonBrand;
    thirdPosition?: SeasonBrand;
    fourthPosition?: SeasonBrand;
    fifthPosition?: SeasonBrand;
    sixthPosition?: SeasonBrand;
    seventhPosition?: SeasonBrand;
    eighthPosition?: SeasonBrand;
    ninthPosition?: SeasonBrand;
    tenthPosition?: SeasonBrand;
}