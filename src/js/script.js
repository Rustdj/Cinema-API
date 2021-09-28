// let url = 'https://jsonplaceholder.typicode.com/posts/',
//     data = {username: 'example'};

// fetch(url, {
//         method: 'POST',
//         body: JSON.stringify(data),
//         headers: {
//             'Content-Type':'application/json'
//         }
//     })
//     .then((response) => response.json())
//     .then((myJson) => console.log('Succes', myJson))
//     .catch(error => console.error('Error', error));

// Оптимизированный вариант!!---------------------



// const getResource = async (url) => {
//     const res = await fetch(url);

//     if (!res.ok) {
//         throw new Error(`Could not fetch ${url}, status: ${res.status}`);
//     }

//     const some = await res.json();

//     return some;
// };


// getResource('https://jsonplaceholder.typicode.com/todos/1')
//     .then((res) => console.log('Succes', res))
//     .catch(error => console.error('Error', error));



//============== Пример работы с api ======================//

// class GotService {

//     constructor() {
//         this._apiBase = 'https://www.anapioficeandfire.com/api';
//     }

//     async getResource(url) {
//              const res = await fetch(`${this._apiBase}${url}`);
        
//         if (!res.ok) {
//             throw new Error(`Could not fetch ${url}, status: ${res.status}`);
//         }
            
//         return await res.json();

//     };
//     getAllCharacters() {
//         return this.getResource('/characters?page=8&pageSize=10');
//     }

//     getCharacters(id) {
//         return this.getResource(`/characters/${id}`);
//     }
    
// }

// const got = new GotService();

// got.getAllCharacters()
//     .then(res => {
//         res.forEach( item => console.log(item.name));
//     });

// got.getCharacters(130)
//     .then(res => console.log(res));

// const button = document.querySelector('.button'),
//       image = document.querySelector('.img'),
//       url = 'https://kinobd.ru/api/films';
      

// async function fetchHandler() {
//     try {
//         const response = await fetch(url);
//         const data = await response.json();
//         image.src = data.file;
//     } catch (error) {
//         console.log(error);
//     }
// }

// button.addEventListener('click', () => {
//     let isLoaded = image.complete;

//     if (isLoaded) {
//         fetchHandler();
//     }
//
// });



//TMDB

const API_KEY = 'api_key=1cf50e6248dc270629e802686245c2c8';
      BASE_URL = 'https://api.themoviedb.org/3';
      API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY;
      IMG_URL = 'https://image.tmdb.org/t/p/w500';
      searchURL = BASE_URL + '/search/movie?'+API_KEY;
      
      main = document.getElementById('main');
      form = document.getElementById('form');
      search = document.getElementById('search');


      getMovies(API_URL);

function getMovies(url) {

      fetch(url).then(res => res.json()).then(data => {
            console.log(data.results)
            showMovies(data.results);
      })
}

function showMovies(data) {
      main.innerHTML = '';

      data.forEach(movie => {
            const {title, poster_path, vote_average, overview} = movie;
            const movieEl = document.createElement('div');
            movieEl.classList.add('movie');
            movieEl.innerHTML = `
            <img src="${IMG_URL+poster_path}" alt="${title}">

            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getColor(vote_average)}">${vote_average}</span>
            </div>

            <div class="overview">

                <h3>overview</h3>
                ${overview}
            </div>

            `

            main.appendChild(movieEl);
      })

}

function getColor(vote) {
      if(vote >= 8) {
            return 'green'
      } else if (vote >= 5) {
            return 'orange'
      } else {
            return 'red'
      }
}

form.addEventListener('submit', (e) => {
      e.preventDefault();

      const searchTerm = search.value;

      if (searchTerm) {
            getMovies(searchURL + '&query=' + searchTerm)
      } else {
            getMovies(API_URL);
      }
})
