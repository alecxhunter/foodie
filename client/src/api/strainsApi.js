class StrainsApi {
    static getAllStrains() {
        const request = new Request('http://' + window.location.hostname + ':8085/strains', {
            method: 'GET'
        });
        return fetch(request).then(response => {
            return response.json();
        }).catch(error => {
            throw error
        });
    }

    static createStrain(strain) {
        const request = new Request('http://' + window.location.hostname + ':8085/strains', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(strain)
        })
        return fetch(request).then(response => {
            return response.json()
        }).catch(error => {
            throw error
        })
    }

    static updateStrain(strain) {
        const request = new Request('http://' + window.location.hostname + ':8085/strains/' + strain._id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(strain)
        })
        return fetch(request).then(response => {
            return response.json()
        }).catch(error => {
            return error
        })
    }
}

export default StrainsApi;