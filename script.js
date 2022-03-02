//Wetter-API aufrufen

let weather = {
    "apiKey": "d62f2715fe700226fb8682e966b851fa",
    fetchWeather: function (city) {
        fetch(
            //API cal via city name
            "https://api.openweathermap.org/data/2.5/weather?q=" 
            + city 
            + "&units=metric&appid=" 
            + this.apiKey
            ).then((response) => {
                if (!response.ok) {
                    return Promise.reject(response);
                }
                return response.json();
            })
            //.then((response) => response.json())
        .then((dataWeather) => this.displayWeather(dataWeather))
        .catch(error => alert("Please enter a valid city name."));
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
        document.querySelector(".temp").innerText = temp.toFixed() + "°C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind speed: " + speed + "km/h";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = "url('https://source.unsplash.com/random/1600x900/?" + name+ ",nature')";
        document.querySelector(".regionalnews").innerText = "News of "+ name;
    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

//Funktion des Such-Buttons festlegen:
document
    .querySelector(".search button")
    .addEventListener("click", function() {
        weather.search();
        news.search();
    }
    
    );

//Funktion der Suchleiste festlegen:
document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        weather.search();
        news.search();
        news.ready();
    }
}
)

//News API aufrufen

let news={  
    "ApiKey": "a09ddad9d4542225f719550aa663dd23",
    fetchNews: function (city){
        const date = new Date();
        const currentMonth = date.getMonth()+1;
        const today = date.getFullYear() + "-" + currentMonth + "-" + date.getDate();
        //console.log(today);
        fetch(
            "https://gnews.io/api/v4/search?q="
            + city 
            + "&from="
            + today
            +"&token=a09ddad9d4542225f719550aa663dd23&lang=en"
        ).then((response) => response.json())
        .then((data) => this.displayNews(data))
        .catch(error => alert("We can not provide news for your requested city."));
    },
    displayNews: function(data){
        //const allArticles = data.articles;
        //console.log(allArticles);
        const {title} = data.articles[0];
        const {description} = data.articles[0];
        const {publishedAt} = data.articles[0];
        const {url} = data.articles[0];
        document.querySelector(".title").innerText = title;
        document.querySelector(".content").innerText = "\n"+ description;
        document.querySelector(".sources").innerText = "\n Published on: "+ publishedAt.substring(0, 10) + ", "+ publishedAt.substring(11, 16);
        document.querySelector(".link").innerText = url;
        document.querySelector(".news").classList.remove("loading");
    },
    search: function () {
        this.fetchNews(document.querySelector(".search-bar").value);
    }

};
    

//zeigt am Anfang das Wetter von Berlin
weather.fetchWeather("Berlin");
news.fetchNews("Berlin");
