const urlAnimetop = 'https://api.jikan.moe/v4/seasons/now '
fetch(urlAnimetop)
    .then(response => response.json())
    .then(response => {
        const content = document.getElementById('animetop')
        for (let i = 0; i < 11; i++) {
            content.innerHTML += `  
            <li class="card">
            <div class="img"><img src="${response.data[i].images.jpg.image_url}" alt="img" draggable="false"></div>
            <h2 class="d-inline-block text-truncate" style="max-width:100%;">${response.data[i].title}</h2>
        </li>
            `
        }
        const wrapper = document.querySelector(".wrapper");
        const carousel = document.querySelector(".carousel");
        const firstCardWidth = carousel.querySelector(".card").offsetWidth;
        const arrowBtns = document.querySelectorAll(".wrapper i");
        const carouselChildrens = [...carousel.children];

        let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;
        let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

        carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
            carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
        });

        carouselChildrens.slice(0, cardPerView).forEach(card => {
            carousel.insertAdjacentHTML("beforeend", card.outerHTML);
        });

        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");

        arrowBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
            });
        });

        const dragStart = (e) => {
            isDragging = true;
            carousel.classList.add("dragging");
            startX = e.pageX;
            startScrollLeft = carousel.scrollLeft;
        }

        const dragging = (e) => {
            if (!isDragging) return; 
            carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
        }

        const dragStop = () => {
            isDragging = false;
            carousel.classList.remove("dragging");
        }

        const infiniteScroll = () => {
            if (carousel.scrollLeft === 0) {
                carousel.classList.add("no-transition");
                carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
                carousel.classList.remove("no-transition");
            }
            else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
                carousel.classList.add("no-transition");
                carousel.scrollLeft = carousel.offsetWidth;
                carousel.classList.remove("no-transition");
            }

            clearTimeout(timeoutId);
            if (!wrapper.matches(":hover")) autoPlay();
        }

        const autoPlay = () => {
            if (window.innerWidth < 800 || !isAutoPlay) return;
            timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
        }
        autoPlay();

        carousel.addEventListener("mousedown", dragStart);
        carousel.addEventListener("mousemove", dragging);
        document.addEventListener("mouseup", dragStop);
        carousel.addEventListener("scroll", infiniteScroll);
        wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
        wrapper.addEventListener("mouseleave", autoPlay);



    })


fetch(urlAnimetop)
    .then(response => response.json())
    .then(response => {
        const content = document.getElementById('animetopp')
        for (let i = 0; i < 12; i++) {
            content.innerHTML += `  
                
            <div class="col-6 col-md-4 col-lg-3 col-xl-2   kart">
            <a >
            <div class="poster">
                <p>${response.data[i].score}</p>
                <img src="${response.data[i].images.jpg.image_url}" alt="">
            </div>
            <h2 class="d-inline-block text-truncate" style="max-width: 100%;">${response.data[i].title}</h2>
            </a>
        </div>
            `
        }
    })
    .catch(err => console.error(err))



const urlAnimeon = 'https://api.jikan.moe/v4/top/anime'
fetch(urlAnimeon)
    .then(response => response.json())
    .then(response => {
        const urlAnimeon = 'https://api.jikan.moe/v4/top/anime'

        const content = document.getElementById('animeon')

        for (let i = 0; i < 12; i++) {
            content.innerHTML += `  
                <div class="col-6 col-md-4 col-lg-3 col-xl-2   kart">
                <a >
                        <div class="poster">
                            <p>${response.data[i].score}</p>
                            <img src="${response.data[i].images.jpg.image_url}" alt="">
                        </div>
                        <h2 class="d-inline-block text-truncate" style="max-width: 100%;">${response.data[i].title}</h2>
                        </a>
                    </div>
                    
                `
        }
    })
    .catch(err => console.error(err))






const form = document.querySelector('form')
form.addEventListener('submit', getAnimeData)

const API_URL = 'https://api.jikan.moe/v4';

function getAnimeData(e) {
    e.preventDefault()

    const animeName = document.getElementById('anime-name').value;

    fetch(`${API_URL}/anime?q=${animeName}&limit=4`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("anime-data").innerHTML = `
                <div class="col-12">
                    <h4>Arama sonuçları</h4>
                </div`;
            data.data.forEach(item => {
                const anime = item;
                const imageUrl = item.images;
                var bg = `
                    <div class="col-md-4 col-lg-3 kart">
                    <a >
                        <div class="poster">
                            <p>${anime.score}</p>
                            <img src="${imageUrl.jpg.image_url}" alt="">
                        </div>
                        <h2 class="d-inline-block text-truncate" style="max-width: 200px;">${anime.title}</h2>
                        </a>
                    </div>
                  
                
                `;
                document.getElementById('anime-data').insertAdjacentHTML("Beforeend", bg);


            })
        });

}

function ekle() {
    var link1 = document.getElementById("kay");
    link1.style.display = "none";
    fetch(urlAnimeon)
        .then(response => response.json())
        .then(response => {

            const content = document.getElementById('animeon')

            for (let i = 13; i < 25; i++) {
                content.innerHTML += `  
                <div class="col-6 col-md-4 col-lg-3 col-xl-2   kart">
                <a>
                        <div class="poster">
                            <p>${response.data[i].score}</p>
                            <img src="${response.data[i].images.jpg.image_url}" alt="">
                        </div>
                        <h2 class="d-inline-block text-truncate" style="max-width: 100%;">${response.data[i].title}</h2>
                        </a>
                    </div>
                    
                `
            }
        })
        .catch(err => console.error(err))
}


function eklee() {
    var link1 = document.getElementById("kayy");
    link1.style.display = "none";
    fetch(urlAnimetop)
        .then(response => response.json())
        .then(response => {
            const content = document.getElementById('animetopp')
            for (let i = 13; i < 25; i++) {
                content.innerHTML += `  
                            
                        <div class="col-6 col-md-4 col-lg-3 col-xl-2   kart">
                        <a>
                        <div class="poster">
                            <p>${response.data[i].score}</p>
                            <img src="${response.data[i].images.jpg.image_url}" alt="">
                        </div>
                        <h2 class="d-inline-block text-truncate" style="max-width: 100%;">${response.data[i].title}</h2>
                        </a>
                    </div>
                        `
            }
        })
        .catch(err => console.error(err))
}

function anime() {
    var link1 = document.getElementById("animetopp");
    link1.style.display = "none";
    var link1 = document.getElementById("animeon");
    link1.style.display = "none";
    var link1 = document.getElementById("kayy");
    link1.style.display = "none";
    var link1 = document.getElementById("kay");
    link1.style.display = "none";
    fetch(urlAnimetop)
        .then(response => response.json())
        .then(response => {
            const content = document.getElementById('anime');
            for (let i = 3; i == 3; i++) {
                content.innerHTML += `  
                    <div class="col-5 poster" >
                    <img src="${response.data[i].images.jpg.image_url}" width="100%" height="100%" alt="">
                </div>
                <div class="col-7 ac">
                    <h3>${response.data[i].title}</h3>
                    <br>
                    <h5>İmd puanı : ${response.data[i].score}</h5>
                    <h5>Türü : ${response.data[i].type}</h5>
                    <h5>Bölüm sayısı : ${response.data[i].episodes}</h5>
                    <br>
                    <p>${response.data[i].synopsis}</p>
                </div>
                <div class="col-12 ac">
                <button class="mt-2 btn btn-outline-secondary text-light"  onclick="geri()">Geri gel</button>
                </div>
                        `
            }
        })
        .catch(err => console.error(err))
}


function geri(){
    var link1 = document.getElementById("animetopp");
    link1.style.display = "block";
    var link1 = document.getElementById("animeon");
    link1.style.display = "block";
    var link1 = document.getElementById("kayy");
    link1.style.display = "block";
    var link1 = document.getElementById("kay");
    link1.style.display = "block";
    var link1 = document.getElementById("anime");
    link1.style.display = "none";
}