// console.log(currentUser);
console.log("test");
let userId = () => {
 const currentUser = document.getElementById('currentUserId');
 currentUserId = currentUser.innerText;
 const title = document.getElementById('add-item-input');
 const text = document.getElementById('calorieGoal');
 console.log(title.value);
 console.log(text.value);
}
