
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



// #-----------------#
// #  Filter select  #
// #-----------------#
const filter =
    document.querySelectorAll('.filter')
const tags =
    document.querySelector('.is-tags')
const storeFilters =
    JSON.parse(localStorage.getItem('selected')) || [];

for (let i = 0; i < filter.length; i++) {
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

// #------------------#
// #  Filter storage  #
// #------------------#

// Store the state of the tags
function storeSelected(index, target) {
    const item =
        JSON.stringify({
            selected:
                target.classList.contains('is-info')
        })
    storeFilters[index] = item
    localStorage.setItem('selected', JSON.stringify(storeFilters))
}

// Set selected tags on reload
function setSelected(index, target) {
    if (storeFilters[index] && JSON.parse(storeFilters[index]).selected === true) {
        target.classList.toggle('is-info');
    }
}