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
  [...document.querySelectorAll(`.alert`)].forEach(alert => {
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

// API testing for search functions
const showPlans = document.querySelector('#showPlans');
const search = document.querySelector('#search-name');
showPlans.addEventListener('click', (e)=> {
  let name = search.value;
  $.ajax({
    method:"GET",
    url: `https://api.nal.usda.gov/ndb/search/?format=json&q=${name}&sort=n&max=3&offset=0&api_key=DEMO_KEY#`,
    success: nameSearchSuccess,
    error: (e1,e2,e3) => {
      console.log(e2);
    }
  })
})

const nameSearchSuccess = (response) => {
  for(item of response.list.item) {
    console.log(item);
  }
}
