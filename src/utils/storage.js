const STORAGE_KEY = 'airbnb_saju_guests';

export const saveGuest = (guestData) => {
    try {
        const guests = getGuests();
        // Add logic to avoid exact duplicates or update existing?
        // For MVP, just add new entry with timestamp.
        const newGuest = {
            id: crypto.randomUUID(), // or Date.now()
            visitDate: new Date().toISOString(),
            ...guestData
        };

        const updatedGuests = [newGuest, ...guests];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedGuests));
        return newGuest;
    } catch (error) {
        console.error("Failed to save guest", error);
        return null;
    }
};

export const getGuests = () => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (error) {
        console.error("Failed to load guests", error);
        return [];
    }
};

export const searchGuests = (query) => {
    const guests = getGuests();
    if (!query) return guests;

    const lowerQuery = query.toLowerCase();
    return guests.filter(guest =>
        guest.name.toLowerCase().includes(lowerQuery) ||
        guest.birthDate.includes(query)
    );
};

export const clearGuests = () => {
    localStorage.removeItem(STORAGE_KEY);
};
