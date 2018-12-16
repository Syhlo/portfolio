// Version: 0.9

// ------------------------- Slider - Toggle state ------------------------- //

const slider =
    document.getElementById('slider')
const sliderC =
    slider.classList

const controller =
    document.querySelector('.projects-tab')
const control =
    controller.classList


controller.addEventListener('click', () => {
    sliderC.toggle('closed')
    sliderC.toggle('opened')
    control.toggle('fa-chevron-down')
    control.toggle('fa-chevron-up')

    // Store locally
    sliderState()
})



// ------------------------- Active navigation link ------------------------- //

const anchors =
    document.querySelectorAll('.navbar-menu .navbar-end .navbar-item')


anchors.forEach((anchor) =>
    anchor.addEventListener('click', activeNavLink))


function activeNavLink(e) {
    let target = e.currentTarget
    // Unselect previously selected (if link pressed isn't Contact)
    anchors.forEach((elem) => {
        if (elem.classList.contains('active') && target !== anchors[3]) {
            elem.classList.toggle('active')
        }
    })
    // Handle contact form & new selection
    target === anchors[3] ?
        contactModal() :
        target.classList.toggle('active')
}

// ------------------------- modals ------------------------- //

const modals =
    document.querySelectorAll('.modal')
const closeModals =
    document.querySelectorAll('button.delete')

closeModals.forEach((modal) =>
    modal.addEventListener('click', () =>
        modals.forEach((modal) => modal.classList.toggle('is-active'))
    ))

function contactModal() {
    modals[0].classList.toggle('is-active')
}


// ------------------------- Select filters ------------------------- //

// Filter tags
const filterTags =
    document.querySelectorAll('.filter')


// storage variable
let data =
    JSON.parse(sessionStorage.getItem('data')) || []


function selectFilter() {
    // Reload stored data
    restoreData()

    // Filter selection
    for (let index = 0; index < filterTags.length; index++) {
        filterTags[index].addEventListener('click', () => {
            // Visual selection
            const target =
                event.currentTarget
            target.classList.toggle('is-info')

            // Store locally
            selectedState(index, target)

            // Project filter
            filterItems(index)
        })
    }
}



// ------------------------- Filter the Projects ------------------------- //

// IDs: 0=html, 1=JS, 2=CSS, 3=Py, 4=Bulma, 5=React
const projectIDs = {
    portfolio: [0, 1, 2, 4],
    reactApp: [5],
    anotherApp: [5],
    lastProject: []
}


// Active Filter IDs
let filterList = [null, null, null, null, null, null]


// Projects on site
let project = document.getElementsByName('project');


function filterItems(index) {
    if (index === filterList[index]) {
        filterList[index] = null
    }
    else {
        filterList[index] = index
    }

    showProjects()
    hideProjects()
    filteredState()
}


// -------- methods -------- //

// Hide projects that don't contain all values in filterList
function hideProjects() {
    Object.keys(projectIDs).forEach((e, i) => {
        if (!arrayContains(projectIDs[e], filterList)) {
            if (project[i].classList.contains('filtered')) {
                return false
            }
            project[i].classList.toggle('filtered')
        }
    })
}


// Show projects that are currently filtered and contain all values in filterList
function showProjects() {
    Object.keys(projectIDs).forEach((e, i) => {
        if (project[i].classList.contains('filtered') && arrayContains(projectIDs[e], filterList)) {
            project[i].classList.toggle('filtered')
        }
    })
}


// -------- helpers -------- //

// Check if one array contains another array's values
function arrayContains(superset, subset) {
    if (0 === subset.length) { return false; }
    return removeNull(subset).every(value =>
        (superset.indexOf(value) >= 0))
}

// Exclude null
function removeNull(array) {
    const arr = array.filter(value =>
        value === 0 ? true : value)
    return arr
}


// Initiate
selectFilter()



// ------------------------- Storage ------------------------- //

// -------- restore data -------- //

function restoreData() {
    // Restore filter selections
    filterTags.forEach((target, index) => {
        if (data[index] && JSON.parse(data[index]).selected === true) {
            target.classList.toggle('is-info')
        }
    })

    // Restore filtered projects
    if (data[6]) {
        filterList = JSON.parse(data[6]).list
        showProjects()
        hideProjects()
    }

    // Restore slider state
    if (data[7] && JSON.parse(data[7]).sliderOpen === true) {
        sliderC.remove('closed')
        sliderC.add('opened')
        control.remove('fa-chevron-down')
        control.add('fa-chevron-up')
    }
}


// -------- store data -------- //

function selectedState(index, target) {
    const item =
        JSON.stringify({
            selected:
                target.classList.contains('is-info')
        })
    data[index] = item
    sessionStorage.setItem('data', JSON.stringify(data))
}


function filteredState() {
    const item =
        JSON.stringify({
            list: filterList
        })
    data[6] = item
    sessionStorage.setItem('data', JSON.stringify(data))
}


function sliderState() {
    const item = JSON.stringify({
        sliderOpen:
            !sliderC.contains('closed')
    })
    data[7] = item
    sessionStorage.setItem('data', JSON.stringify(data))
}


// -------- clear data -------- //

// Clear filters button
document.querySelector('.clear-filters').addEventListener('click', clearFilters)

function clearFilters() {
    // Dump storage
    sessionStorage.clear()

    // Reset arrays
    filterList = [null, null, null, null, null, null]
    data = JSON.parse(sessionStorage.getItem('data')) || []
    sliderState()

    // Remove selected tags
    filterTags.forEach((item => {
        if (item.classList.contains('is-info')) {
            item.classList.toggle('is-info')
        }
    }))

    // Un-filter all projects
    project.forEach((item) => {
        if (item.classList.contains('filtered')) {
            item.classList.toggle('filtered')
        }
    })

}