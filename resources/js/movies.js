const key = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NWU1NDMwNGQ4ZjcxMjRhYzY4Yjg2YjBmNjQ3ZjUyNyIsInN1YiI6IjY2MTI3ZDE1YzY4YjY5MDE3ZDA1YzhiOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oxN6UtSD6XP0x07RZDkXCCC8tjOal2RR6FwZTsMscC8';
const imgURL = "https://image.tmdb.org/t/p/w500";
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer ' + key,
  }
};

function fetchData() {
    const container = document.getElementById('card-container');
    container.innerHTML = "";
    let query = document.getElementById("searchBox").value;
    console.log("maalik");
    for (let i = 1; i <= 6; i++) {
        let cardData = [];
        const apiPopularURL = "https://api.themoviedb.org/3/movie/popular?language=en-US&page="+i;
        fetch(apiPopularURL, options)
        .then(response => response.json())
        .then(response => {
            cardData = response.results;
            filterData = [];
            if (query != "") {
                filterData = cardData.filter(card => card.genre_ids.includes(Number(query)));
            } else {
                filterData = cardData;
            }
            console.log(filterData);
            createCards(filterData);
        })
        .catch(err => console.error(err));
    }    
}


function createCards(data) {
    const container = document.getElementById('card-container');
    data.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.style.backgroundImage = "url("+imgURL+card.poster_path+")";

        const cardContent = document.createElement('div');
        cardContent.classList.add('card-content');

        const titleElement = document.createElement('h2');
        titleElement.classList.add('poppins-bold');
        titleElement.textContent = card.original_title;

        const contentElement = document.createElement('div');
        contentElement.classList.add('poppins-medium');
        contentElement.classList.add('content-overview');
        contentElement.textContent = card.overview;

        cardElement.appendChild(cardContent);
        cardContent.appendChild(titleElement);
        cardContent.appendChild(contentElement);

        container.appendChild(cardElement);
    });
}

fetchData(14);
