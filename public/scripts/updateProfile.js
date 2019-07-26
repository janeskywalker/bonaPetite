const updateButton = document.querySelector('#updateButton');
updateButton.addEventListener('click', () => {
  const value = document.getElementById('newGoal').value;
  
  $.ajax({
    method: "POST",
    url: "/profile/updateProfile",
    contentType: 'application/json',
    data: JSON.stringify({
      goal: value
    }),
    success: console.log("ajax running, sent data:", value),
    error: (e) => {
      console.log(e);
    }
  })
});
