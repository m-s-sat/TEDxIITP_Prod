import { create } from 'zustand';

export const JOURNEY_THRESHOLD = 4000; // px of ruler drag needed to fully reveal the gallery

interface JourneyStore {
    rulerProgress: number; // 0 - 1, always derived from journeyDistance
    journeyDistance: number; // raw px dragged/scrolled on the footer ruler

    addJourneyDistance: (delta: number) => void;
    resetJourney: () => void;
}

export const useJourneyStore = create<JourneyStore>((set) => ({
    rulerProgress: 0,
    journeyDistance: 0,

    addJourneyDistance: (delta) =>
        set((state) => {
            const journeyDistance = Math.max(
                0,
                Math.min(JOURNEY_THRESHOLD, state.journeyDistance + delta)
            );
            return {
                journeyDistance,
                rulerProgress: journeyDistance / JOURNEY_THRESHOLD,
            };
        }),

    resetJourney: () =>
        set({
            rulerProgress: 0,
            journeyDistance: 0,
        }),
}));