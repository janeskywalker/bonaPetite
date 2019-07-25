// console.log(currentUser);
console.log("test");


let userId = () => {
  const title = document.getElementById('itemTitle').value;

  const calorie = document.getElementById('calorieGoal').value;
  item1 = document.getElementById('item1').value + " " + document.getElementById('item1').value + " kcal"
  item2 = document.getElementById('item2').value + " " + document.getElementById('item2').value + " kcal"
  item3 = document.getElementById('item3').value + " " + document.getElementById('item3').value + " kcal"

  const newPlan = {
      items: [item1, item2, item3],
      title: title,
      Calories: calorie
    }

  $.ajax({
    method: "POST",
    url: "/profile/newplan",
    data: JSON.stringify(newPlan),
    contentType: 'application/json',
    success: console.log("ajax running: ", newPlan),
    error: (e) => {
      console.log(e);
    }
  })


}
