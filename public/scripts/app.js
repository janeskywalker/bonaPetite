const state = {

}

const navLinks = document.querySelectorAll('nav li');
const form = document.querySelector("form");

navLinks.forEach(link => {
  if (window.location.pathname === link.firstChild.getAttribute('href')) {
    link.classList.add('active')
  }
});

form && form.addEventListener('submit', (e) => {
  [...document.querySelectorAll(".alert")].forEach(alert => {
    alert.parentNode.removeChild(alert);
  });

  [...form.elements].forEach(input => {
    if (input.type !== 'submit' && input.value === "") {
      e.preventDefault();
      input.classList.add('input-error');
      input.insertAdjacentHTML("afterend", `
      <div class="alert alert-${input.type}">
      Please enter ${input.type}
      </div>
      `);
    }
  });
});

document.addEventListener('focus', (e) => {
  e.target.classList.remove('input-error');
  const inputMessage = document.querySelector(`.alert-${e.target.type}`);
  inputMessage && inputMessage.parentNode.removeChild(inputMessage);
}, true);
