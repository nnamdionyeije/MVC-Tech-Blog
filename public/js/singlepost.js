const commentFormHandler = async (event) => {
    event.preventDefault();

    const text = document.querySelector('#comment-title').value.trim();
    const post_id = document.getElementsByClassName("id-button")[0].id;
    console.log(post_id);

    if (text) {
        const response = await fetch('/api/comment', {
            method: 'POST',
            body: JSON.stringify({ post_id, text}),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace(`/post/${[post_id]}`);
          } else {
            alert(response.statusText);
          }
    }

};

document 
    .querySelector('.new-comment-form')
    .addEventListener('submit', commentFormHandler);