document.addEventListener("DOMContentLoaded", async () => {
    const postContainer = document.getElementById("posts");

    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        const posts = await response.json();

        posts.forEach(post => {
            const postCard = document.createElement("div");
            postCard.classList.add("card");

            postCard.innerHTML = `
                <h2>${post.title}</h2>
                <p>${post.body}</p>
                <div class="post-id">Post ID: ${post.id}</div>
            `;

            postContainer.appendChild(postCard);
        });
    } catch (error) {
        postContainer.innerHTML = "<p>Failed to load posts. Try again later.</p>";
    }
});
