
async function newPostHandler (event) {
    event.preventDefault();

    const title = document.getElementById('postTitleInput').value;
    const category = document.getElementById('postCategorySelect').value;
    const text = document.getElementById('postTextInput').value;
     

    const response = await fetch('/api/posts', {
        method: 'POST',
         body: JSON.stringify({
            title: title,
            category_id: category,
            post_text: text
           }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/dashboard');
        console.log('Button is working')
    } else {
        alert(response.statusText);
        console.log(response.statusText);
        console.log(category);
        console.log(text);
        console.log(title);
    }
}

document.querySelector('.create-post-form').addEventListener('submit', newPostHandler);