import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface AstroPerson {
    placeOfBirth?: string;
    dateOfBirth: string;
    name: string;
    timeOfBirth?: string;
}
export interface PlanetPosition {
    planet: string;
    retrograde: boolean;
    sign: string;
    degree: number;
}
export interface PanchangDay {
    tithi: string;
    sunriseTime: string;
    yoga: string;
    moonsetTime: string;
    sunsetTime: string;
    dayNumber: bigint;
    moonriseTime: string;
    nakshatra: string;
    karana: string;
}
export type Time = bigint;
export interface DailyPlanetaryReport {
    insights: string;
    date: string;
    createdBy: Principal;
    timestamp: Time;
    positions: Array<PlanetPosition>;
}
export interface CompatibilityResult {
    isFavorable: boolean;
    score: number;
    person1: AstroPerson;
    person2: AstroPerson;
    timestamp: Time;
    details: string;
}
export interface backendInterface {
    addDailyReport(date: string, positions: Array<PlanetPosition>, insights: string): Promise<void>;
    getDailyReport(date: string): Promise<DailyPlanetaryReport>;
    getPanchangData(dayNumber: bigint): Promise<PanchangDay>;
    getRecentCompatibilities(limit: bigint): Promise<Array<CompatibilityResult>>;
    saveCompatibilityResult(person1: AstroPerson, person2: AstroPerson, score: number, details: string, isFavorable: boolean): Promise<void>;
}
