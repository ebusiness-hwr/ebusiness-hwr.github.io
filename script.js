let weather = {
    "apiKey": "d62f2715fe700226fb8682e966b851fa",
    fetchWeather: function (city) {
        fetch(
            //API cal via city name
            "https://api.openweathermap.org/data/2.5/weather?q=" 
            + city 
            + "&units=metric&appid=" 
            + this.apiKey
            ).then((response) => response.json())
        .then((dataWeather) => this.displayWeather(dataWeather));
    },
    displayWeather: function(dataWeather){
        const { name } = dataWeather;
        const { icon, description } = dataWeather.weather[0];
        const { temp, humidity } = dataWeather.main;
        const { speed } =dataWeather.wind;
        //console.log(name,icon,description,temp,humidity,speed);
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "http://openweathermap.org/img/wn/"+ icon +".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind speed: " + speed + "km/h";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = "url('https://source.unsplash.com/random/1600x900/?" + name+ "')";
        document.querySelector(".regionalnews").innerText = "News of "+ name;
    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

document
    .querySelector(".search button")
    .addEventListener("click", function() {
        weather.search();
        news.search();
    }
    
    );

document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        weather.search();
        news.search();
    }
}
)

let news={  
    "ApiKey": "p1sP8KXdkcmUx8KdRaBbiKoKsWfOi80uCVNypCwM",
    fetchNews: function (city){
        var requestOptions = {
            method: 'GET'
        }
        fetch(
            "https://api.thenewsapi.com/v1/news/all?api_token="
            + this.ApiKey
            +"&search="
            + city, requestOptions
        ).then((response) => response.json())
        .then((data) => this.displayNews(data));
    },
    displayNews: function(data){
        console.log(data.data[0]);
        const {title} = data.data[0];
        const {description} = data.data[0];
        const {source} = data.data[0];
        const {url} = data.data[0];
        document.querySelector(".title1").innerText = title;
        document.querySelector(".description1").innerText = "\n"+ description;
        document.querySelector(".source1").innerText = "\n Published by: "+ url;
        //document.querySelector(".newsfeed2").innerText = 
        document.querySelector(".news").classList.remove("loading");
    },
    search: function () {
        this.fetchNews(document.querySelector(".search-bar").value);
    }
};


//zeigt am Anfang das Wetter von Berlin
weather.fetchWeather("Berlin");
news.fetchNews("Berlin");
