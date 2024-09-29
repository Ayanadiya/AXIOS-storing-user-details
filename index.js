const userlist=document.querySelector("ul");
window.addEventListener("DOMContentLoaded", ()=>{
    axios.get("https://crudcrud.com/api/79dad41a37c9441185381c4c9b6885a5/userdetails") 
            .then(response => {
                console.log(response);
                for(var i=0; i<response.data.length;i++)
                {
                    showNewUserOnScreen(response.data[i]);
                }
                })
            .catch(error => {
                console.error(error);
            });
        })
function handleFormSubmit(event) {
  event.preventDefault();
    const userDetails = {
      username: event.target.username.value,
      email: event.target.email.value,
      phone: event.target.phone.value,
    };
    axios
      .post(
         "https://crudcrud.com/api/79dad41a37c9441185381c4c9b6885a5/userdetails",
        userDetails
      )
      .then((response) => displayUserOnScreen(response.data))
      .catch((error) => console.log(error));
  
    // Clearing the input fields
    document.getElementById("username").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
}
function showNewUserOnScreen(user){
    const listItem = document.createElement('li');
        listItem.textContent = `Username: ${user.username}, Email: ${user.email}, Phone: ${user.phone}, Id:${user._id}`;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => handleDelete(user._id);

  listItem.appendChild(deleteButton);
        userlist.appendChild(listItem);
}
function handleDelete(userId) {
    axios
      .delete(`https://crudcrud.com/api/79dad41a37c9441185381c4c9b6885a5/userdetails/${userId}`)
      .then(() => {
        const listItem = Array.from(userlist.children).find(item => item.textContent.includes(userId));
        if (listItem) {
          userlist.removeChild(listItem);
        }
      })
      .catch(error => {
        console.error('Error deleting user:', error);
      });
  }