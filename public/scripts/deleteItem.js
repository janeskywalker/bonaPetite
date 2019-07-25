const section = document.querySelector('section');

section.addEventListener('click', (e) => {
  //send a delete request to db
  if (e.target.tagName === "BUTTON") {
    console.log(e.target)
  }
  $.ajax({
    method: 'DELETE',
    url: `/profile/${e.target.id}`,
    success: (response) => {
      console.log('deleting')
      window.location.reload();
    },
    error: (error) => console.log(error),
  });
});
