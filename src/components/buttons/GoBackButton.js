import React from 'react';
import { useHistory } from 'react-router';
import './GoBackButton.css';

export const GoBackButton = () => {
    const history = useHistory();
    const handleGoBack = () => history.goBack();

    return (
        <button
            className="btn back-button"
            onClick={ handleGoBack }
        >
            <i className="fas fa-chevron-circle-left fa-lg"></i>
        </button>
    )
}
