import { SpeakersData } from "@/data/speakers";
import { Speaker } from "@/types/speaker";

const delay = (msec: number) => new Promise(resolve => {
    setTimeout(resolve, msec);
});

const currYear = "2026";

export const speakerServices = {
    getCurrentSpeakers: async (): Promise<Speaker[]> => {
        await delay(2000);
        return SpeakersData.filter((person) => person.year.toString() == currYear)
    },
    getPastSpeakers: async (): Promise<Speaker[]> => {
        await delay(2000);
        return SpeakersData.filter((person) => person.year.toString()  != currYear)
    },
    getSpeakersByYear: async (year: string): Promise<Speaker[]> => {
        await delay(2000);
        return SpeakersData.filter((person) => person.year.toString()  == year)
    },
    getSpeakers: async (): Promise<Speaker[]> => {
        await delay(2000);
        return SpeakersData;
    },
    getSpeakersByName: async (name: string): Promise<Speaker[]> => {
        await delay(2000);
        return SpeakersData.filter((person) => person.name.toLowerCase().includes(name.toLowerCase()));
    }
}
