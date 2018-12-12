// ------------------------- Slider - Toggle state ------------------------- //

const slider =
    document.getElementById('slider')
const sliderC =
    slider.classList
const controller =
    document.querySelector('.control')
const control =
    controller.classList

controller.addEventListener('click', () => {
    sliderC.toggle('closed')
    sliderC.toggle('opened')
    control.toggle('fa-chevron-down')
    control.toggle('fa-chevron-up')

    // Store locally
    storeSliderState()
})



// ------------------------- Active navigation link ------------------------- //

const anchors =
    document.querySelectorAll('.navbar-menu .navbar-end .navbar-item')

anchors.forEach((anchor) =>
    anchor.addEventListener('click', activeNavLink))

function activeNavLink(e) {
    anchors.forEach((elem) => {
        if (elem.classList.contains('active')) {
            elem.classList.toggle('active')
        }
    })
    e.currentTarget.classList.toggle('active')
}



// ------------------------- Select filters ------------------------- //

// Filter tags
const filters =
    document.querySelectorAll('.filter')

// Local storage variable
let storeFilters =
    JSON.parse(localStorage.getItem('selected')) || []

// Filter selection logic
function filter() {
    for (let i = 0; i < filters.length; i++) {
        // Set selected from local storage
        setSelected(i, filters[i])

        filters[i].addEventListener('click', () => {
            // Visual selection
            const target =
                event.currentTarget
            target.classList.toggle('is-info')

            // Store locally
            storeSelected(i, target)

            // "Filter the Projects"
            _filter(i)
        })
    }
}

// Initiate
filter()



// ------------------------- Filter the Projects ------------------------- //

// Object containing the projects
// IDs: 0=html, 1=JS, 2=CSS, 3=Py, 4=Bulma, 5=React
const projects = {
    portfolio: [0, 1, 2, 4],
    reactApp: [5],
    anotherApp: [5],
    lastProject: []
}

// Active Filter IDs
let filtered = []

// Projects on site
let project = document.getElementsByName('project');

function _filter(index) {
    // If the index is already present when filter is triggered
    if (index === filtered[index]) {
        // Show the hidden projects and set filter to NaN
        filtered[index] = NaN
        showProjects(index)
    }
    else {
        // Otherwise, set filter to ID & hide projects without ID
        filtered[index] = index
        hideProjects(index)
    }
}

function hideProjects(index) {
    // For each project in projects
    Object.keys(projects).forEach((e, i) => {
        // if the project's array does not contain every item from filtered array then ..
        if (!compareArrays(projects[e], filtered)) {
            // Do not filter already filtered projects
            if (project[i].classList.contains('filtered')) {
                return
            }
            // filter those items out
            project[i].classList.toggle('filtered')
        }
    })
}

function showProjects(index) {
    Object.keys(projects).forEach((e, i) => {
        // Show all filtered projects
        if (project[i].classList.contains('filtered') && compareArrays(projects[e], filtered)) {
            project[i].classList.toggle('filtered')
        }
    })
}

// Compare filtered array to the project's array
function compareArrays(superset, subset) {
    if (0 === subset.length) { return false; }
    return removeNaN(subset).every(value =>
        (superset.indexOf(value) >= 0))
}

// Removes all NaNs from filtered array
function removeNaN(array) {
    const arr = array.filter(val =>
        val === 0 ? true : val)
    return arr
}



// ------------------------- Local Storage ------------------------- //

// Clear filters button
document.querySelector('.clear-filters').addEventListener('click', clearFilters)


// Selected Filters
function storeSelected(index, target) {
    const item =
        JSON.stringify({
            selected:
                target.classList.contains('is-info')
        })
    storeFilters[index] = item
    localStorage.setItem('selected', JSON.stringify(storeFilters))
}


// Slider State
function storeSliderState() {
    const item = JSON.stringify({
        sliderOpen:
            !sliderC.contains('closed')
    })
    storeFilters[6] = item
    localStorage.setItem('selected', JSON.stringify(storeFilters))
}

// On-load selected filters
function setSelected(index, target) {
    if (storeFilters[index] && JSON.parse(storeFilters[index]).selected === true) {
        target.classList.toggle('is-info')

    }
    if (storeFilters[6] && JSON.parse(storeFilters[6]).sliderOpen === true) {
        sliderC.remove('closed')
        sliderC.add('opened')
    }
}


// Clear localStorage, selected filters, and reset filtered state
function clearFilters() {
    storeFilters = []
    localStorage.clear()
    filters.forEach((item => {
        if (item.classList.contains('is-info')) {
            item.classList.toggle('is-info')
        }
    }))
    filtered = []
    project.forEach((item) => {
        if (item.classList.contains('filtered')) {
            item.classList.toggle('filtered')
        }
    })
    storeSliderState()
}