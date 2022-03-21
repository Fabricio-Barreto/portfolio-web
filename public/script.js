const menuMobile = document.querySelector('.menu-mobile')
const body = document.querySelector('body')
const navItem = document.querySelectorAll('.nav-item')
const contactForm = document.querySelector('#contactForm')
const item = document.querySelectorAll("[data-anime]")

let nome = document.getElementById('nome')
let email = document.getElementById('email')
let mensagem = document.getElementById('mensagem')

menuMobile.addEventListener('click', () => {
    menuMobile.classList.contains("bi-list") ? menuMobile.classList.replace("bi-list", "bi-x") : menuMobile.classList.replace("bi-x", "bi-list")

    body.classList.toggle("menu-nav-active")
}) 

navItem.forEach(item => {
    item.addEventListener("click", () => {
        if (body.classList.contains("menu-nav-active")) {
            body.classList.remove("menu-nav-active")
            menuMobile.classList.replace("bi-x", "bi-list")
        }
    })
})

// animation

const animeScroll = () => {
    const windowTop = window.pageYOffset + window.innerHeight * 0.85
    
    item.forEach(element => {
        if (windowTop > element.offsetTop) {
            element.classList.add("animate")
        } else {
            element.classList.remove("animate")
        }
    })
}

window.addEventListener("scroll", () => {
    animeScroll()
})


contactForm.addEventListener('submit', (e) => {
    e.preventDefault()

    let formData = {
        name: nome.value,
        email: email.value,
        message: mensagem.value
    }

    let xhr = new XMLHttpRequest()
    xhr.open('POST', '/');
    xhr.setRequestHeader('content-type', 'application/json')
    xhr.onload = function () {
        console.log(xhr.responseText)
        if (xhr.responseText == 'success') {
            alert('Email Enviado')
            nome.value = ''
            email.value = ''
            mensagem.value = ''
        } else {
            alert('Deu ruim!')
        }
    }

    xhr.send(JSON.stringify(formData))
})