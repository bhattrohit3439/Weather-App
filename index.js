const container = document.querySelector('.container');
const search = document.querySelector('.search-box');
const error = document.querySelector('.error');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');

search.addEventListener('click', () => {
	const key = '8ccbb2fdc9bd2476ac3aa2c503a28cc1';
	const city = document.querySelector('.search-box input').value;

	if (city === '') return;

	fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`)
		.then((response) => response.json())
		.then((json) => {
			if (json.cod === '404') {
				container.style.height = '605px';
				weatherBox.style.display = 'none';
				weatherDetails.style.display = 'none';
				error.style.display = 'block';
				return;
			}
			error.style.display = 'none';

			const img = document.querySelector('.weather-box img');
			const temperature = document.querySelector('.weather-box .temperature');
			const description = document.querySelector('.weather-box .description');
			const humidity = document.querySelector('.weather-details .humidity span');
			const windSpeed = document.querySelector('.weather-details .wind-speed span');

			switch (json.weather[0].main) {
				case 'Clear':
					img.src = '/Weather-App/img/clear.png';
					break;
				case 'Clouds':
					img.src = '/Weather-App/img/cloud.png';
					break;
				case 'Haze':
					img.src = '/Weather-App/img/mist.png';
					break;
				case 'Rain':
					img.src = '/Weather-App/img/rain.png';
					break;
				case 'Snow':
					img.src = '/Weather-App/img/snow.png';
					break;

				default:
					img.src = '';
					break;
			}

			temperature.innerHTML = `${json.main.temp}<span>&degC<span>`;
			description.innerHTML = `${json.weather[0].description}`;
			humidity.innerHTML = `${json.main.humidity}%`;
			windSpeed.innerHTML = `${json.wind.speed} Km/h`;

			container.style.height = '605px';
			weatherBox.style.display = 'block';
			weatherDetails.style.display = 'flex';
		});
});
