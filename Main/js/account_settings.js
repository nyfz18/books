// user's username
let curr_user = "";
// user profile picture
let picture = "";
// user read history
let read_history_data = [];
// user top genre
let top_genres_data = [];

fetch("/accountsetting")
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        // check if there is any existing user in our database
        if (data.length > 0) {
            // get the first user information in our database
            if ("username" in data[0]) {
                curr_user = data[0]['username'];
            }
            if ("picture" in data[0]) {
                picture = data[0]['picture'];
            }
            if ("read_history" in data[0]) {
                read_history_data = data[0]['read_history'];
            }
            if ("genres" in data[0]) {
                top_genres_data = data[0]['genres'];
            }
        }

        // load existing read history data on user's database to the webpage
        if (read_history_data) {
            for (let i = 0; i < read_history_data.length; i++) {
                const booksList = document.getElementById('books_list');
                const theP = document.createElement("p");
                const books = read_history_data[i];
                theP.innerHTML = books;
                booksList.appendChild(theP);
            }
        } else {
            read_history_data = [];
        }

        // load existing top genres data on user's database to the webpage
        if (top_genres_data) {
            for (let i = 0; i < top_genres_data.length; i++) {
                const genreList = document.getElementById('genre_list');
                const theP = document.createElement("p");
                const genre = top_genres_data[i];
                theP.innerHTML = genre;
                genreList.appendChild(theP);
            }
        } else {
            top_genres_data = [];
        }

        document.getElementById("output").src = picture;
    });

document.getElementById('picture').addEventListener("change", loadFile);

function loadFile(event) {
    const image = document.getElementById("output");
    image.src = URL.createObjectURL(event.target.files[0]);
    fetch('/profilePicture/save', {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            picture: image.src
        })
    })

};

// highlight in red if not in database
document.getElementById('read_history').addEventListener("keyup", color);

function color() {
    const read_history_input = document.getElementById('read_history').value;
    if (read_history_input.length != 0 && read_history_data.includes(read_history_input)) {
        document.getElementById('read_history').style.color = 'black';
        document.getElementById('read_history').style.backgroundColor = 'white';
    } else {
        document.getElementById('read_history').style.color = 'black';
        document.getElementById('read_history').style.backgroundColor = 'red';
    }
}

document.getElementById('books_input').addEventListener("click", addbooks);

function addbooks() {
    const read_history_input = document.getElementById('read_history').value;

    if (read_history_input.length > 0 && read_history_data && !read_history_data.includes(read_history_input)) {
        const booksList = document.getElementById('books_list');
        const theP = document.createElement("p");
        theP.innerHTML = read_history_input;
        booksList.appendChild(theP);
        read_history_data.unshift(read_history_input);

        fetch('/readHistory/save', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                read_history: read_history_data
            })
        })
    }

    // get updated user read history list
    fetch("/accountsetting")
        .then((response) => response.json())
        .then((data) => {
            read_history_data = data[0]['read_history'];
        });
}

document.getElementById('genre_input').addEventListener("click", addGenre);

function addGenre() {
    const top_genre_input = document.getElementById('top_genres').value;

    if (top_genre_input.length > 0 && !top_genres_data.includes(top_genre_input)) {
        const genreList = document.getElementById('genre_list');
        const theP = document.createElement("p");
        theP.innerHTML = top_genre_input;
        genreList.appendChild(theP);
        top_genres_data.unshift(top_genre_input);

        fetch('/topGenres/save', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                genre: top_genres_data
            })
        })
    };

    // get updated user top genre list
    fetch("/accountsetting")
        .then((response) => response.json())
        .then((data) => {
            top_genres_data = data[0]['genres'];
        });
}

document.getElementById('remove_account_button').addEventListener("click", async (name, response) => {
    if (confirm("Are you sure want to delete this user?")) {
        fetch('/user/delete', {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: curr_user
            })
        })
            .then(res => {
                if (res.ok) return res.json()
            })

        location.href = "../html/signup.html";
    };
});