import { Trophy } from "./Trophy"

export interface Brand {
    brandId: number,
    name: string,
    logo: string,
    country: string,
    flag: string,
    totalwins: number,
    totalpodiums: number,
    totalpoints: number,
    userId: number
    trophiesCount? : Trophy[]
}