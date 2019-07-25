// console.log(currentUser);
console.log("test");


let userId = () => {
  const title = document.getElementById('itemTitle').value;

  const calorie = document.getElementById('calorieGoal').value

  const item1 = {
    name: document.getElementById('item1').value,
    calorie: document.getElementById('item1Calorie').value,
  }
  
  // const item2 = {
  //   name: document.getElementById('item2').value,
  //   calorie: document.getElementById('item2Calorie').value + " kcal",
  // }

  // const item3 = {
  //   name: document.getElementById('item3').value,
  //   calorie: document.getElementById('item3Calorie').value + " kcal",
  // }

  const newPlan = {
    title: title,
    items: [
      item1,
      // item2,
      // item3
    ],
    Calories: calorie
  }

  $.ajax({
    method: "POST",
    url: "/profile/newplan",
    data: JSON.stringify(newPlan),
    contentType: 'application/json',
    success: () => {
        console.log("New plan published: ", newPlan)
        window.location.href = '/profile'
    },
    error: (e) => {
      console.log(e);
    }
  })


}
