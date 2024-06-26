import { favourite } from 'favorite.js';
import { initialLoad} from 'initalLoad.js';
import axios from 'axios';

// Import Axios (assuming Axios is imported in index.js)
// Axios default configuration
axios.defaults.baseURL = 'https://api.thecatapi.com/v1/';
axios.defaults.headers.common['x-api-key'] = 'https://api.thecatapi.com/v1/';  // Replace with your actual API key

// Reference to progressBar element
const progressBar = document.getElementById('progressBar');

// Function to update progress bar width
function updateProgress(event) {
    // Calculate percentage completed
    const progress = (event.loaded / event.total) * 100;
    progressBar.style.width = `${progress}%`;

    // Log ProgressEvent object for understanding its structure
    console.log(event);
}

// Axios request interceptor to initialize progress bar and cursor
axios.interceptors.request.use(function (config) {
    // Reset progress bar to 0% for each request
    progressBar.style.width = '0%';
    // Set cursor to "progress" for the body element
    document.body.style.cursor = 'progress';
    return config;
}, function (error) {
    return Promise.reject(error);
});

// Axios response interceptor to handle progress bar and cursor
axios.interceptors.response.use(function (response) {
    // Complete progress bar when response is received
    progressBar.style.width = '100%';
    // Set cursor back to "default" for the body element
    document.body.style.cursor = 'default';
    return response;
}, function (error) {
    // Set cursor back to "default" for the body element on error
    document.body.style.cursor = 'default';
    return Promise.reject(error);
});



