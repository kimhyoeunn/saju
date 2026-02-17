import { Lunar, Solar } from 'lunar-javascript';
import { HEAVENLY_STEMS, EARTHLY_BRANCHES } from './constants';

export const calculateSaju = (year, month, day, hour, isLunar = false) => {
    let date;

    if (isLunar) {
        // Note: lunar-javascript interprets months 1-12. Simplified for this demo.
        // For a real robust app, we should handle leap months carefully.
        date = Lunar.fromYmd(year, month, day).getSolar();
    } else {
        date = Solar.fromYmd(year, month, day);
    }

    // Convert to Lunar to get the pillars (Gan-Ji)
    const lunarDate = date.getLunar();

    // Get pillars
    const yearPillar = lunarDate.getYearInGanZhi();
    const monthPillar = lunarDate.getMonthInGanZhi();
    const dayPillar = lunarDate.getDayInGanZhi();
    const timePillar = lunarDate.getTimeInGanZhi();

    return {
        yearPillar,
        monthPillar,
        dayPillar,
        timePillar,
        elements: analyzeElements(yearPillar, monthPillar, dayPillar, timePillar),
    };
};

const analyzeElements = (year, month, day, time) => {
    const allChars = [
        ...year.split(''),
        ...month.split(''),
        ...day.split(''),
        ...time.split(''),
    ];

    const elementCounts = {
        WOOD: 0,
        FIRE: 0,
        EARTH: 0,
        METAL: 0,
        WATER: 0,
    };

    allChars.forEach(char => {
        let element = HEAVENLY_STEMS[char] || EARTHLY_BRANCHES[char];
        if (element) {
            elementCounts[element]++;
        }
    });

    return elementCounts;
};
