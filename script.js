// Load features from the JSON file
fetch('features.json')
    .then(response => response.json())
    .then(features => {
        const dropdown = document.getElementById('features-dropdown');
        const selectedFeaturesList = document.getElementById('selected-features');
        const progressBar = document.getElementById('progress-bar');
        const estimatedPriceEl = document.getElementById('estimated-price');

        let selectedFeatures = [];
        let estimatedPrice = 0;

        // Populate dropdown
        features.forEach(feature => {
            const option = document.createElement('option');
            option.value = feature.name;
            option.textContent = `${feature.name} ($${feature.price})`;
            dropdown.appendChild(option);
        });

        // Handle dropdown selection
        dropdown.addEventListener('change', () => {
            const selectedFeatureName = dropdown.value;
            const feature = features.find(f => f.name === selectedFeatureName);

            if (!selectedFeatures.includes(selectedFeatureName)) {
                selectedFeatures.push(selectedFeatureName);
                estimatedPrice += feature.price;

                // Add feature to the list
                const listItem = document.createElement('li');
                listItem.textContent = `${feature.name} - $${feature.price}`;
                selectedFeaturesList.appendChild(listItem);

                // Update progress bar and price
                progressBar.style.width = `${Math.min((estimatedPrice / 5000) * 100, 100)}%`;
                estimatedPriceEl.textContent = estimatedPrice;
            }
        });
    })
    .catch(error => console.error('Error loading features:', error));
