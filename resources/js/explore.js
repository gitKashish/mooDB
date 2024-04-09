window.onload = init;

function init(){
const prev = document.getElementById("prev-btn")
const next = document.getElementById('next-btn')
const list = document.getElementById('card-container')
const key = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NWU1NDMwNGQ4ZjcxMjRhYzY4Yjg2YjBmNjQ3ZjUyNyIsInN1YiI6IjY2MTI3ZDE1YzY4YjY5MDE3ZDA1YzhiOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oxN6UtSD6XP0x07RZDkXCCC8tjOal2RR6FwZTsMscC8"
const options ={
  method:"GET",
  headers:{
    accept: "application/json",
    Authorization: 'Bearer '+key,
  }
}

fetchdata(options)  

const itemWidth = 240
const padding = 48

prev.addEventListener('click',()=>{
  list.scrollLeft -= itemWidth + padding
})

next.addEventListener('click',()=>{
  list.scrollLeft += itemWidth + padding
})
}

function fetchdata(options){
  fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', options)
  .then(response => response.json())
  .then(response => {
    trending_list=response.results;
    console.log(trending_list)
    trending_list.forEach(create_card);
  })
  .catch(err => console.error(err));
  
}

function create_card(item){

  const posterURL = "https://image.tmdb.org/t/p/w500"
  const container = document.getElementById('card-container');

  const titleElement = document.createElement('h2');
  titleElement.classList.add('title-element')
  if(typeof item.title != 'undefined'){
    titleElement.textContent = item.title;
  }
  // else{
  //   titleElement.textContent = item.name;
  // }

  const gradientDiv = document.createElement('div');
  gradientDiv.classList.add('gradient-div');

  const cardElement = document.createElement('div');
  cardElement.classList.add('card-element');
  cardElement.style.backgroundImage="url("+posterURL+item.poster_path+")";
  // console.log(cardElement.style.backgroundImage)

  const card = document.createElement('div');
  card.classList.add('card');

  cardElement.appendChild(gradientDiv);
  gradientDiv.appendChild(titleElement);
  card.appendChild(cardElement);
  container.appendChild(card);
  
}
