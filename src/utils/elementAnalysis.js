import { FIVE_ELEMENTS } from './constants';

export const getAdvice = (elementCounts) => {
    // Find the element with the minimum count
    // If multiple extract all.

    let minCount = Infinity;
    Object.values(elementCounts).forEach(count => {
        if (count < minCount) minCount = count;
    });

    const lackingElementsKey = Object.keys(elementCounts).filter(key => elementCounts[key] === minCount);

    // Mapping keys to advice objects
    const recommendations = lackingElementsKey.map(key => {
        return {
            elementKey: key,
            ...FIVE_ELEMENTS[key]
        };
    });

    return recommendations;
};
