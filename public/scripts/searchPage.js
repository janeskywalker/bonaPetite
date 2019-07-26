const showPlans = document.querySelector('#showPlans');
const search = document.querySelector('#search-name');

showPlans.addEventListener('click', (e) => {

  //empty the search result when user clicks search again
  const container = document.querySelector('#plans');
  while(container.hasChildNodes()) {
    container.removeChild(container.lastChild);
  }

  let name = search.value;
  $.ajax({
    method: "GET",
    url: `https://api.nal.usda.gov/ndb/search/?format=json&q=${name}&sort=n&max=3&offset=0&api_key=qybBwBIXCzpjN5fsqtBZXHTfMscteYbRU1Z2oC7Z`,
    success: nameSearchSuccess,
    error: (e1, e2, e3) => {
      console.log(e2);
    }
  })
});

const plans = document.querySelector("#plans");
const itemValue = {
  Protein: 0,
  Fat: 0,
  Carbohydrate: 0,
  serving: ""
};

// when the user search with name of the item, append information
const nameSearchSuccess = (response) => {

  for (item of response.list.item) {
    const ndbno = item.ndbno;
    $.ajax({
      method: "GET",
      url: `https://api.nal.usda.gov/ndb/V2/reports?ndbno=${ndbno}&type=f&format=json&api_key=qybBwBIXCzpjN5fsqtBZXHTfMscteYbRU1Z2oC7Z`,
      dataType: "json",
      success: (response) => {
        const nutrients = response.foods[0].food.nutrients;
        itemValue.serving = `(${nutrients[0].measures[0].qty} ${nutrients[0].measures[0].label}) or (${nutrients[0].measures[0].value}${nutrients[0].measures[0].eunit})`;
        for (fact of nutrients) {
          if (fact.name == "Protein") {
            itemValue.protein = fact.value;
          }
          if (fact.name == "Total lipid (fat)") {
            itemValue.fat = fact.value;
          }
          if (fact.name == "Carbohydrate, by difference") {
            itemValue.carbohydrate = fact.value;
          }
          if (fact.name == "Energy") {
            itemValue.calories = fact.value;
          }
        }
      },
      async: false,
      error: (e1, e2, e3) => {
        console.log(e2);
      }
    })
    plans.insertAdjacentHTML('beforeend', `
    <div class="search-result">
    <table>
    <tr>
    <th>Name</th>
    <th>Company</th>
    <th>Ndbno</th>
    </tr>
    <th>${item.manu}</th>
    <th>${item.name}</th>
    <th>${item.ndbno}</th>
    <tr>
    </tr>
    </table>
    <div>Protein: ${itemValue.protein}</div>
    <div>Fat: ${itemValue.fat} g</div>
    <div>Carbohydrate:${itemValue.carbohydrate}</div>
    <div>Calories:${itemValue.calories}</div>
    <div>Serving size: ${itemValue.serving} </div>
    <button class="addSelectedButton" id="${item.ndbno}"> Add </button>
    </div>`);
    const itemButton = document.getElementById(`${item.ndbno}`);

    const itemFacts = {
      name: item.name,
      carbohydrate: itemValue.carbohydrate,
      fat: itemValue.fat,
      protein: itemValue.protein,
      calories: itemValue.calories,
      serving: itemValue.serving
    }

    itemButton.addEventListener('click', (e) => {
      $.ajax({
        method: "POST",
        url: "/profile/newPlan",
        data: JSON.stringify(itemFacts),
        contentType: 'application/json',
        success: () => {
          console.log("success");
        },
        error: (e) => {
          console.log(e);
        }
      })
    })
  }
};
