import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Modal = (props) => {
    const handleBackgroundClick = (e) => {
        if (e.target === e.currentTarget) props.onClose();
    };

    var classes = classNames({
        'modal-wrapper': true,
        'hide': !props.showModal
    });

    return (
        <div className={classes} onClick={handleBackgroundClick}>
            <div className="modal-div">
                <header>
                    <button onClick={props.onClose}>Close</button>
                </header>
                <section>
                    {props.children}
                </section>
                { props.onSave ? 
                    <footer>
                        <button className="btn btn-primary" onClick={props.onSave}>Save</button>
                    </footer> 
                    : '' 
                }
            </div>
        </div>
    );
};

Modal.propTypes = {
    showModal: PropTypes.bool,
    onClose: PropTypes.func,
    onSave: PropTypes.func,
    children: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.element,
        PropTypes.string
    ]).isRequired
};

export default Modal;