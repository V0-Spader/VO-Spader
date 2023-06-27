// question 1
document.getElementById('container');

// question 2
document.querySelector('#container');

// question 3
document.querySelectorAll('.second');

// question 4
document.querySelector('ol .third');

// question 5
let theDiv = document.querySelector('#container');
theDiv.innerText = 'Hello';

// question 6
let footClan = document.querySelector('.footer');
footer.classList.add('main');

// question 7
let footClan = document.querySelector('.footer');
footer.classList.remove('main');

// question 8
let newLi = document.createElement('li');

// question 9
newLi.innerText = 'four';

// question 10
let updatedList = document.querySelector('ul');
updatedList.appendChild(newLi)

// question 11
let greenLiInOl = document.querySelectorAll('ol li');
for (let i = 0; i < greenLiInOl.length; i++){
    greenLiInOl[i].style.backgroundColor = 'green';
}

// question 12
let footClan = document.querySelector('.footer');
footClan.remove();