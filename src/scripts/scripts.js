 let weatherTabs = document.querySelector(".weather-tabs");
 let tabHeader = document.querySelector(".tabs-header");
 let tabBody = document.querySelector(".tabs-body");
 let tabIndicator = document.querySelector(".tabs-indicator");
 let tabHeaderNodes = document.querySelectorAll(".tabs-header > div");
 let tabBodyNodes = document.querySelectorAll(".tabs-body > div");


 for(let i=0; i<tabBodyNodes.length; i++){
    tabHeaderNodes[i].addEventListener("click",function () {
        tabHeader.querySelector(".active").classList.remove("active");
        tabHeaderNodes[i].classList.add("active");
        tabBody.querySelector(".active").classList.remove("active");
        tabBodyNodes[i].classList.add("active");
        tabIndicator.style.left = `calc(calc(calc(25% - 5px) * ${i}) + 10px)`;
    });
 }


 let valueSearch = document.getElementById('valueSearch');
 let city = document.getElementById('city');
 let temp = document.getElementById('temp');
 let description = document.querySelector('.description');
 let clouds = document.getElementById('clouds');
 let humidity = document.getElementById('humidity');
 let pressure = document.getElementById('pressure');
 let form = document.querySelector('form');


form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (valueSearch.value !== '') {
        searchWeather(valueSearch.value);
    }
});

const searchWeather = (query) => {

    let url = `${'https://api.weatherapi.com/v1/current.json'}?key=${'ce6b403d12df47b2bc5133711241009'}&q=${encodeURIComponent(query)}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data && data.location && data.current) {

                const city = document.querySelector('.city');
                const temp = document.querySelector('#temp');
                const tempDesc = document.querySelector("#description");
                
                if(city){
                city.querySelector('figcaption').innerText = data.location.name;
                city.querySelector('img').src='https://flagsapi.com/US/flat/64.png';
                }

                if(temp){
                const icon = 'http:' + data.current.condition.icon;
                temp.querySelector('img').src=icon;
                temp.querySelector('figcaption span').innerText = data.current.temp_c;
                }

                if(tempDesc){
                    tempDesc.innerText = data.current.condition.text;
                }

                clouds.innerText = data.current.cloud;
                humidity.innerText = data.current.humidity;
                pressure.innerText = data.current.pressure_mb;

            } else {
                city.querySelector('figcaption').innerText = 'Location not found';
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            city.querySelector('figcaption').innerText = 'Error fetching weather data';
        });
}


