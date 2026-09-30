// =====================================
// WEATHER
// =====================================

// Select HTML elements

const weatherForm =
    document.querySelector("#weatherForm");

const cityInput =
    document.querySelector("#cityInput");

const weatherStatus =
    document.querySelector("#weatherStatus");

const weatherResult =
    document.querySelector("#weatherResult");


// =====================================
// GET WEATHER
// =====================================

export async function getWeather(city) {
    weatherStatus.textContent =
        "Loading...";

    weatherResult.innerHTML =
        "";

    try {

        const url =
          `https://api.weatherapi.com/v1/current.json?key=f9557944bbb146a0b86104519262909&q=${city}`;

        const response =
            await fetch(url);

        if (!response.ok) {

            throw new Error(
                "Weather request failed"
            );

        }

        const data =
            await response.json();

        console.log(data);

        weatherStatus.textContent =
            "";

        weatherResult.innerHTML = `

            <h3>
                ${data.location.name}
            </h3>

            <p>
                ${data.location.country}
            </p>

            <p>
                Temperature:
                ${data.current.temp_c} °C
            </p>

            <p>
                Weather:
                ${data.current.condition.text}
            </p>

            <p>
                Humidity:
                ${data.current.humidity}%
            </p>

            <p>
                Feels Like:
                ${data.current.feelslike_c} °C
            </p>

        `;

    }

    catch (error) {

        weatherStatus.textContent =
            "Could not load weather.";

        weatherResult.innerHTML =
            "";

        console.error(error);

    }

}


// =====================================
// WEATHER EVENT LISTENER
// =====================================

weatherForm.addEventListener(

    "submit",

    (event) => {

        event.preventDefault();

        const city =
            cityInput.value.trim();

        if (city === "") {

            weatherStatus.textContent =
                "Please enter a city.";

            return;

        }

        getWeather(city);

    }

);