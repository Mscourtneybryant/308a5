// Function to toggle favorite status
async function favourite(imageId, isFavourite) {
    const API_URL = 'https://api.thecatapi.com/v1/favourites';
    const headers = {
        'Content-Type': 'application/json',
        'x-api-key': 'your-api-key'  // Replace with your actual API key
    };

    try {
        if (isFavourite) {
            // If already favorited, delete the favorite
            await axios.delete(`${API_URL}/${imageId}`, { headers });
            console.log(`Removed favorite for image ${imageId}`);
        } else {
            // If not favorited, add the favorite
            const data = { image_id: imageId };
            await axios.post(API_URL, data, { headers });
            console.log(`Added favorite for image ${imageId}`);
        }

        // Optionally, you can handle UI updates or other logic after favoriting/unfavoriting
        // For example, updating a heart icon UI

    } catch (error) {
        console.error('Error toggling favorite:', error);
        // Handle error, e.g., display a message or fallback behavior
    }
}

export default favourite;
