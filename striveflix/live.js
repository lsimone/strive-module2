// ALL MY DATA INITIALIZATION

var PROFILES = [
  {
    name: 'John',
    preferences: {
      category: 'movies'
    }
  },
  {
    name: 'Annah',
    preferences: {
      category: 'series'
    }
  },
  {
    name: 'Mary',
    preferences: {
      category: 'children'
    }
  }
]

var userIndex = 1

// END ALL MY DATA INITIALIZATION

function _$(selector) {
  return document.querySelector(selector)
}

function _$$(selector) {
  return document.querySelectorAll(selector)
}

/**
 * will show/hide alternatively the 2 views:
 * profile list and profile editor.
 */
function toggleProfileView() {
  var profileContainer = _$('.profile-container')
  var profileEditor = _$('.profile-editor')
  profileContainer.classList.toggle('d-none')
  profileContainer.classList.toggle('d-inline')
  profileEditor.classList.toggle('d-none')
  profileEditor.classList.toggle('d-inline')
}

/**
 * - toggle the view
 * - fill all the field with user information
 * - bind the profile object to the save button html element
 * @param {Object} profile
 */
function showProfileEditor(profile) {
  toggleProfileView()

  var nameInput = _$('#profileName')
  nameInput.value = profile.name
  var selectbox = _$('#category')
  selectbox.value = profile.preferences.category
  var saveButton = _$('#save-profile')

  // * - bind the profile object to the save button html element
  saveButton.profile = profile
}

function saveProfile(event) {
  console.log('saving...')
  var profile = event.target.profile

  // gathering the current input/select values
  var name = _$('#profileName').value
  var category = _$('#category').value

  // check if name is empty string
  if (!name) {
    console.error('empty string!')
  } else {
    // store everything in my user data object
    profile.name = name
    profile.preferences.category = category

    toggleProfileView()
    // i need to update my list view (re-render)
    loadProfiles()
  }
}

function loadProfiles() {
  console.log('loading profiles...')

  // taking a container, empty it and rendering all the HTMLElement
  // based on PROFILES "database"
  var profileListContainer = _$('.profile-list')
  profileListContainer.innerHTML = ''

  PROFILES.forEach(function(profile) {
    var div = document.createElement('div')
    div.className = 'col'
    div.textContent = profile.name
    // div.onclick = showProfileEditor
    div.onclick = function() {
      // here I bind my showProfileEditor function to the profile parameter
      // this parameter will represent the user data
      // it will be different for each of the created divs
      showProfileEditor(profile)
    }
    profileListContainer.append(div)
  })

  var saveBtn = _$('#save-profile')
  saveBtn.onclick = saveProfile
}

/**
 * remove all active classes from menu items
 * and add an active class to the selected one
 * according to the current user preferences
 */
function highlightMenu() {
  var navItems = _$$('.nav-item')

  for (var navItem of navItems) {
    navItem.classList.remove('active')
  }
  var highlighted
  var selectedProfile = PROFILES[userIndex]

  // our static menut order:
  // ['all', 'series', 'movies', 'children']
  switch (selectedProfile.preferences.category) {
    case 'series':
      highlighted = navItems[1]
      break
    case 'movies':
      highlighted = navItems[2]
      break
    case 'children':
      highlighted = navItems[3]
      break
    default:
      highlighted = navItems[0]
      break
  }

  highlighted.classList.add('active')
}

function getUserIndex() {
    return parseInt(location.hash.substring(1)) || 0
}

/**
 * this function will re-render all the dynamic content,
 * according to the user data.
 */
function loadHPContent() {
  console.log('loading HP content...')

  userIndex = getUserIndex()
  window.onhashchange = loadHPContent

  highlightMenu()

  // I set the selected user's name as dropdown label
  var dropdownAnchor = _$('.dropdown-toggle')
  dropdownAnchor.textContent = PROFILES[userIndex].name

  var parent = _$('.profiles-link')
  parent.innerHTML = ''

  PROFILES.forEach(function(profile, index) {
    if (userIndex === index) return
    console.log(typeof userIndex, typeof index)
    var a = document.createElement('a')
    a.className = 'dropdown-item'
    a.href = '#' + index
    a.textContent = profile.name
    parent.appendChild(a)
  })
}

function selectCategory(e, category) {
    // this will prevent the browser to handle the click as
    // it would have done for a normal anchor: in our case
    // it will not change the URL and will not follow the link
    // https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault
    e.preventDefault()
    PROFILES[userIndex].preferences.category = category
    // I trigger a full re-render in order the menu classes to be updated
    loadHPContent()
}
