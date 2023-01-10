const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
let messageOne = document.querySelector("#message-1");
let messageTwo = document.querySelector("#message-2");

messageOne.textContent = "";
messageTwo.textContent = "";
weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const location = search.value;

  const url = `http://localhost:3000/weather?address=${location}`;
  fetch(url).then((res) =>
    res.json().then((data) => {
      if (data.error) {
        console.log(data.error);
        messageOne.textContent = data.error;
      } else {
        const { description, temperature, feelslike } =
          data["forecast"]["weather"];
        console.log(data);
        console.log(description);
        messageOne.textContent = description;
      }
    })
  );
});
