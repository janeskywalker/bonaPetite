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
