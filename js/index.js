//Allons-y

//Using the results of the search, display information about the users to the page. (You might include showing their username, avatar and a link to their profile.) ---- DONE

//Clicking on one of these users should send a request to the User Repos Endpoint and return data about all the repositories for that user.

//declare variables here
const userSearchUrl = "https://api.github.com/search/users?q=";
const userReposUrl = "https://api.github.com/users/";
let userList;

//do work on page load
document.addEventListener("DOMContentLoaded", (e) => {
    userList = document.querySelector("ul#user-list");
    console.log(userList);
    const form = document.querySelector("#github-form");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        userList.innerHTML = '';
        searchUser(e);
        form.reset();
    });
});

function searchUser(e){
    e.preventDefault();
    const input = document.querySelector('input#search').value;
    fetch(`${userSearchUrl}${input}`)
        .then(res => res.json())
        .then(data => {
            const usersArray = data.items;
            usersArray.forEach(user => {
                createUserListItem(user)
            });
        })
}

//within every list item, append an h3, img and an anchor tag
function createUserListItem(user){    
    let li = document.createElement('li');
    li.setAttribute('id', user.id);

    let h3 = document.createElement('h3');
    h3.style.cursor = "pointer";
    h3.style.color = 'blue';
    h3.style.textDecoration = "underline";
    h3.innerText = `Username: ${user.login}`;
    
    //Clicking on one of these users should send a request to the User Repos Endpoint and return data about all the repositories for that user
    h3.addEventListener("click", () => {
        fetch(`${userReposUrl}${user.login}/repos`)
            .then(res => res.json())
            .then(data => console.log(data));
    });

    let img = document.createElement('img');
    img.setAttribute('src', user.avatar_url);

    let a = document.createElement('a');
    a.innerText = "Go to profile";
    a.setAttribute("target", "_blank");
    a.setAttribute("href", user.html_url);

    li.append(h3, img, a);
    userList.appendChild(li);
}