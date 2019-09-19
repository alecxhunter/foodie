import React from 'react';
import PropTypes from 'prop-types';
import Modal from './modal';

const NewRoomModal = props => {

    const handleChangeRoomName = (e) => {
        props.changeNewRoomProp('name', e.target.value);
    };

    return (
        <Modal
            showModal={props.showModal}
            onClose={props.onClose}
            onSave={props.onSave} >
            <h3>Add a New Room</h3>
            <label>Room Name
                <input type="text" className="form-control" placeholder="Room Name" value={props.newRoom.name} onChange={handleChangeRoomName} />
            </label>
        </Modal>    
    );
};

export default NewRoomModal;