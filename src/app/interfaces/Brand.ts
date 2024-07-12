import { Trophy } from "./Trophy"

export interface Brand {
    brandId: number,
    name: string,
    logo: string,
    country: string,
    flag: string,
    totalWins: number,
    totalPodiums: number,
    totalPoints: number,
    totalChampions: number,
    userId: number
    trophiesCount? : Trophy[]
}