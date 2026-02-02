async function loadBlog() {
  const res = await fetch('/blog/index.json');
  const posts = await res.json();

  const container = document.getElementById('blog-container');
  container.innerHTML = '';

  posts.forEach(post => {
    container.innerHTML += `
      <article class="post">
        <img src="${post.thumbnail}" alt="${post.title}">
        <h2>${post.title}</h2>
        <p>${post.description}</p>
        <a href="/post.html?slug=${post.slug}">Read More</a>
      </article>
    `;
  });
}

loadBlog();
