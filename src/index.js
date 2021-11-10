document.addEventListener('DOMContentLoaded', function() {
    fetchDogs();
    fetchBreeds();
    listenToMenu();
  })

console.log('%c HI', 'color: firebrick');

function fetchDogs(){
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    fetch(imgUrl)
    .then(resp => resp.json())
    .then(json => {
        const images = [...json.message];
        // making an array of the response which is nested
        // the return is json[message[images]] which is why we are using .message to grab the images
        renderDogs(images);
    })
}

function renderDogs(images){
    const imageContainer = document.getElementById("dog-image-container");
    images.forEach((imageUrl) => {
        const img = document.createElement('img');
        img.src = imageUrl;
        imageContainer.appendChild(img);
    });
}

function fetchBreeds(){
    const breedUrl = 'https://dog.ceo/api/breeds/list/all';
    fetch(breedUrl)
    .then(resp => resp.json())
    .then(json => {
        for (const breed in json.message){
            // creating a variable for each response in json.message
        listBreeds(breed);
        }
    });
}

function listBreeds(breed){
    const breedList = document.getElementById("dog-breeds");
    const li = document.createElement('li');
    li.innerText = breed;
    breedList.appendChild(li);
    li.addEventListener('click', selection);
}

function selection(e){
    if (e.target.style.color == "") {
        e.target.style.color = "aqua";
    } else {
        e.target.style.color = "";
    }
}

function listenToMenu() {
    const dropDown = document.querySelector('#breed-dropdown')
    dropDown.addEventListener('change', filterBreeds)
}
  
function filterBreeds(e) {
    const letter = e.target.value
    console.log(e.target.value)
    const breedList = document.querySelector("#dog-breeds")
    while (breedList.firstChild) {
        breedList.removeChild(breedList.firstChild)
    }
    fetch("https://dog.ceo/api/breeds/list/all")
    .then(response => response.json())
    .then(json => {
        for (const breed in json.message) {
        if (breed.startsWith(letter)) {
            listBreeds(breed)
        }
        }
    })
}