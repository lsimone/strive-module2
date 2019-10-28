var MOVIES = [
  {
    title: 'the office - season six',
    category: 'series',
    img: '1-1'
  },
  {
    title: 'the terror - season 1',
    category: 'series',
    img: '1-2'
  },
  {
    title: 'jack ryan',
    category: 'movie',
    img: '1-3'
  },
  {
    title: 'the matrix',
    category: 'movie',
    img: '1-4'
  },
  {
    title: 'the man in the high castle',
    category: 'movie',
    img: '2-1'
  },
  {
    title: 'desesperate housewives',
    category: 'movie',
    img: '2-2'
  },
  {
    title: 'indiana jones and the riders of the lost ark',
    category: 'movie',
    img: '2-3'
  },
  {
    title: 'jaws',
    category: 'movie',
    img: '2-4'
  },
  {
    title: 'dottor house - season 1',
    category: 'series',
    img: '3-1'
  },
  {
    title: 'shrek',
    category: 'children',
    img: '3-2'
  },
  {
    title: 'despicable me 2',
    category: 'children',
    img: '3-3'
  },
  {
    title: 'vikings',
    category: 'movie',
    img: '3-4'
  }
]

/**
 * Just API (http request) latency simulation
 * (just a mock: not part of our app!)
 *
 * @param {Function} callback
 * @param {Object} options
 */
function getMovies(callback, options) {
  setTimeout(function() {
    var movies = MOVIES
    if (options && options.category) {
      movies = movies.filter(function(movie){
        return (movie.category === options.category)
      })
    }
    if (options && options.text) {
      movies = movies.filter(function(movie){
        // TODO: put your logic here
      })
    }
    callback(movies)
  }, 2000)
}

/**
 * Just build an image corresponding to the 
 * card we want to show for each movie
 * 
 * @param {Object} data 
 */
function buildCard(data) {
  // <img class="col-12 col-sm-6 col-lg-3 my-3" src="./movies/1-2.jpg" alt="movie">
  var img = document.createElement('img')
  img.className = 'col-12 col-sm-6 col-lg-3 my-3'
  img.alt = 'movie'
  img.src = './movies/' + data.img + '.jpg'
  return img
}

/**
 * empties all the content of our content div 
 * and shows back the spinner, waiting for
 * our API call to call us back
 */
function emptyMoviesContent () {
  var contentDiv = document.getElementById('movie-content')
  var movies = contentDiv.getElementsByTagName('img')
  while (movies.length) {
    movies[0].remove()
  }
  var spinner = document.getElementById('spinner')
  // here I just remove the d-none class and add the 
  // d-flex class in order to show back the spinner
  spinner.classList.remove('d-none')
  spinner.classList.add('d-flex')
}

/**
 * fill our content div with all images related
 * to the movies returned by our API
 */
function render(movies) {
  var contentDiv = document.getElementById('movie-content')
  var spinner = document.getElementById('spinner')
  spinner.classList.remove('d-flex')
  spinner.classList.add('d-none')

  movies.forEach(function(item) {
    var card = buildCard(item)
    contentDiv.appendChild(card)
  })
}

function populateMovies() {
  getMovies(render)
}

/**
 * show the header link as active one
 * and removes the active class from
 * the previously selected element
 * 
 * @param {HTMLElement} element 
 */
function selectSection(element) {
  var sections = document.getElementsByClassName('nav-item')
  var listItem = element.parentElement
  for (var section of sections) {
    section.classList.remove('active')
  }
  listItem.classList.add('active')
}

function textSearch(event) {
  getMovies(render, { text: event.target.value})
}

/**
 * handle the click event on the header navbar
 * here we check which link has been clicked
 * and we select the appropriate action
 * 
 * @param {Event} event 
 */
function handleHeaderClick(event) {
  selectSection(event.target)
  emptyMoviesContent()
  switch (event.target.innerText) {
    case 'TV Series':
      getMovies(render, { category: 'series' })
      break
    case 'Movies':
      getMovies(render, { category: 'movie' })
      break
    case 'Children':
      getMovies(render, { category: 'children' })
      break
    default:
      getMovies(render)
      break
  }
}

window.onload = populateMovies
