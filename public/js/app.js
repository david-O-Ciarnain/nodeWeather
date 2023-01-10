const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const mainElemnt = document.querySelector("#weather-data");
let locations = document.querySelector("#message-4");
let descriptions = document.querySelector("#message-1");
let temperatures = document.querySelector("#message-2");
let feelslikes = document.querySelector("#message-3");
let weatherIcon = document.createElement("img");

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const location = search.value;

  const url = `http://localhost:3000/weather?address=${location}`;

  fetch(url).then((res) =>
    res.json().then((data) => {
      if (data.error) {
        descriptions.textContent = data.error;

        //resets elements
        temperatures.textContent = "";
        feelslikes.textContent = "";
        locations.textContent = "";
        weatherIcon.src = "";
      } else {
        const { description, temperature, feelslike } =
          data["forecast"]["weather"];

        weatherIcon.src = data["forecast"].weatherIcons;

        mainElemnt.appendChild(weatherIcon);
        locations.textContent = data.location;
        descriptions.textContent = description;
        temperatures.textContent = temperature;
        feelslikes.textContent = feelslike;
      }
    })
  );
});
