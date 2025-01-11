let key = "0ebbab37fb1248bcb2c39fad9e602a26"

const newsContainer = document.querySelector(".news-container")

const politicsBtn = document.querySelector(".politicsBtn")
const sportBtn = document.querySelector(".sports")
const technologyBtn = document.querySelector(".technology")

const searchInput = document.getElementById("search-input")
const searchBtn = document.getElementById("search-btn")
const searchTitle = document.querySelector(".s-title")

const fetchData = async(input) => {

    let res = await fetch(`https://newsapi.org/v2/everything?q=${input}&apikey=${key}`)
    let data = await res.json()
    // console.log(data)
    // searchTitle.textContent = "Search: " + input
    displayData(data)
}

function displayData(data) {
    console.log(data.articles)
    
    newsContainer.textContent = ""
    data.articles.forEach(d => {
        const dataDiv = document.createElement("div")
        dataDiv.classList.add("card")
        const imgEl = document.createElement("img")
        imgEl.src = d.urlToImage
        imgEl.classList.add("img")
        imgEl.alt = d.title
        const titleEl = document.createElement("h4")
        titleEl.textContent = d.title
        titleEl.classList.add("title")
        const contentEl = document.createElement("p")
        contentEl.textContent = d.content
        contentEl.classList.add("content")

        dataDiv.append(imgEl, titleEl, contentEl)
        newsContainer.appendChild(dataDiv)

        imgEl.addEventListener("click", () => {
            console.log("click")
            window.open(d.urlToImage)
        })
        dataDiv.addEventListener("click", () => {
            console.log("click")
            window.open(d.url)
        })

    })
}
function navClick(category) {
    if(category === "politics") {
        document.getElementById("politics").style.color = "rgba(140, 93, 250, 0.915)"
        document.getElementById("sports").style.color = "white"
         document.getElementById("technology").style.color = "white"
         searchTitle.textContent = category
    } 
    if(category === "sports") {
        document.getElementById("sports").style.color = "rgba(140, 93, 250, 0.915)"
        document.getElementById("politics").style.color = "white"
        document.getElementById("technology").style.color = "white"
        searchTitle.textContent = category
    }
    if(category === "technology") {
        document.getElementById("technology").style.color = "rgba(140, 93, 250, 0.915)"
        document.getElementById("sports").style.color = "white"
        document.getElementById("politics").style.color = "white"
        searchTitle.textContent = category
    }
    fetchData(category)
}

window.addEventListener("load", () => {
    fetchData("india")
})

searchBtn.addEventListener("click", () => {
    let inputText = searchInput.value
    searchTitle.textContent = inputText
        fetchData(inputText)
})