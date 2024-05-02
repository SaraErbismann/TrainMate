
//CUSTOMERS

export const fetchCustomers = async () => {
    const response = await fetch(import.meta.env.VITE_API_URL_CUSTOMERS);
    if (!response.ok) {
        throw new Error("Error in fething data: " + response.statusText);
    } else {
        return response.json();
    }
}

export const fetchTrainingsWithCustomers = async () => {
    const response = await fetch(import.meta.env.VITE_API_URL_TRAININGS_CUST);
    if (!response.ok) {
        throw new Error("Error in fething data: " + response.statusText);
    } else {
        return response.json();
    }
}

export const handleAddCustomers = (newCustomer) => {
    fetch(import.meta.env.VITE_API_URL_CUSTOMERS, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCustomer)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Error when adding a new customer: " + response.statusText);
            } else {
                return response.json();
            }
        })
}

export const handleUpdateCustomers = (url, newData) => {
    fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Error when updating customer info: " + response.statusText);
            } else {
                return response.json();
            }
        })
}

export const handleDeleteCustomers = (url) => {
    if (window.confirm("Are you sure you want to delete?")) {
        fetch(url, { method: 'DELETE' })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error when deleting customer: " + response.statusText);
                } else {
                    return response.json();
                }
            })
    }

}

// TRAININGS
export const handleAddTrainingToCustomer = (newTraining) => {
    fetch(import.meta.env.VITE_API_URL_TRAININGS, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTraining)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Error when adding training to a customer: " + response.statusText);
            } else {
                return response.json();
            }
        })
}

export const handleDeleteTraining = (url) => {
    if (window.confirm("Are you sure you want to delete?")) {
        fetch(url, { method: 'DELETE' })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error when deleting customer: " + response.statusText);
                } else {
                    return response.json();
                }
            })
    }

}