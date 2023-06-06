console.log('Load js file')

// let url = 'http://localhost:3000/weather?address=Hanoi';
// fetch(url).then((response) => {
//     response.json().then((data) => {
//         console.log(data);
//     });
// });

const weatherForm = document.querySelector('form');
const searchInput = document.querySelector('form input[name="search"]');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    fetchWeather(searchInput.value);
});

function fetchWeather(address) {
    let url = 'http://localhost:3000/weather?address=' + encodeURIComponent(address);
    fetch(url).then((response) => {
        response.json().then((data) => {
            console.log(data);
            if (data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
        });
    });
}