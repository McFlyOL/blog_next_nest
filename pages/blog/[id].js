import Router, { useRouter } from "next/router";
import Link from 'next/link'
import { useState } from "react";

export default function Post ({post, authors}) {
  const addComment = async (event) => {
    event.preventDefault();

    const res = await fetch(`http://localhost:3001/blog/comment/${post.id}`, {
      body: JSON.stringify({
        content: event.target.content.value,
        author: event.target.author.value,
      }),
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      method: 'POST',
    })
  
    refreshData();
    event.target.content.value = ""
  }

  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
  }

  const [showMe, setShowMe] = useState(false);
  function toggle(){
    setShowMe(!showMe);
  }

  const deletePost = async postId => {
    const response = await fetch(`http://localhost:3001/blog/${postId}`, {
      method: 'DELETE',
    }) 
    const data = await response.json()
    Router.push('/')
  } 

  const incrementComments = async commentID => {
    const response = await fetch(`http://localhost:3001/blog/comment/point/${commentID}`, {
      method: 'PUT',
    }) 
    refreshData();
  } 
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  var date = new Date(post.createdAt).toLocaleDateString(undefined, options);
  return <>
    <main>
      <button> 
        <Link href="/">
          <a>Revenir à l'accueil</a>
        </Link>
      </button>
     
      <h1>{post.title}</h1>
      <div className="buttons">
        <button>
          <Link href={`/blog/edit/${post.id}`}>
                <a>Modifier le post</a>
          </Link>
        </button>
        <button onClick={() => deletePost(post.id)}>Supprimer le post</button>
      </div>
      <br></br><br></br>
      
      <p className='desc_creation'>Posté le : <em className="date_created">{date}</em> par <b>{post.author.fullName}</b></p>
      <p className='description'>Description : {post.subtitle}</p>
      <div className="img">
        <img src={post.image}></img>
      </div>
      <div className="comments">
        <h2>Commentaires</h2>
          {post.comments.map((comment) => {
            return (
              <div key={comment.id}>
                {comment.content} - <em>{comment.author.fullName} - </em> <em>{comment.points} point(s)</em>
                <button onClick={() => incrementComments(comment.id)}>+</button>
              </div>
            )})
          }
          <br></br>
        </div>
      <div className="newComment">
        <button onClick={toggle}>Ajouter un commentaire</button>
      </div>

      <form style={{
        display: showMe?"block":"none"
      }} onSubmit={addComment}>
        <h1>Ajouter un nouveau commentaire</h1>
        <input id="content" name="content" type="text" autoComplete="content" required /><br></br>
        <label htmlFor="author">Auteur : </label>
          {authors.map((author) => {
              return (
                <div key={author.id}>
                <input id="author" type="radio" name="author" value={author.id} required></input>
                <label>{author.fullName}</label>
                </div>
              )})
            }
        <br></br><br></br>
        <button type="submit">Ajouter un nouveau commentaire</button>
      </form>

      <style jsx>{`
        h1, h2 {
          text-align: center;
        }
        .description, .desc_creation, .comments, .newComment, .img {
          text-align: center;
        }
        .buttons {
          margin: auto;
          width: 200px; 
        }
      `}</style>
    </main>
  </>
}

export async function getServerSideProps ({params}) {
  const [postRes,authorsRes] = await Promise.all([fetch(`http://localhost:3001/blog/${params.id}`),fetch(`http://localhost:3001/blog/authors`)]);
  const [post, authors] = await Promise.all([postRes.json(), authorsRes.json()])
  return {
    props: {
      post,
      authors
    }
  }
}



