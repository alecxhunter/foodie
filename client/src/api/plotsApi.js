class PlotsApi {
    static getAllPlots() {
        const request = new Request('http://' + window.location.hostname + ':8085/plots', {
            method: 'GET'
        });
        return fetch(request).then(response => {
            return response.json();
        }).catch(error => {
            throw error
        });
    }

    static createPlot(plot) {
        const request = new Request('http://' + window.location.hostname + ':8085/plots', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(plot)
        })
        return fetch(request).then(response => {
            return response.json()
        }).catch(error => {
            throw error
        })
    }

    static updatePlot(plot) {
        const request = new Request('http://' + window.location.hostname + ':8085/plots/' + plot._id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(plot)
        })
        return fetch(request).then(response => {
            return response.json()
        }).catch(error => {
            return error
        })
    }

    static deletePlot(plot) {
        const request = new Request('http://' + window.location.hostname + ':8085/plots/' + plot._id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(plot)
        })
        return fetch(request).then(response => {
            return response.json()
        }).catch(error => {
            return error
        })
    }
}

export default PlotsApi;