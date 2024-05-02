/*
This file contains React queries. URLs are stores in .env
*/

export const getCustomers = () => {
    return fetch(import.meta.env.VITE_API_URL_CUSTOMERS)
        .then(response => {
            if (!response.ok) {
                throw new Error("Error in fething data: " + response.statusText);
            } else {
                return response.json();
            }
        })
}

export const getTrainingsWithCustomers = () => {
    return fetch(import.meta.env.VITE_API_URL_TRAININGS_CUST)
        .then(response => {
            if (!response.ok) {
                throw new Error("Error in fething data: " + response.statusText);
            } else {
                return response.json();
            }
        })
}

