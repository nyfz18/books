const guide = { //these numbers are from the databas...
    //figure out how to import open api book database 
    "Action": 28,
    "Romance": 10749,
    "Thriler": 53,
    "Fantasy": 14,
    "Comedy": 35,
    "Sci_fi": 878,
    "Horror": 27
};

// https://openlibrary.org/developers/api

document.getElementById("selected").addEventListener("change", () => {
    let selected_genre = document.getElementById("selected").value;
    document.getElementById("genre_name").innerHTML = selected_genre;
    document.getElementById("friend_name").innerHTML = window.sessionStorage.getItem("movie_friend");
    window.sessionStorage.setItem("selected_genre", guide[selected_genre]);
});

document.getElementById('yes').addEventListener("click", (event) => 
    location.href = "movie.html"
);

document.getElementById('no').addEventListener("click", (event) => 
    location.href = "dashboard.html"
);