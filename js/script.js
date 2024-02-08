document.addEventListener('DOMContentLoaded', function () {
    const apiKey = 'f8ca42e7-fbb6-44ab-a863-8a7ad9bf3a08';
    const countryDropdown = document.getElementById('countryDropdown');
    const holidayTable = document.getElementById('holidayTable');

    
    fetchCountries(apiKey)
        .then(countries => {
            populateCountryDropdown(countries);
        })
        .catch(error => {
            console.error('Error fetching countries:', error);
        });

   
    countryDropdown.addEventListener('change', function () {
        const selectedCountryCode = countryDropdown.value;
        const apiUrl = `https://holidayapi.com/v1/holidays?key=${apiKey}&country=${selectedCountryCode}&year=2023`;

       
        fetchData(apiUrl)
            .then(data => {
                displayHolidayDetails(data.holidays);
            })
            .catch(error => {
                console.error('Error fetching holiday data:', error);
            });
    });

   
    function fetchCountries(apiKey) {
        const apiUrl = `https://holidayapi.com/v1/countries?key=${apiKey}`;
        return new Promise((resolve, reject) => {
            fetch(apiUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    resolve(data.countries);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    function populateCountryDropdown(countries) {
        const options = countries.map(country => `<option value="${country.code}">${country.name}</option>`);
        countryDropdown.innerHTML = options.join('');
    }

 
    function fetchData(url) {
        return new Promise((resolve, reject) => {
            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    resolve(data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }


    function displayHolidayDetails(holidays) {
        const tableHeaders = `
            <tr>
                <th>S.No</th>
                <th>Holiday Name</th>
                <th>Date</th>
            </tr>
        `;

        const tableRows = holidays.map((holiday, index) => {
            return `
                <tr>
                    <td>${index + 1}</td>
                    <td>${holiday.name}</td>
                    <td>${holiday.date}</td>
                </tr>
            `;
        }).join('');

        holidayTable.innerHTML = tableHeaders + tableRows;
    }
});