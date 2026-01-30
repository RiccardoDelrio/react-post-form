import { useState } from 'react'

function App() {
  const [post, setPost] = useState({
    author: '',
    title: '',
    content: '', // cambiato da 'body' a 'content' per matchare l'API
    isPublished: false, // cambiato da 'public' a 'isPublished'
    createdAt: new Date().toISOString() // aggiunto timestamp
  })
  //gestire lo stato di errore
  const [alert, setAlert] = useState({
    show: false,
    type: '',
    message: ''
  })
  console.log(post)

  //funzione per assegnare i valori alle key (se è un checkbox cambia da true a false)
  function handleClick(e) {
    if (e.target.type === 'checkbox') {
      setPost({ ...post, isPublished: e.target.checked }) // aggiornato nome campo
    } else {
      // Converti 'body' in 'content' durante l'assegnazione
      const fieldName = e.target.name === 'body' ? 'content' : e.target.name
      setPost({ ...post, [fieldName]: e.target.value })
    }
  }

  //funzione per la chiamata fetch
  const handleSubmit = (e) => {
    e.preventDefault()

    // Validazione base
    if (!post.author || !post.title || !post.content) {
      setAlert({
        show: true,
        type: 'danger',
        message: 'Per favore compila tutti i campi'
      })
      return
    }

    //genera un messaggio di invio
    setAlert({ show: true, type: 'info', message: 'Invio in corso...' })

    // Prepara i dati nel formato corretto
    const postData = {
      ...post,
      createdAt: new Date().toISOString()
    }

    //parte la chiamata 
    fetch("https://67c5b4f3351c081993fb1ab6.mockapi.io/api/posts", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    })
      .then(response => {
        //se la risposta non è ok restituisci questo stato
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        //se tutto va bene mostri il risultato nella console e setta lo stato di alert
        console.log('Success:', data);
        setAlert({ show: true, type: 'success', message: 'Post creato con successo!' });
        setPost({ author: '', title: '', content: '', isPublished: false, createdAt: new Date().toISOString() });
        //dopo 3 secondi rimetti l'allert in partenza
        setTimeout(() => setAlert({ show: false, type: '', message: '' }), 3000);
      })
      .catch(error => {
        console.error('Error:', error);
        //in caso di errore, setto allerta e metto il messaggio
        setAlert({
          show: true,
          type: 'danger',
          message: `Errore durante l'invio del post: ${error.message}`
        });
        //dopo 3 secondi rimetti l'allert in partenza
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
                placeholder="Content" // cambiato da Body a Content
                rows="3"
                name="body"
                value={post.content} // aggiornato per usare content
                onChange={handleClick}
              ></textarea>
              <div className="form-check mb-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="public"
                  name="isPublished" // aggiornato nome campo
                  checked={post.isPublished}
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
