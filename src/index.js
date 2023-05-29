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

    const name = ramenDetail.querySelector('h2')
    name.textContent = ramen.name

    const restaurant = ramenDetail.querySelector('h3')
    restaurant.textContent = ramen.restaurant

    const rating = ramenDetail.querySelector('#rating-display')
    rating.textContent = ramen.rating

    const comment = ramenDetail.querySelector('#comment-display')
    comment.textContent = ramen.comment

    const ratingForm = ramenDetail.querySelector('#rating-form')
    ratingForm.dataset.id = ramen.id

    const commentForm = ramenDetail.querySelector('#comment-form')
    commentForm.dataset.id = ramen.id
}

ratingForm.addEventListener('submit', event => {
    event.preventDefault()
    const id = event.target.dataset.id
    const rating = event.target.rating.value

    fetch(`http://localhost:3000/ramens/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ rating })
    })
        .then(response => response.json())
        .then(updatedRamen => {
            renderRamenDetail(updatedRamen)
        })
})

commentForm.addEventListener('submit', event => {
    event.preventDefault()
    const id = event.target.dataset.id
    const comment = event.target.comment.value

    fetch(`http://localhost:3000/ramens/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ comment })
    })
        .then(response => response.json())
        .then(updatedRamen => {
            renderRamenDetail(updatedRamen)
        })
})

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
        .then(newRamen => {
            renderRamen(newRamen)
            event.target.reset()
        })
})

