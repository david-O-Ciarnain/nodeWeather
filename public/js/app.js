const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const location = search.value;

  const url = `http://localhost:3000/weather?address=${location}`;
  fetch(url).then((res) =>
    res.json().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        console.log(data);
      }
    })
  );
});
