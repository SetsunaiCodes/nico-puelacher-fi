import Link from 'next/link'
import { compareDesc, format, parseISO } from 'date-fns'
import { allPosts, Post } from 'contentlayer/generated'
function PostCard(post) {
  return (
    <div>
      <h2>
        <Link href={post.url}>
          {post.title}
        </Link>
      </h2>
      <time dateTime={post.date}>
        {format(parseISO(post.date), 'LLLL d, yyyy')}
      </time>
      <div dangerouslySetInnerHTML={{ __html: post.body.html }} />
    </div>
  )
}

export function Navbar() {
  return(
    <nav className='flex-a-j-center'>
      <div className='section flex-a-center-j-between'>
        <p>Nico Puelacher <span>.</span></p>
        <div className='flex-a-j-center'>
          <ul className='flex gap'>
            <li><a href=''>Projekt</a></li>
            <li><a href=''>Hausaufgaben</a></li>
          </ul>

          <div className='btn-container-nav'>
            <button>GitHub</button>
          </div>
        </div>

      </div>
    </nav>
  )
}

export default function Home() {
  const posts = allPosts.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))

  return (
    <div>
      <Navbar/>
      <div className='flex-a-start-j-center section'>
        <main>
          <h1>Uploads</h1>
          {posts.map((post, idx) => (
          <PostCard key={idx} {...post} />
           ))}
        </main>
        <aside></aside>
      </div>

    </div>
  )
}