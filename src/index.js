// write your code here
// js 

// See all ramen images in the div with the id of ramen-menu. 
// When the page loads, request the data from the server to get 
// all the ramen objects. Then, display the image for each of the
// ramen using an img tag inside the #ramen-menu div.
// Click on an image from the #ramen-menu div and see all the 
// info about that ramen displayed inside the #ramen-detail div
// and where it says insert comment here and insert rating here.
// Create a new ramen after submitting the new-ramen form. The
// new ramen should be added to the#ramen-menu div. The new ramen
// does not need to persist; in other words, if you refresh the
// page, it's okay that the new ramen is no longer on the page.

const ramenMenu = document.querySelector('#ramen-menu')
const ramenDetail = document.querySelector('#ramen-detail')
const newRamenForm = document.querySelector('#new-ramen')

fetch('http://localhost:3000/ramens')
    .then(response => response.json())
    .then(ramenArray => {
        ramenArray.forEach(ramen => {
            renderRamen(ramen)
        })
    }
)

function renderRamen(ramen) {
    const img = document.createElement('img')
    img.src = ramen.image
    img.dataset.id = ramen.id
    ramenMenu.append(img)
}

ramenMenu.addEventListener('click', event => {
    if (event.target.matches('img')) {
        const id = event.target.dataset.id
        fetch(`http://localhost:3000/ramens/${id}`)
            .then(response => response.json())
            .then(ramen => {
                renderRamenDetail(ramen)
            })
    }
})

function renderRamenDetail(ramen) {
    const img = ramenDetail.querySelector('img')
    img.src = ramen.image
    img.alt = ramen.name

    const h2 = ramenDetail.querySelector('h2')
    h2.textContent = ramen.name

    const h3 = ramenDetail.querySelector('h3')
    h3.textContent = ramen.restaurant

    const rating = document.querySelector('#rating-display')
    rating.textContent = ramen.rating

    const comment = document.querySelector('#comment-display')
    comment.textContent = ramen.comment

newRamenForm.addEventListener('submit', event => {
    event.preventDefault()
    const name = event.target.name.value
    const restaurant = event.target.restaurant.value
    const image = event.target.image.value
    const rating = event.target.rating.value
    const comment = event.target['new-comment'].value

    const newRamen = { name, restaurant, image, rating, comment }

    fetch('http://localhost:3000/ramens', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newRamen)
    })
        .then(response => response.json())
        .then(ramen => {
            renderRamen(ramen)
            event.target.reset()
        })
})


