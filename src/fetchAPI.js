/*
This file contains React queries. URLs are stores in .env
*/

//Customer data
export async function customersFetch() {
    const response = await fetch(import.meta.env.VITE_API_URL_CUSTOMERS);
    const data = await response.json();
    return data
}

//TRaining data, no customer info
export async function trainingsFetch() {
    const response = await fetch(import.meta.env.VITE_API_URL_TRAININGS);
    const trainData = await response.json();
    return trainData
}

//Training data with customer info
export async function trainingsCustFetch() {
    const response = await fetch(import.meta.env.VITE_API_URL_TRAININGS_CUST);
    const trainCustData = await response.json();
    return trainCustData
}