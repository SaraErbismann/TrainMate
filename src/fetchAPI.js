
export async function customersFetch() {
    console.log(import.meta.env.VITE_API_URL_CUSTOMERS);
    const response = await fetch(import.meta.env.VITE_API_URL_CUSTOMERS);
    const data = await response.json();
    return data
}


export async function trainingsFetch() {
    console.log(import.meta.env.VITE_API_URL_TRAININGS);
    const response = await fetch(import.meta.env.VITE_API_URL_TRAININGS);
    return await response.json();
}
