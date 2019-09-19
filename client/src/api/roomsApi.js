class RoomApi {
    static getAllRooms() {
        const request = new Request('http://' + window.location.hostname + ':8085/rooms', {
            method: 'GET'
        })

        return fetch(request).then(response => {
            return response.json()
        }).catch(error => {
            return error
        })
    }

    static create(room) {
        console.log('roomsApi.create')
        const request = new Request('http://' + window.location.hostname + ':8085/rooms', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(room)
        })
        return fetch(request).then(response => {
            return response.json()
        }).catch(error => {
            return error
        })
    }

    static updateRoom(room) {
        console.log('roomsApi.updateRoom')
        const request = new Request('http://' + window.location.hostname + ':8085/rooms/' + room._id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(room)
        })
        return fetch(request).then(response => {
            return response.json()
        }).catch(error => {
            return error
        })
    }
}

export default RoomApi;