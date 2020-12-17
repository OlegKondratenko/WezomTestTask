let loginModal = document.querySelector('#login-modal');
let callbackModal = document.querySelector('#callback-modal');
let overlay = document.querySelector('.modal-overlay');
let loginForm = document.querySelector('#authentication')
let inputs = document.querySelectorAll('input');
let closeBtns = document.querySelectorAll('.modal-window .exit');
let modalButtons = document.querySelectorAll('[data-modal]');
let callbackFrom = document.querySelector('#callback-form');
let phoneInput = callbackFrom.querySelector('[type="tel"]');
let subscribeForm = document.querySelector('#subscribe');
let addToFavoriteLinks = document.querySelectorAll('.section__catalog-card-match-favorites span')
let addToCompareLinks = document.querySelectorAll('.section__catalog-card-match-compare span.link')

const ShowModal = ({ target }) => {
    let btn = target.closest('[data-modal]');
    if (btn.dataset.modal === 'login') {
        loginModal.classList.add('show');
    } else if (btn.dataset.modal === 'callback') {
        callbackModal.classList.add('show');

    } else {
        console.log('Set right dataset for modal activator btn')
    }
    overlay.classList.add('show');
}
const showIncrementedCounter = (elem) => {
    elem.dataset.counter = parseInt(elem.dataset.counter) + 1;
    elem.classList.add('counter');
}
const addToCompare = ({ target }) => {
    if (target.dataset.clicked === '1') {
        return 1
    }
    target.setAttribute("data-clicked", "1");
    target.innerHTML = "В сравнении";
    const copmareDiv = document.querySelector('.header-compare');
    showIncrementedCounter(copmareDiv);
}
const addToFavorite = ({ target }) => {
    if (target.dataset.clicked === '1') {
        return 1
    }
    target.setAttribute("data-clicked", "1");
    target.innerHTML = "В избранном";
    const copmareDiv = document.querySelector('.header-favorite');
    showIncrementedCounter(copmareDiv);
}
const addToBucket = ({ target }) => {
    if (target.dataset.clicked === '1') {
        return 1
    }
    target.setAttribute("data-clicked", "1");
    const copmareDiv = document.querySelector('.header-bucket');
    showIncrementedCounter(copmareDiv);
}

const HideModal = () => {
    document.querySelector(".modal-window.show").classList.remove('show');
    overlay.classList.remove('show');
}
const validateEmail = (email) => {
    let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (reg.test(email) == false) {
        return false;
    }
    return true;
}
const validateLength = (str, num) => {
    if (str.length < num) {
        return false;
    }
    return true
}
const validatePhoneNumber = (str) => {
    let reg = /^\+(\d){2}\((\d){3}\)(\d){3}\-(\d){2}\-(\d){2}$/;
    if (reg.test(str) == false) {
        return false;
    }
    return true;
}
const makeWarning = (elem, warningMessage) => {
    elem.classList.add("error");
    let parent = elem.closest('div');
    parent.classList.add('warningMessage');
    parent.setAttribute('data-warning', warningMessage);
}
const removeWarning = (elem) => {
    elem.classList.remove("error");
    let parent = elem.closest('div');
    parent.classList.remove('warningMessage');
}
let onPhoneChange = (e) => {
    let x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
    e.target.value = (x[1] ? '+' + x[1] : '') + (x[2] ? "(" + x[2] : '') + (x[3] ? ")" + x[3] : '') + (x[4] ? "-" + x[4] : '') + (x[5] ? "-" + x[5] : '')
}
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const minPassLength = 4;
    let addressInput = loginForm.querySelector('#email');
    let passInput = loginForm.querySelector('#pass');
    if (!validateLength(passInput.value, minPassLength)) {
        makeWarning(passInput, `password must be longer than ${minPassLength} characters`);
        return false
    }
    if (!validateEmail(addressInput.value)) {
        makeWarning(addressInput, 'incorrect email');
        return false
    }
    e.target.reset();
    HideModal();
})
callbackFrom.addEventListener('submit', (e) => {
    e.preventDefault();
    let phoneInput = callbackFrom.querySelector('[type="tel"]');
    if (!validatePhoneNumber(phoneInput.value)) {
        makeWarning(phoneInput, "Please, enter valid phone number")
    }
    e.target.reset();
    HideModal();
})
subscribeForm.addEventListener('submit', (e) => {
    e.preventDefault()
    alert('Вы успешно подписаны на рассылку')
})


addToCompareLinks.forEach(e => e.addEventListener('click', addToCompare));
addToFavoriteLinks.forEach(e => e.addEventListener('click', addToFavorite));

phoneInput.addEventListener('input', onPhoneChange);
modalButtons.forEach(e => e.addEventListener('click', ShowModal));
closeBtns.forEach(e => e.addEventListener('click', HideModal));
overlay.addEventListener('click', HideModal);
inputs.forEach(e => e.addEventListener('focus', removeWarning.bind(null, e)));
inputs.forEach(e => e.addEventListener('input', removeWarning.bind(null, e)));