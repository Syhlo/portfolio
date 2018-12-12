// #-----------------#
// #  Slider Toggle  #
// #-----------------#
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



// #-----------------------------#
// #  Navigation is-active link  #
// #-----------------------------#
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



// #------------------#
// #  Select filters  #
// #------------------#
const filters =
    document.querySelectorAll('.filter')
let storeFilters =
    JSON.parse(localStorage.getItem('selected')) || []

// Filter select logic
function filter() {
    for (let i = 0; i < filters.length; i++) {
        // Set selected on reload
        setSelected(i, filters[i])

        filters[i].addEventListener('click', () => {
            // Set selected
            const target =
                event.currentTarget
            target.classList.toggle('is-info')

            // Store locally
            storeSelected(i, target)

            // disabled until working
            // _filter(i)
        })
    }
}

// Initiate
filter()



// #-----------------------#
// #  Filter the Projects  #
// #-----------------------#
const projects = {
    portfolio: [0, 1, 2, 4],
    reactApp: [5],
    anotherApp: [5],
    lastProject: []
}

// Filtered IDs
let filtered = []

// Index of projects on site
let project = document.getElementsByName('project');

function _filter(index) {
    // Manage filtered results
    if (index === filtered[index]) {
        filtered[index] = NaN

    } else {
        filtered[index] = index
        showProjects(index)
        hideProjects(index)
    }

    console.log(filtered)


}

function hideProjects(index) {
    // For each project in projects
    Object.keys(projects).forEach((e, i) => {
        // if the project's array does not contain every element from filtered array & filtered[index] is not NaN
        if (!compareArrays(projects[e], filtered) && filtered[index] === index) {
            // filter those items out
            project[i].classList.toggle('filtered')
        }
    })
}

function showProjects(index) {
    Object.keys(projects).forEach((e, i) => {
        if (!filtered[index] === index && project[i].classList.contains('filtered')) {
            project[i].classList.toggle('filtered')
        }
    })
}

function compareArrays(superset, subset) {
    if (0 === subset.length) {
        return false;
    }
    return subset.every(function (value) {
        return (superset.indexOf(value) >= 0);
    });
}



// #-----------------#
// #  Local Storage  #
// #-----------------#
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


// Clear localStorage & selected filters
function clearFilters() {
    storeFilters = []
    localStorage.clear()
    filters.forEach((elem) => {
        if (elem.classList.contains('is-info')) {
            elem.classList.toggle('is-info')
        }
    })
    filtered = [];
    storeSliderState()
}