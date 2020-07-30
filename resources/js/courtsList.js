const carouseIndicator = document.getElementsByClassName('carousel-indicators');
const carouseInner = document.getElementsByClassName('carousel-inner');

function createCourtIntro(wrapper, OK, item) {
    return [
        `<div class="carousel-item ${OK}">
            <div class="overlay"></div>
            <img class="d-block w-100" src=" ${img}">
            <a href="# ${no} ">
                <div class="carousel-caption d-md-block">
                    <h5> ${ courtName}</h5>
                    <p> ${ courtDesc}</p>
                </div>
            </a>
        </div>`
    ];
}

let OK = "";
for (let i = 0; i < NUM_OF_COURTS; i++) {
    const dataTarget = document.createElement('li');
    dataTarget.setAttribute('data-target', '#carouselExampleIndicators');
    dataTarget.setAttribute('data-slide-to', i);
    carouseIndicator[0].appendChild(dataTarget);

    if (i == NUM_OF_COURTS - 1) {
        OK = ' active';
        dataTarget.classList.add('active');
    }
    const carouselItem = createCourtIntro(
        OK, i,
        courtInfo.image,
        courtInfo.name,
        courtInfo.description
    );
    carouseInner[0].innerHTML += carouselItem;
}