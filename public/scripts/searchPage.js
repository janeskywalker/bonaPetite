const showPlans = document.querySelector('#showPlans');
const search = document.querySelector('#search-name');


showPlans.addEventListener('click', (e)=> {
  let name = search.value;
  $.ajax({
    method:"GET",
    url: `https://api.nal.usda.gov/ndb/search/?format=json&q=${name}&sort=n&max=3&offset=0&api_key=qybBwBIXCzpjN5fsqtBZXHTfMscteYbRU1Z2oC7Z`,
    success: nameSearchSuccess,
    error: (e1,e2,e3) => {
      console.log(e2);
    }
  })
})

const plans = document.querySelector("#plans");
const itemValue = {
    Protein: 0,
    Fat: 0,
    Carbohydrate: 0
};


// when the user search with name of the item, append information
const nameSearchSuccess = (response) => {

  for(item of response.list.item) {
    const ndbno = item.ndbno;
    $.ajax({
      method:"GET",
      url: `https://api.nal.usda.gov/ndb/V2/reports?ndbno=${ndbno}&type=f&format=json&api_key=qybBwBIXCzpjN5fsqtBZXHTfMscteYbRU1Z2oC7Z`,
      dataType: "json",
      success: (response) => {
        const nutrients = response.foods[0].food.nutrients;
        console.log(`${nutrients[0].measures[0].qty} ${nutrients[0].measures[0].label} or ${nutrients[0].measures[0].value}${nutrients[0].measures[0].eunit}`);
        // const output = {measure:0};
        // console.log(nutrients);
        for(fact of nutrients) {
          if(fact.name == "Protein") {
            // Object.assign(itemValue, {Protein: fact.value});
            itemValue.protein = fact.value;
            // setItemValue(1,fact.value);
            // itemValue.push("Protein " + fact.value);
          }
          if(fact.name == "Total lipid (fat)") {
            // Object.assign(itemValue, {Fat: fact.value});
            itemValue.fat = fact.value;
            // setItemValue(2,fact.value);
            // itemValue.push("Fat " + fact.value);
          }
          if(fact.name == "Carbohydrate, by difference") {
            // Object.assign(itemValue, {Carbohydrate: fact.value});
            itemValue.carbohydrate = fact.value;
            // setItemValue(3,fact.value);
            // itemValue.push("Carb " + fact.value);
          }
          if(fact.name == "Energy") {
            // Object.assign(itemValue, {Protein: fact.value});
            itemValue.calories = fact.value;
            // setItemValue(1,fact.value);
            // itemValue.push("Protein " + fact.value);
          }
          // itemValue[fact.name] = [fact.value]
        }
        // itemValue = output;
        // itemValue[measure] = response.foods[0].food.nutrients[0].measure;
        // console.log(itemValue);
        console.log("hello" + itemValue);
      },
      async:false,
      error: (e1,e2,e3) => {
        console.log(e2);
      }
    })
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
    <th>${item.ndbno}</th>
    <tr>
    </tr>
    </table>
    <div>Protein: ${itemValue.protein}</div>
    <div>Fat: ${itemValue.fat} g</div>
    <div>Carbohydrate:${itemValue.carbohydrate}</div>
    <div>Calories:${itemValue.calories}</div>
    <div>Serving size: n/a atm </div>

    <button class="addSelectedButton" id="${item.ndbno}"> Add </button>

    </div>`);
    const itemButton = document.getElementById(`${item.ndbno}`);

    const itemFacts = {
      name:item.name,
      carbohydrate:itemValue.carbohydrate,
      fat:itemValue.fat,
      protein:itemValue.protein,
      calories: itemValue.calories,
    }


    itemButton.addEventListener('click', (e)=> {
      // currentItem = itemFacts;

      $.ajax({
        method: "POST",
        url: "/profile/newPlan",
        data: JSON.stringify(itemFacts),
        contentType: 'application/json',
        success: ()=> {
          // document.getElementById(`${item.ndbno}`).style.display = none;
          console.log("success");
        },
        error: (e) => {
          console.log(e);
        }
      })

    })


  }

}

// const itemInfoOnSuccess = (response) => {
//   const nutrients = response.foods[0].food.nutrients;
//   const output = {};
//   for(item of nutrients) {
//     output[item.name] = [item.value]
//   }
//   console.log(output);
// }
