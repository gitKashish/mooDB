window.onload = init;

function init(){
  const trend_mo_prev = document.getElementById("trend-mo-prev-btn")
  const trend_mo_next = document.getElementById('trend-mo-next-btn')
  const hero_prev = document.getElementById("hero-prev-btn")
  const hero_next = document.getElementById('hero-next-btn')
  const trend_mo_list = document.getElementById('trend-mo-card-container')
  const hero_list = document.getElementById('hero-card-container')
  const key = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NWU1NDMwNGQ4ZjcxMjRhYzY4Yjg2YjBmNjQ3ZjUyNyIsInN1YiI6IjY2MTI3ZDE1YzY4YjY5MDE3ZDA1YzhiOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oxN6UtSD6XP0x07RZDkXCCC8tjOal2RR6FwZTsMscC8"
  const options ={
    method:"GET",
    headers:{
      accept: "application/json",
      Authorization: 'Bearer '+key,
    }
  }

  create_trend_mo_carousel(options)
  const itemWidth = 240
  const padding = 48

  trend_mo_prev.addEventListener('click',()=>{
    trend_mo_list.scrollLeft -= itemWidth + padding
  })

  trend_mo_next.addEventListener('click',()=>{
    trend_mo_list.scrollLeft += itemWidth + padding
  })
  hero_prev.addEventListener('click',()=>{
    hero_list.scrollLeft -= 200 + 10
  })

  hero_next.addEventListener('click',()=>{
    hero_list.scrollLeft += 200 + 10
  })

  create_hero_carousel(options)
}
function create_trend_mo_carousel(options){
  fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', options)
  .then(response => response.json())
  .then(response => {
    trending_list=response.results;
    console.log(trending_list)
    trending_list.forEach(trend_mo_create_card);
  })
  .catch(err => console.error(err));
  
}

function trend_mo_create_card(item){

  const posterURL = "https://image.tmdb.org/t/p/w500"
  const container = document.getElementById('trend-mo-card-container')
  create_card(posterURL, container, item)
}

function create_card(posterURL, container, item){
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


function create_hero_carousel(options){
  fetch('https://api.themoviedb.org/3/trending/all/day?language=en-US', options)
  .then(response => response.json())
  .then(response => {
    list=response.results;
    console.log(list);
    list.forEach(hero_create_card);
    backdrop_path=list[0].backdrop_path
    poster_path=list[0].poster_path
    console.log(backdrop_path)
    create_hero_element(backdrop_path, poster_path, options);
  })
  .catch(err => console.error(err));
}
function hero_create_card(item){

  const posterURL = "https://image.tmdb.org/t/p/w500"
  const container = document.getElementById('hero-card-container')
  create_hero_card(posterURL, container, item)
  
}
function create_hero_card(posterURL, container, item){
  const titleElement = document.createElement('h2');
  titleElement.classList.add('title-element')
  if(typeof item.title != 'undefined'){
    titleElement.textContent = item.title;
  }
  else{
    titleElement.textContent = item.name;
  }

  const gradientDiv = document.createElement('div');
  gradientDiv.classList.add('gradient-hero-div');
  
  

  const cardElement = document.createElement('div');
  cardElement.classList.add('card-hero-element');
  cardElement.style.backgroundImage="url("+posterURL+item.poster_path+")";
  
  const card = document.createElement('div');
  card.classList.add('card-hero');
  card.setAttribute("backdrop-path",item.backdrop_path);
  card.setAttribute("poster-path",item.poster_path);
  card.setAttribute("data-id", item.id);
  card.setAttribute("data-type", item.media_type);
  if(item.media_type=="movie"){
    card.setAttribute("data-title", item.title)  
  }
  else{
    card.setAttribute("data-title", item.name)
  }
  card.addEventListener("click",function(){
    change_hero(this);
  },false);

  cardElement.appendChild(gradientDiv);
  gradientDiv.appendChild(titleElement);
  card.appendChild(cardElement);
  container.appendChild(card);
}

function create_hero_element(backdrop_path, poster_path ,options){
  posterURL="https://image.tmdb.org/t/p/w500"
  backdropURL="https://image.tmdb.org/t/p/w1280"
  const imgURL = backdropURL+backdrop_path;
  document.querySelector("#selected-container").style.backgroundImage = "url("+imgURL+")";
  document.querySelector("#hero-poster").src=posterURL+poster_path

  document.querySelector(".gradient-banner").style.opacity="1";
}

function change_hero(card){
  const backdrop_path = card.getAttribute("backdrop-path");
  const poster_path = card.getAttribute("poster-path");
  console.log(backdrop_path);
  const key = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NWU1NDMwNGQ4ZjcxMjRhYzY4Yjg2YjBmNjQ3ZjUyNyIsInN1YiI6IjY2MTI3ZDE1YzY4YjY5MDE3ZDA1YzhiOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oxN6UtSD6XP0x07RZDkXCCC8tjOal2RR6FwZTsMscC8"
  const options ={
    method:"GET",
    headers:{
      accept: "application/json",
      Authorization: 'Bearer '+key,
    }
  }
  create_hero_element(backdrop_path, poster_path,options)

}

