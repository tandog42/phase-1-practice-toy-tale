let addToy = false;
const addBtn = document.querySelector("#new-toy-btn");
const toyFormContainer = document.querySelector(".container");

  document.addEventListener("DOMContentLoaded", () => {
    const toyCollection = document.querySelector('#toy-collection')
  

fetch('http://localhost:3000/toys')
.then (resp => resp.json())
.then(toys => {
let toysHTML = toys.map(function(toy) {
return  `
<div class="card">
<h2>${toy.name}</h2>
<img src=${toy.image} class="toy-avatar" />
<p>${toy.likes} Likes</p>
<button data-id="${toy.id}"class="like-btn">Like ❤️</button>
</div>
`
})

toyCollection.innerHTML = toysHTML
})


 toyFormContainer.addEventListener('submit', function(e) {
  e.preventDefault()
   //console.log(e.target.name.value)
   //console.log(e.target.image.value)
const toyName = e.target.name.value
const toyImg = e.target.image.value
  fetch('http://localhost:3000/toys', {
  method: "POST",
  headers: {
"Content-Type": "application/json",
"Accept": "application/json"
},
body: JSON.stringify({
  name: toyName,
  image: toyImg,
  likes: 0
})
})
.then(r => r.json())
.then ( newToy => {
  let newToyHTML = `
  <div class="card">
  <h2>${newToy.name}</h2>
  <img src=${newToy.image} class="toy-avatar" />
  <p>${newToy.likes} Likes</p>
  <button data-id="${newToy.id}"class="like-btn">Like ❤️</button>
  </div>
  `

toyCollection.innerHTML += newToyHTML
})
 })



  

  toyCollection.addEventListener('click', (e) => {
    if (e.target.className === 'like-btn') {
let currentLikes =
parseInt(e.target.previousElementSibling.innerText)
let newLikes = currentLikes + 1
e.target.previousElementSibling.innerText = newLikes + " likes"

fetch(`http://localhost:3000/toys/${e.target.dataset.id}`, {
  method: "PATCH",
  headers:{
  "Content-Type": "application/json",
  Accept: "application/json"
},

body: JSON.stringify({
  "likes": newLikes,
})
})
  }  // Make a click event so when i click on the like button, The like increases by one
})
})

  
 addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }  
})