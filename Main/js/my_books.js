document.getElementById("pick-friend1").addEventListener("click", (event) => {
    location.href = "ConfirmationPage.html";
    const friend = document.getElementById("pick-friend1");
    window.sessionStorage.setItem("movie_friend", friend.innerHTML);  
});

document.getElementById("pick-friend2").addEventListener("click", (event) => {
    location.href = "ConfirmationPage.html";
    const friend = document.getElementById("pick-friend2");
    window.sessionStorage.setItem("movie_friend", friend.innerHTML);  
});

document.getElementById("pick-friend3").addEventListener("click", (event) => {
    location.href = "ConfirmationPage.html";
    const friend = document.getElementById("pick-friend3");
    window.sessionStorage.setItem("movie_friend", friend.innerHTML);  
});

function update_dashboard() {
    fetch("/update_dashboard")
    .then((response) => response.json())
    .then((data) => {

        const genres_arr = data[0].genres;
        const friends_arr = data[0].friends;
        const history_arr = data[0].watch_history;

        const genre1 = document.getElementById('genre1-name');
        const text1 = document.createTextNode(genres_arr[0]);

        genre1.appendChild(text1);

        const genre2 = document.getElementById('genre2-name');
        const text2 = document.createTextNode(genres_arr[1]);
        
        genre2.appendChild(text2);

        const genre3 = document.getElementById('genre3-name');
        const text3 = document.createTextNode(genres_arr[2]);
        
        genre3.appendChild(text3);

        const movie1 = document.getElementById("movie-name1");
        const title1 = document.createTextNode(history_arr[0]);

        movie1.appendChild(title1);

        const movie2 = document.getElementById("movie-name2");
        const title2 = document.createTextNode(history_arr[1]);

        movie2.appendChild(title2);

        const movie3 = document.getElementById("movie-name3");
        const title3 = document.createTextNode(history_arr[2]);

        movie3.appendChild(title3);

        for (let i = 1; i <= friends_arr.length; i++) {
            let id = "pick-friend" + i.toString();
            console.log(id);
            const friend = document.getElementById(id);
            friend.innerHTML = friends_arr[i - 1].f_name;
        }

    })
}

window.onload = update_dashboard();