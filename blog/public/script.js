const newPost = document.querySelector("#add-post");
const modal = document.querySelector(".modal");

newPost.addEventListener("click", e => {
    e.preventDefault();
    modal.classList.remove("hidden");
});