import { useState } from 'react'

function App() {

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
              />
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Title"
                name="title"
              />
              <textarea
                className="form-control mb-3"
                placeholder="Body"
                rows="3"
                name="body"
              ></textarea>
              <div className="form-check mb-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="public"
                  name="public"
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
