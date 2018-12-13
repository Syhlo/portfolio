// Version: 0.8.1

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
    sliderState()
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
const filterTags =
    document.querySelectorAll('.filter')


// storage variable
let data =
    JSON.parse(sessionStorage.getItem('data')) || []


// Filter selection logic
function selectFilter() {
    for (let i = 0; i < filterTags.length; i++) {
        // Reload selected filters & slider state
        restoreData(i, filterTags[i])
        filterTags[i].addEventListener('click', () => {
            // Visual selection
            const target =
                event.currentTarget
            target.classList.toggle('is-info')

            // Store locally
            selectedState(i, target)

            // Project filter
            filterItems(i)
            filteredState()
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
let filterList = [null, null, null, null, null]


// Projects on site
let project = document.getElementsByName('project');


function filterItems(index) {
    // Index is already present
    if (index === filterList[index]) {
        filterList[index] = null
        showProjects(index)
    }
    else {
        filterList[index] = index
        hideProjects(index)
    }
}


// -------- methods -------- //

function hideProjects() {
    Object.keys(projectIDs).forEach((e, i) => {
        // projectIDs array does not contain all filterList values
        if (!compareArrays(projectIDs[e], filterList)) {
            if (project[i].classList.contains('filtered')) {
                return
            }
            project[i].classList.toggle('filtered')
        }
    })
}


function showProjects() {
    Object.keys(projectIDs).forEach((e, i) => {
        // project contains filtered & projectIDs contains all filterList values
        if (project[i].classList.contains('filtered') && compareArrays(projectIDs[e], filterList)) {
            project[i].classList.toggle('filtered')
        }
    })
}


// Used to see if projectIDs arrays contain filterList array values
function compareArrays(superset, subset) {
    if (0 === subset.length) { return false; }
    return removeNull(subset).every(value =>
        (superset.indexOf(value) >= 0))
}


// Removes all falsy values from filterList array
function removeNull(array) {
    const arr = array.filter(value =>
        value === 0 ? true : value)
    return arr
}

// Initiate
selectFilter()




// ------------------------- Storage ------------------------- //

// Clear filters button
document.querySelector('.clear-filters').addEventListener('click', clearFilters)


function restoreData(index, target) {
    // Restore filter selections
    if (data[index] && JSON.parse(data[index]).selected === true) {
        target.classList.toggle('is-info')
    }

    // Restore slider state
    if (data[6] && JSON.parse(data[6]).sliderOpen === true) {
        sliderC.remove('closed')
        sliderC.add('opened')
        control.remove('fa-chevron-down')
        control.add('fa-chevron-up')
    }

    // Restore filtered projects
    // if (data[7]) {
    //     filterList = JSON.parse(data[7]).list
    //     filterList.forEach((value) => {
    //         filterItems(value)
    //     })
    // }
}


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
    data[7] = item
    sessionStorage.setItem('data', JSON.stringify(data))
}


function sliderState() {
    const item = JSON.stringify({
        sliderOpen:
            !sliderC.contains('closed')
    })
    data[6] = item
    sessionStorage.setItem('data', JSON.stringify(data))
}


function clearFilters() {
    data = []
    sessionStorage.clear()
    filterTags.forEach((item => {
        if (item.classList.contains('is-info')) {
            item.classList.toggle('is-info')
        }
    }))
    filterList = []
    project.forEach((item) => {
        if (item.classList.contains('filtered')) {
            item.classList.toggle('filtered')
        }
    })
    sliderState()
}