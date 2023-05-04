const updateFormHandler = async (event) => {
    event.preventDefault();
    
    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-desc').value.trim();
    const post_id = document.getElementsByClassName("btn-update")[0].id;

    if (title && content) {
        const response = await fetch(`/api/post/${post_id}`, {
          method: 'PUT',
          body: JSON.stringify({ title, content }),
          headers: { 'Content-Type': 'application/json' },
        });
    
        if (response.ok) {
          document.location.replace('/dashboard');
        } else {
          alert('Failed to update POST');
        }
      }
}




document
  .querySelector('.update-post-form')
  .addEventListener('submit', updateFormHandler);