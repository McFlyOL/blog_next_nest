import Link from 'next/link'
import Router, { useRouter } from 'next/router';
import { useState } from 'react';

export default function Edit({post}) {
  const [title, setTitle] = useState(post.title);
  const [subtitle, setSubtitle] = useState(post.subtitle);
  const [image, setImage] = useState(post.image);
    const addPost = async (event) => {
      event.preventDefault();

      const res = await fetch(`http://localhost:3001/blog/${post.id}`, {
        body: JSON.stringify({
          title: title,
          subtitle : subtitle,
          image: image
        }),
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        method: 'PUT',
      })
      redirectPost()
    }
    const router = useRouter()
    const redirectPost = () =>{
      router.push({
        pathname:`/blog/${post.id}`,
      }) 
    }
    
    return (
    
      <form onSubmit={addPost}>
        <button>
        <Link href="/">
            <a>Revenir à l'accueil</a>
        </Link></button>
        <h1>Modifier {post.title}</h1>
        <label htmlFor="title">Titre : </label>
        <input id="title" name="title" type="text" autoComplete="title" value={title} onChange={(e) => setTitle(e.target.value)} required /><br></br>
        <label htmlFor="image">URL de l'image : </label>
        <input id="image" name="image" type="text" autoComplete="image" value={image} onChange={(e) => setImage(e.target.value)} required /><br></br>
        <label htmlFor="subtitle">Sous-titres : </label>
        <input id="subtitle" name="subtitle" type="subtitle" autoComplete="subtitle" value={subtitle} onChange={(e) => setSubtitle(e.target.value)}/><br></br><br></br>
        <button type="submit">Modifier le post</button>
      </form>
    )
  }

  export async function getServerSideProps ({params}) {
    const post = await fetch(`http://localhost:3001/blog/${params.id}`)
      .then(r => r.json())
    return {
      props: {
        post
      }
    }
  }