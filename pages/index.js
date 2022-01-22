import Head from 'next/head'
import Link from 'next/link'

export default function Home({posts, date}) {
  
  return (
    <>
      <Head>
        <title>Mon super blog</title>
      </Head>
      <h1>Mon Blog</h1>
      <ul>
        {posts.map(post => <li key={post.id}>
          <Link key={post.id} href={`/blog/${post.id}`}>
            <a>
              <h3>{post.title}</h3>
            </a>
          </Link>
        </li>)}
      </ul>
      <button>
        <Link href={`/blog/addPost`}>
          <a>
            Ajouter un nouveau post
          </a>
        </Link>
      </button>
      <button>
        <Link href={`/blog/addAuthor`}>
          <a>
            Ajouter un nouvel auteur
          </a>
        </Link>
      </button>
    </>
  )
}

export async function getStaticProps () {
  const posts = await fetch('http://localhost:3001/blog/')
    .then(r => r.json())
  return {
    props: {
      posts
    },
    revalidate: 5,
  }
}
