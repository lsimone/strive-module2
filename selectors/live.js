var DB = [
  {
    text: 'learn media query'
  },
  {
    text: 'learn CSS'
  },
  {
    text: 'learn devTool',
    completed: true
  },
  {
    text: 'understand flexbox'
  }
]

/**
 * it will select the first Element found 
 * with the given selector from the dom
 * @param {String} selector 
 */
function $(selector) {
  return document.querySelector(selector)
}

/**
 * it will select all the Elements found 
 * with the given selector from the dom
 * @param {String} selector 
 */
function $$(selector) {
  return document.querySelectorAll(selector)
}

/**
 * it will create an HTMLElement with a given tagname
 * @param {String} name 
 */
function $c(name) {
  return document.createElement(name)
}

function handleEventAndGetIndex(event) {
  event.preventDefault()
  var listItem = event.target.parentElement
  return listItem.dataset.index
}

function removeItem(event) {
  var index = handleEventAndGetIndex(event)
  // remove from the database by using splice
  // https://developer.mozilla.org/it/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
  DB.splice(index, 1)
  render()
}

function toggleComplete() {
  var index = handleEventAndGetIndex(event)
  // just toggle the boolean value
  DB[index].completed = !DB[index].completed
  render()
}

/**
 * this will create HTML element corresponding
 * to the given todo item
 * @param {Object} item 
 */
function createItemElement(item, index) {
  // create a new list item that will wrap everything
  var wrapper = $c('li')
  wrapper.dataset.index = index
  
  // create the link that will handle item removal
  var remove = $c('a')
  remove.textContent = 'X'
  remove.href = ''
  remove.onclick = removeItem

  // create the link that will handle item completion toggle
  var toggleCompleteLink = $c('a')
  toggleCompleteLink.textContent = 'V'
  toggleCompleteLink.href = ''
  toggleCompleteLink.onclick = toggleComplete

  // create the todo text element that will show the content
  var todoText = $c('span')
  todoText.textContent = item.text
  
  // append everything to the wrapper node, then return it.
  wrapper.append(remove, toggleCompleteLink, todoText)

  return wrapper
}

function onSubmit(event) {
  // prevent form submit
  event.preventDefault()
  var input = $('form input')
  var value = input.value
  if (value) {
    // adding the new item to the database
    DB.push({
      text: value
    })
    // when a change has to be reflected to the DOM
    // I need to re-render everything
    render()
    input.value = ''
  }
  // return false
}

/**
 * this will render all the dynamic content
 * in the page
 */
function render () {
  // build a form for our new todos
  var form = $('form')
  form.onsubmit = onSubmit

  // gather our list containers
  var todoContainer = $('.todo-list')
  var completedContainer = $('.completed-list')

  // empty them...
  todoContainer.innerHTML = ''
  completedContainer.innerHTML = ''

  // - loop over all database elements
  // - create the list elements
  // - append them to the containers
  DB.forEach(function(item, index){
    var child = createItemElement(item, index)
    var container = item.completed ? completedContainer : todoContainer
    container.append(child)
  })
}

/**
 * this is automatically triggered when DOM is ready
 * ENTRY POINT!!!
 */
function bootstrap () {
  console.log('bootstraping...')
  render()
}

window.onload = bootstrap