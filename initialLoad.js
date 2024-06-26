// Function to perform initial load
async function initialLoad() {
    const breedSelect = document.getElementById('breedSelect');
    const carousel = document.getElementById('carousel');
    const infoDump = document.getElementById('infoDump');

    try {
        // Fetch list of breeds from the Cat API using Axios
        const response = await axios.get('breeds');

        // Check if request was successful
        if (!response || !response.data || response.status !== 200) {
            throw new Error('Failed to fetch breeds');
        }

        const breeds = response.data;  // Extract data from response

        // Populate breed options
        breeds.forEach(breed => {
            const option = document.createElement('option');
            option.value = breed.id;
            option.textContent = breed.name;
            breedSelect.appendChild(option);
        });

        // Add event listener to breedSelect for breed selection
        breedSelect.addEventListener('change', async () => {
            const selectedBreedId = breedSelect.value;

            // Clear previous carousel items and infoDump
            carousel.innerHTML = '';
            infoDump.innerHTML = '';

            try {
                // Fetch information on the selected breed using Axios
                const breedResponse = await axios.get(`images/search?limit=5&breed_id=${selectedBreedId}`, {
                    onDownloadProgress: updateProgress  // Pass updateProgress function
                });

                // Check if request was successful
                if (!breedResponse || !breedResponse.data || breedResponse.status !== 200) {
                    throw new Error('Failed to fetch breed information');
                }

                const breedInfo = breedResponse.data;  // Extract data from response

                // Create carousel elements
                breedInfo.forEach(image => {
                    const carouselItem = document.createElement('div');
                    carouselItem.classList.add('carousel-item');
                    const img = document.createElement('img');
                    img.src = image.url;
                    img.alt = 'Cat Image';
                    carouselItem.appendChild(img);
                    carousel.appendChild(carouselItem);
                });

                // Fetch breed details from breeds list
                const breedData = breeds.find(breed => breed.id === selectedBreedId);

                // Create informational section in infoDump
                const infoTitle = document.createElement('h2');
                infoTitle.textContent = breedData.name;
                infoDump.appendChild(infoTitle);

                const description = document.createElement('p');
                description.textContent = breedData.description;
                infoDump.appendChild(description);

                const temperamentTitle = document.createElement('h3');
                temperamentTitle.textContent = 'Temperament:';
                infoDump.appendChild(temperamentTitle);

                const temperamentList = document.createElement('ul');
                breedData.temperament.split(', ').forEach(item => {
                    const temperamentItem = document.createElement('li');
                    temperamentItem.textContent = item;
                    temperamentList.appendChild(temperamentItem);
                });
                infoDump.appendChild(temperamentList);

            } catch (error) {
                console.error('Error fetching breed information:', error);
                // Handle error, e.g., display a message or fallback behavior
            }
        });

        // Initialize with the first breed in the list
        if (breeds.length > 0) {
            const initialBreedId = breeds[0].id;
            breedSelect.value = initialBreedId;
            breedSelect.dispatchEvent(new Event('change'));
        }

    } catch (error) {
        console.error('Error fetching breeds:', error);
        // Handle error, e.g., display a message or fallback behavior
    }
}

// Call initialLoad function immediately when script is executed
initialLoad();