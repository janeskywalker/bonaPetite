const state = {

}

const navLinks = document.querySelectorAll('nav li');
const form = document.querySelector("form");

// ADD NAV ACTIVE CLASS
navLinks.forEach(link => {
  if (window.location.pathname === link.firstChild.getAttribute('href')) {
    link.classList.add('active')
  }
});

form && form.addEventListener('submit', (e)=> {
  [...document.querySelectorAll(".alert")].forEach(alert => {
      alert.parentNode.removeChild(alert);
  });

  // get elements
  // validate form inputs
  [...form.elements].forEach(input => {
    if(input.type !== 'submit' && input.value === "") {
      e.preventDefault();
      input.classList.add('input-error');
      input.insertAdjacentHTML("afterend",`
      <div class="alert alert-${input.type}">
      Please enter ${input.type}
      </div>
      `);
    }
  });
});

document.addEventListener('focus',(e) => {
  e.target.classList.remove('input-error');
  const inputMessage = document.querySelector(`.alert-${e.target.type}`);
    inputMessage && inputMessage.parentNode.removeChild(inputMessage);
}, true);

const getAllItems = () => {
  // $.ajax({
  //   method: "GET",
  //   url: "/getItems",
  //   success: (response)=> {
  //     console.log(response);
  //   },
  //   error: (e) => {
  //     console.log(e);
  //   }
  // })
}

getAllItems();
