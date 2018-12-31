// Version: 0.9.1

// ------------------------- Slider - Toggle state ------------------------- //

const slider = document.getElementById('slider')
const controller = document.querySelector('.projects-tab')

controller.addEventListener('click', () => {
    slider.classList.toggle('closed')
    controller.classList.toggle('fa-chevron-down')
    controller.classList.toggle('fa-chevron-up')

    // Store state
    sliderState()
})



// ------------------------- Active navigation link ------------------------- //

const anchors = document.querySelectorAll('.navbar-end > .navbar-item')

anchors.forEach((anchor) =>
    anchor.addEventListener('click', activeNavLink))


function activeNavLink(e) {
    let target = e.currentTarget

    // Unselect previously selected
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



// ------------------------- Contact modal ------------------------- //

const modals = document.querySelectorAll('.modal')
const closeModals = document.querySelectorAll('button.delete')
const envelope = document.querySelector('.fa-envelope')

envelope.addEventListener('click', contactModal)

// Open modal
function contactModal() {
    modals[0].classList.toggle('is-active')
}

closeModals.forEach((close) =>
    close.addEventListener('click', (index) =>
        // Close modals
        modals.forEach((modal) =>
            modal.classList.remove('is-active')))
)




// ------------------------- Education Tab in About ------------------------- //
const slideButtons = document.querySelectorAll('#education > div > div > p:nth-child(4) > button')
const education = document.querySelector('#education')
const slides = document.querySelectorAll('#slide')
const backButton = document.querySelectorAll('.back')

slideButtons.forEach((slide, index) => {
    slide.addEventListener('click', () => switchSlide(index))
})

backButton.forEach((back) =>
    back.addEventListener('click', goBack))

function switchSlide(index) {
    education.classList.toggle('hide-slide')
    slides[index].classList.toggle('hide-slide')
}

function goBack() {
    console.log('pressed')
    slides.forEach((slide) => slide.classList.add('hide-slide'))
    education.classList.remove('hide-slide')
}




// ------------------------- Filter Selection ------------------------- //

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

            // Store selections
            selectedState(index, target)

            // Filter projects
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
    lastProject: [3]
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

// Initiate Fitler System
selectFilter()


// -------- methods -------- //

// Hide projects that don't contain all IDs in filterList
function hideProjects() {
    Object.keys(projectIDs).forEach((e, i) => {
        if (!arrayContains(projectIDs[e], filterList)) {
            if (project[i].classList.contains('hide')) {
                return false
            }
            project[i].classList.toggle('hide')
        }
    })
}

// Show projects that are currently filtered and contain all IDs in filterList
function showProjects() {
    Object.keys(projectIDs).forEach((e, i) => {
        if (project[i].classList.contains('hide') && arrayContains(projectIDs[e], filterList)) {
            project[i].classList.toggle('hide')
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
        slider.classList.remove('closed')
        controller.classList.remove('fa-chevron-down')
        controller.classList.add('fa-chevron-up')
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
            !slider.classList.contains('closed')
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
        if (item.classList.contains('hide')) {
            item.classList.toggle('hide')
        }
    })

}