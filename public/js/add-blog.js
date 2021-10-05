const newBlogPost = async (event) => {
  event.preventDefault();

  const blogTitle = document.getElementById("new-title");
  const blogTextArea = document.getElementById("post-text-area");

  if (blogTitle && blogTextArea) {
    const response = await fetch("/api/blog", {
      method: "POST",
      body: JSON.stringify({
        title: blogTitle,
        description: blogTextArea,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      console.log("Successful post");
      alert("Success");
    } else {
      alert("Oh no! Something went wrong.  Please try again another time.");
      console.log("Error. Submission unsuccessful!");
    }
  }
};

document
  .getElementById("post-submission")
  .addEventListener("submit", newBlogPost);
