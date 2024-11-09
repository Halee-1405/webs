const wrapper = document.querySelector(`.wrapper`);
const loginLink = document.querySelector(`.login-link`);
const logoutLink = document.querySelector(`.register-link`);

logoutLink.addEventListener(`click`, ()=> {
    wrapper.classList.add(`active`);
})

loginLink.addEventListener(`click`, ()=> {
    wrapper.classList.remove(`active`);
})