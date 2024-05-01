let genre_list;
let list = [];
function fetch_genre() {
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NWU1NDMwNGQ4ZjcxMjRhYzY4Yjg2YjBmNjQ3ZjUyNyIsInN1YiI6IjY2MTI3ZDE1YzY4YjY5MDE3ZDA1YzhiOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oxN6UtSD6XP0x07RZDkXCCC8tjOal2RR6FwZTsMscC8'
        }
      };
      let result = fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
        .then(response => response.json())
        .then(response => {
            genre_list = response.genres;
            load_list(genre_list);
        })
        .catch(err => console.error(err));
}

async function fetch_movie() {
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NWU1NDMwNGQ4ZjcxMjRhYzY4Yjg2YjBmNjQ3ZjUyNyIsInN1YiI6IjY2MTI3ZDE1YzY4YjY5MDE3ZDA1YzhiOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oxN6UtSD6XP0x07RZDkXCCC8tjOal2RR6FwZTsMscC8'
        }
      };
      let page = 20;
      for (let i = 1; i <= page; i++) {
        await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page='+i+'&region=356', options)
        .then(response => response.json())
        .then(response => {
          list = list.concat(response.results);
        })
        .catch(err => console.error(err));
      }
}

function load_list(list) {
    const data_list = document.getElementById("genre-list");
    let options_string = "";
    list.forEach(element => {
        options_string += '<option value = "' + element.name + '"/>';
    });
    data_list.innerHTML = options_string;
}

fetch_genre();
fetch_movie();