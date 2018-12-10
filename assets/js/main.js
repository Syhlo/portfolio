
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
// #  Filter select and storage  #
// #-----------------------------#
const filter =
    document.querySelectorAll('.filter')
const tags =
    document.querySelector('.is-tags')
const storeFilters =
    JSON.parse(localStorage.getItem('selected')) || [];

// Main filters logic
function filters() {
    for (let i = 0; i < filter.length; i++) {
        // Set selected on reload
        setSelected(i, filter[i])

        filter[i].addEventListener('click', () => {
            // Set selected
            const target =
                event.currentTarget;
            target.classList.toggle('is-info')

            // Store locally
            storeSelected(i, target)
        })
    }
}

function storeSelected(index, target) {
    const item =
        JSON.stringify({
            selected:
                target.classList.contains('is-info')
        })
    storeFilters[index] = item
    localStorage.setItem('selected', JSON.stringify(storeFilters))
}

function setSelected(index, target) {
    if (storeFilters[index] && JSON.parse(storeFilters[index]).selected === true) {
        target.classList.toggle('is-info');
    }
}

filters()