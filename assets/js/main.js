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
    control.toggle('fa-chevron-down')
    control.toggle('fa-chevron-up')
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



// #-----------------------------#
// #  Filter select and storage  #
// #-----------------------------#
const filter =
    document.querySelectorAll('.filter')
const tags =
    document.querySelector('.is-tags')
let storeFilters =
    JSON.parse(localStorage.getItem('selected')) || []
// Clear Filters button
document.querySelector('.clear-filters').addEventListener('click', clearFilters)

// Main filters logic
function filters() {
    for (let i = 0; i < filter.length; i++) {
        // Set selected on reload
        setSelected(i, filter[i])

        filter[i].addEventListener('click', () => {
            // Set selected
            const target =
                event.currentTarget
            target.classList.toggle('is-info')

            // Store locally
            storeSelected(i, target)
        })
    }
}

// Store locally
function storeSelected(index, target) {
    const item =
        JSON.stringify({
            selected:
                target.classList.contains('is-info')
        })
    storeFilters[index] = item
    localStorage.setItem('selected', JSON.stringify(storeFilters))
}

// Set filters as selected
function setSelected(index, target) {
    if (storeFilters[index] && JSON.parse(storeFilters[index]).selected === true) {
        target.classList.toggle('is-info')
    }
}

// Clear localStorage & selected filters
function clearFilters() {
    storeFilters = []
    localStorage.clear()
    filter.forEach((elem) => {
        if (elem.classList.contains('is-info')) {
            elem.classList.toggle('is-info')
        }
    })
}

// init
filters()