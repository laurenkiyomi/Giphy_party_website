/*CONST VARIABLES*/
const MY_API_KEY = "55hhPS3sSZDvYFrWRpCHeS8fTutClh8J"
const limit = 9
const rating = "g"
const searchBar = document.querySelector("#search-bar")
const search = document.querySelector("#search")
const results = document.querySelector("#results")
const form = document.querySelector("#form")
const input = document.querySelector("#gif-search")
const morebutton = document.querySelector("#morebutton")
var pages = 0
var val = ""

form.addEventListener('submit', (event) => {
    pages = 1
    event.preventDefault();
    val = input.value
    console.log(val)
    getResults(val)
})

morebutton.addEventListener('click', (event) => {
    pages += 1
    getResults(val)
})

function hideMore() {
    morebutton.classList.toggle("hidden", true)
}

function showMore() {
    morebutton.classList.toggle("hidden", false)
}

async function getResults(val) {
    try {
        var offset = pages*limit
        const response = await fetch(`http://api.giphy.com/v1/gifs/search?api_key=${MY_API_KEY}&q=${val}$&limit=${offset}`);
        const result = await response.json();
        // console.log(result.data)
        displayResults(result.data)

        if (pages == 1) {
            showMore()
        }
    } catch(err) {
        console.error(err)
    }
}

function  displayResults(data) {
    results.innerHTML = ``
    data.forEach((gif) => {
        results.innerHTML += `
        <div class="gif-img">
        <img  src='${gif.images.original.url}'/>
        </div>
    `
    })

    
}

/*window.onload = function () {
    // execute your functions here to make sure they run as soon as the page loads
    getResults()
}*/



