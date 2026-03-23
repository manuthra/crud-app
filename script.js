let users = [];

// get form & tbody
const form = document.getElementById("userForm");
const tableBody = document.getElementById("tableBody");
const editIndexInput = document.getElementById("editIndex");

if(sessionStorage.getItem("users")){
    users = JSON.parse(sessionStorage.getItem("users"))
    console.log(users)
    displayUsers()
}

// add entry to users-CREATE
form.addEventListener("submit", (e) => {
    e.preventDefault();

    // get name & email
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    if (editIndexInput.value == "") {
        // add name and email to users array
        users.push({ name, email });
    } else {
        // edit user
        users[editIndexInput.value] = { name, email }
        editIndexInput.value = ""
    }

    form.reset();
    // console.log(users);
    sessionStorage.setItem("users",JSON.stringify(users))
    displayUsers()
});

// users should listed in table - READ
function displayUsers () {
    tableBody.innerHTML = "";

    users.forEach((user, index) => {
        tableBody.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>
                    <div class="d-flex">
                        <button onclick="editUser(${index})" class="btn btn-warning">Edit</button>
                        <button  onclick="deleteUser(${index})"    class="btn btn-danger ms-2">Delete</button>
                    </div>
                </td>
            </tr>
        `;
    });
}

// edit user
const editUser = (index) => {
    document.getElementById("name").value = users[index].name
    document.getElementById("email").value = users[index].email
    editIndexInput.value = index
}

// delete user
const deleteUser = (index) => {
    if (confirm("Are you sure want to delete data?")) {
        users.splice(index, 1)
        // update users to session storage
        sessionStorage.setItem("users",JSON.stringify(users))
        displayUsers()
    }
}