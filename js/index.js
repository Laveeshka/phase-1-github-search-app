//Allons-y

//Using the results of the search, display information about the users to the page. (You might include showing their username, avatar and a link to their profile.) ---- DONE

//Clicking on one of these users should send a request to the User Repos Endpoint and return data about all the repositories for that user.      ---- DONE

//Using the response from the Users Repos Endpoint, display all the repositories for that user on the page.
//by clicking on the user's h3, I wish to make the other user list items disappear 
//I wish to display a list of repos info: name and html_url for each repo ---- DONE



//declare variables here
const userSearchUrl = "https://api.github.com/search/users?q=";
const userReposUrl = "https://api.github.com/users/";
let userList;
let repoList;

//do work on page load
document.addEventListener("DOMContentLoaded", (e) => {
    userList = document.querySelector("ul#user-list");
    console.log(userList);
    repoList = document.querySelector("ul#repos-list");
    const form = document.querySelector("#github-form");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        userList.innerHTML = '';
        repoList.innerHTML = '';
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
                createUserListItem(user);
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
            .then(reposData => {
                console.log(reposData);
                userList.innerHTML = '';
                createUserListItem(user);

                reposData.forEach(repoData => {
                    createRepoListItem(repoData);
                })
            });
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

function createRepoListItem(repo){
    let li = document.createElement('li');
    li.setAttribute('id', repo.id);

    let h4 = document.createElement("h4");
    h4.innerText = `Repo name: ${repo.name}`;

    let a = document.createElement('a');
    a.innerText = "Go to repo";
    a.setAttribute("target", "_blank");
    a.setAttribute("href", repo.html_url);

    li.append(h4, a);
    repoList.appendChild(li);
}