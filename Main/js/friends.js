function show_friends() {
    fetch("/friends")
      .then((response) => response.json())
      .then((data) => {
        const friends_arr = data[0].friends;
        const friendUL = document.getElementById("friends_list");

        for(const entry of friends_arr){
          const newFriend = document.createElement("li");
          newFriend.classList.add("friend");
          friendUL.appendChild(newFriend);

          const newDiv = document.createElement("div");
          newDiv.classList.add("friend_div");

          const pic = document.createElement("img");
          pic.src = "../images/profile_official.png";
          pic.id = ("profile");
          newDiv.appendChild(pic);

          const text = document.createElement("a");
          text.innerHTML = entry.f_name;
          newDiv.appendChild(text);

          const brk = document.createElement("br");
          newDiv.appendChild(brk);

          newFriend.appendChild(newDiv);
        }
      });
  }

  window.onload = show_friends();

  const update = document.getElementById('add_btn');
  const search = document.getElementById('search_btn');

  update.addEventListener('click', () => {
    const friend_name = document.getElementById("friend_name").value;
    fetch('/friends/add', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        f_name: friend_name,
        f_movies: []
      })
      }).then(res => {
        if (res.ok){
          return res.json();
        }
      })
      update.location.href = "../html/friends.html";
    });

  document.getElementById("pick-friend1").addEventListener("click", (event) => {
      location.href = "confirm.html";
      const friend = document.getElementById("pick-friend1");
      window.sessionStorage.setItem("movie_friend", friend.innerHTML);  
  });
  
  document.getElementById("pick-friend2").addEventListener("click", (event) => {
      location.href = "confirm.html";
      const friend = document.getElementById("pick-friend2");
      window.sessionStorage.setItem("movie_friend", friend.innerHTML);  
  });
  
  document.getElementById("pick-friend3").addEventListener("click", (event) => {
      location.href = "confirm.html";
      const friend = document.getElementById("pick-friend3");
      window.sessionStorage.setItem("movie_friend", friend.innerHTML);  
  });