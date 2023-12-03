import React from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const api = axios.create({
    baseURL: 'http://127.0.0.1:5000', //replacw with Flask API URL 
    // baseURL: 'https://nft-email-collector-api-806363e3ce7d.herokuapp.com/'
});

function DownloadEmailsButton() {
        const downloadEmails = async () => {
            const token = localStorage.getItem('jwt');
        if (!token) {
            throw new Error('No token found');
        }
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        const response = await api.get('/export-emails', config);
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'emails.csv'); // or any other extension
        document.body.appendChild(link);
        link.click();
    };

    return (
        <button disabled onClick={downloadEmails}><FontAwesomeIcon icon={faStar} />Export Email List</button>
    );
}

export default DownloadEmailsButton;
