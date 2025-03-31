import { useState } from 'react'

function App() {
  const [post, setPost] = useState({
    author: '',
    title: '',
    body: '',
    public: false,
  })

  const [alert, setAlert] = useState({
    show: false,
    type: '',
    message: ''
  })

  console.log("sarà pieno?", post);

  function handleClick(e) {
    if (e.target.type === 'checkbox') {
      setPost({ ...post, [e.target.name]: e.target.checked })
    } else {
      setPost({ ...post, [e.target.name]: e.target.value })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setAlert({ show: true, type: 'info', message: 'Invio in corso...' })

    fetch("https://67c5b4f3351c081993fb1ab6.mockapi.io/api/posts", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Success:', data);
        setAlert({ show: true, type: 'success', message: 'Post creato con successo!' });
        setPost({ author: '', title: '', body: '', public: false });
        setTimeout(() => setAlert({ show: false, type: '', message: '' }), 3000);
      })
      .catch(error => {
        console.error('Error:', error);
        setAlert({
          show: true,
          type: 'danger',
          message: `Errore durante l'invio del post: ${error.message}`
        });
        setTimeout(() => setAlert({ show: false, type: '', message: '' }), 3000);
      });
  }

  return (
    <>
      <div className="container mt-5">
        {alert.show && (
          <div className={`alert alert-${alert.type}`} role="alert">
            {alert.message}
          </div>
        )}
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form onSubmit={handleSubmit} className="form-group">
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Author"
                name="author"
                value={post.author}
                onChange={handleClick}
              />
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Title"
                name="title"
                value={post.title}
                onChange={handleClick}
              />
              <textarea
                className="form-control mb-3"
                placeholder="Body"
                rows="3"
                name="body"
                value={post.body}
                onChange={handleClick}
              ></textarea>
              <div className="form-check mb-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="public"
                  name="public"
                  checked={post.public}
                  onChange={handleClick}
                />
                <label className="form-check-label" htmlFor="public">Public</label>
              </div>
              <button type="submit" className="btn btn-primary w-100">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
