document.getElementById('submit').addEventListener("click", async (event) => {
    let curr_user = document.getElementById('uname').value;
    let pw = document.getElementById('pass').value;

    fetch("/login/curruser", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "username": curr_user,
            "pw": pw
        })
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.valid == "true") {
            location.href = "../html/my_books.html"
        }
        else {
            location.href = "../html/index.html"
        }
    });

});



document.getElementById('sign-up').addEventListener("click", (event) => 
    location.href = "../html/create_acc.html"
);
