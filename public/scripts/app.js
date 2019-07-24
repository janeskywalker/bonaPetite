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

const plans = document.querySelector("#plans");

const nameSearchSuccess = (response) => {
  for(item of response.list.item) {
    console.log(item);
    plans.insertAdjacentHTML('beforeend',`
    <div>
    <table>
    <tr>
    <th>Name</th>
    <th>Company</th>
    <th>Ndbno</th>
    </tr>
    <th>${item.manu}</th>
    <th>${item.name}</th>
    <th>${item.ndbno} </th>
    <tr>
    </tr>
    <button class="addSelectedButton" id="${item.ndbno}"> Add </button>
    </table>
    </div>`);
    const itemButton = document.getElementById(`${item.ndbno}`);

    itemButton.addEventListener('click', (e)=> {
        const ndbno = e.target.id;
      $.ajax({
        method:"GET",
        url: `https://api.nal.usda.gov/ndb/V2/reports?ndbno=${ndbno}&type=f&format=json&api_key=DEMO_KEY#`,
        success: itemInfoOnSuccess,
        error: (e1,e2,e3) => {
          console.log(e2);
        }
      })
    })

  }

}

const itemInfoOnSuccess = (response) => {
  const nutrients = response.foods[0].food.nutrients;
  const output = {};
  for(item of nutrients) {
    output[item.name] = [item.value]
  }
  console.log(output);
}

//----------- Jane event listener --------------//

// const addItemInput = document.querySelector('#add-item-input')
//
// const addItemButton = document.querySelector('#add-item-button')
//
// console.log({addItemInput, addItemButton})
//
// addItemButton.addEventListener('click', (evt)=>{
//     console.log(addItemInput.value)
// })
//
// const planContainer = document.querySelector('#plan-container')
//
// planContainer.innerText = addItemInput.value
//
// console.log(planContainer)
