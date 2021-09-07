let thumbsUp;
let thumbsDown;

function liked(){
    let element = document.getElementById("like");
    element.classList.toggle("liked");
}

function dislike() {
    let btn = document.getElementById('dislike');
    btn.classList.toggle('disliked');
}

if (thumbsUp) {
    liked()
} else if (thumbsDown) {
    dislike()
}