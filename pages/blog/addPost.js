import Link from 'next/link'
import Router from 'next/router';

export default function Form({authors}) {
    const addPost = async (event) => {
      event.preventDefault();
      const res = await fetch('http://localhost:3001/blog', {
        body: JSON.stringify({
          title: event.target.title.value,
          subtitle : event.target.subtitle.value,
          image: event.target.image.value,
          author: event.target.author.value
        }),
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        method: 'POST',
      })
      Router.push('/')
    }
  
    return (
    
      <form onSubmit={addPost}>
        <button>
        <Link href="/">
            <a>Revenir à l'accueil</a>
        </Link></button>
        <h1>Ajouter un nouveau post</h1>
        <label htmlFor="title">Titre : </label>
        <input id="title" name="title" type="text" autoComplete="title" required /><br></br>
        <label htmlFor="subtitle">Sous-titres : </label>
        <input id="subtitle" name="subtitle" type="text" autoComplete="subtitle" required/><br></br>
        <label htmlFor="image">URL de l'image : </label>
        <input id="image" name="image" type="text" autoComplete="image" required /><br></br>
        <label htmlFor="author">Auteur : </label>
          {authors.map((author) => {
              return (
                <div>
                <input type="radio" name="author" value={author.id} required></input>
                <label>{author.fullName}</label>
                </div>
                
              )})
            }
        <button type="submit">Ajouter un nouveau post</button>

      </form>
    )
  }

  export async function getServerSideProps ({params}) {
    const authors = await fetch(`http://localhost:3001/blog/authors`)
      .then(r => r.json())
    return {
      props: {
        authors
      }
    }
  }