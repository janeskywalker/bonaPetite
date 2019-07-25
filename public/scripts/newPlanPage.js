
const updateButton = document.querySelector('#updateButton');
updateButton.addEventListener('click', ()=> {
  const title = document.getElementById('newGoal').value;
  console.log("button working");
  $.ajax({
    method: "POST",
    url: "/profile/updateProfile",
    data: title,
    success: console.log("ajax running, sent data:", title),
    error: (e) => {
      console.log(e);
    }
  })
})

// let updateProfile = () => {
//   const title = document.getElementById('newGoal').value;
//   console.log("button working");
//   $.ajax({
//     method: "POST",
//     url: "/profile/updateProfile",
//     data: JSON.stringify(title),
//     contentType: 'application/json',
//     success: console.log("ajax running: ", newPlan),
//     error: (e) => {
//       console.log(e);
//     }
//   })
//
//
// }
