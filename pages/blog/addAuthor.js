import Link from 'next/link'
import Router from 'next/router';

export default function Form() {
    const addAuthor = async (event) => {
      event.preventDefault();

      const res = await fetch('http://localhost:3001/blog/author', {
        body: JSON.stringify({
          fullName: event.target.fullName.value,
          email : event.target.email.value,
        }),
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        method: 'POST',
      })
      Router.push('/')
    }
  
    return (
    
      <form onSubmit={addAuthor}>
        <button>
        <Link href="/">
            <a>Revenir à l'accueil</a>
        </Link></button>
        <h1>Ajouter un nouvel auteur</h1>
        <label htmlFor="fullName">Nom : </label>
        <input id="fullName" name="fullName" type="text" autoComplete="fullName" required /><br></br>
        <label htmlFor="email">Email : </label>
        <input id="email" name="email" type="text" autoComplete="email" required /><br></br><br></br>
        <button type="submit">Ajouter un nouvel auteur</button>
      </form>
    )
  }
