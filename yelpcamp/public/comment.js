const modal = document.querySelector(".modal");
const addComment = document.querySelector("#add-comment");

addComment.addEventListener("click", () => {
    modal.classList.remove("hidden");
});