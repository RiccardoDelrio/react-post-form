import { useState } from 'react'

function App() {

  const [post, setPost] = useState({
    author: '',
    title: '',
    body: '',
    public: false,
  })

  console.log("sarà pieno?", post);

  function handleClick(e) {
    e.preventDefault()
    if (e.target.type === 'checkbox') {
      setPost({ ...post, [e.target.name]: e.target.checked })
    } else {
      setPost({ ...post, [e.target.name]: e.target.value })
    }
  }



  return (
    <>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form className="form-group">
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
