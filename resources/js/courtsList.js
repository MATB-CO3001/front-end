import "./dummyData";

const carouseIndicator = document.getElementsByClassName('carousel-indicators');
const carouseInner = document.getElementsByClassName('carousel-inner');

for (let i = 0; i < NUM_OF_COURTS; i++) {
    const dataTarget = document.createElement('li');
    dataTarget.setAttribute('data-target', '#carouselExampleIndicators');
    dataTarget.setAttribute('data-slide-to', i);
    carouseIndicator[0].appendChild(dataTarget);

    const carouselItem = document.createElement('div');
    carouselItem.classList.add('carousel-item');
    const overlay = document.createElement('div');
    overlay.setAttribute('class', 'overlay');
    carouselItem.appendChild(overlay);
    const img = document.createElement('img');
    img.classList.add('d-block', 'w-100');
    img.setAttribute('src', courtInfo.image);
    carouselItem.appendChild(img);
    const carouselCaption = document.createElement('div');
    carouselCaption.classList.add('carousel-caption', 'd-md-block');
    const courtName = document.createElement('h5');
    courtName.appendChild(document.createTextNode(courtInfo.name));
    const courtDesc = document.createElement('p');
    courtDesc.appendChild(document.createTextNode(courtInfo.description));
    carouselCaption.appendChild(courtName);
    carouselCaption.appendChild(courtDesc);
    carouselItem.appendChild(carouselCaption);
    carouseInner[0].appendChild(carouselItem);

    if (i == 0) {
        dataTarget.classList.add('active');
        carouselItem.classList.add('active');
    }
}
