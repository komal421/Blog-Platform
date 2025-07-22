function login() {
  const username = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  if (username && pass) {
    document.getElementById("login-page").style.display = "none";
    document.getElementById("blog-page").style.display = "block";
  } else {
    alert("Please enter both username and password.");
  }
}

function createPost() {
  const text = document.getElementById("postText").value;
  const fileInput = document.getElementById("mediaUpload");
  const file = fileInput.files[0];
  const postsDiv = document.getElementById("posts");

  const post = document.createElement("div");
  post.className = "post";

  const content = document.createElement("div");
  content.innerText = text;

  post.appendChild(content);

  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      if (file.type.startsWith("image")) {
        const img = document.createElement("img");
        img.src = e.target.result;
        post.appendChild(img);
      } else if (file.type.startsWith("video")) {
        const vid = document.createElement("video");
        vid.src = e.target.result;
        vid.controls = true;
        post.appendChild(vid);
      }
    };
    reader.readAsDataURL(file);
  }

  const actions = document.createElement("div");
  actions.className = "actions";

  const likeBtn = document.createElement("button");
  let liked = false;
  let likeCount = 0;
  likeBtn.innerText = `❤️ Like (0)`;
  likeBtn.onclick = () => {
    liked = !liked;
    likeCount += liked ? 1 : -1;
    likeBtn.innerText = `❤️ Like (${likeCount})`;
  };

  const editBtn = document.createElement("button");
  editBtn.innerText = "Edit";
  editBtn.onclick = () => {
    const newText = prompt("Edit your post:", content.innerText);
    if (newText !== null) content.innerText = newText;
  };

  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  deleteBtn.onclick = () => post.remove();

  actions.appendChild(likeBtn);
  actions.appendChild(editBtn);
  actions.appendChild(deleteBtn);
  post.appendChild(actions);

  // Comment section
  const commentSection = document.createElement("div");
  commentSection.className = "comment-section";

  const commentInput = document.createElement("input");
  commentInput.placeholder = "Write a comment...";

  const commentBtn = document.createElement("button");
  commentBtn.innerText = "Post";
  commentBtn.onclick = () => {
    const commentText = commentInput.value.trim();
    if (commentText) {
      const comment = document.createElement("div");
      comment.className = "comment";
      comment.innerText = commentText;
      commentSection.appendChild(comment);
      commentInput.value = "";
    }
  };

  commentSection.appendChild(commentInput);
  commentSection.appendChild(commentBtn);
  post.appendChild(commentSection);

  postsDiv.prepend(post);

  // Reset inputs
  document.getElementById("postText").value = "";
  fileInput.value = "";
}
