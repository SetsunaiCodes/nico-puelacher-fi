import Link from 'next/link'
import { compareDesc, format, parseISO } from 'date-fns'
import { allPosts, Post } from 'contentlayer/generated'

/*Components*/
import { Navbar } from './components'
import { PostCard } from './components'



const cardContainerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '10px', 
}




export default function Home() {
  const posts = allPosts.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))

  return (
    <div>
      <Navbar/>
      <div className='flex-a-start-j-center section margintop'>
        <main>
          <h1>Uploads</h1>
          <div style={cardContainerStyle}>
            {posts.map((post, idx) => (
            <PostCard key={idx} {...post} />
            ))}
          </div>
        </main>
        <aside className='margin-aside'>
          <div className='personal-card flex-a-j-center gap'>
            <img src='/JAKEPB.jpg'/>
              <div>
                <p>Nico Puelacher</p>
                <p>Programmierer</p>
              </div>
          </div>
          <div className='section'>
            <h2>Quick Links</h2>

            <h3>Gedankengänge</h3>
            <ul className='quick-links'>
              {posts
              .filter(post => post.id === 'Gedankengänge')
              .map((post, idx) => (
                <li key={idx}>
                  <div>
                    <p className='no-margin topic-quick'>{post.topic}</p>
                    <Link className='no-margin title-quick' href={post.url}>
                      {post.title}
                    </Link>
                  </div>
                  <div className='divider-hor'></div>
                </li>
              ))}
            </ul>

            <h3>Hausaufgaben</h3>
            <ul className='quick-links'>
              {posts
              .filter(post => post.id === 'Hausaufgabe')
              .map((post, idx) => (
                <li key={idx}>
                  <div>
                    <p className='no-margin topic-quick'>{post.topic}</p>
                    <Link className='no-margin title-quick' href={post.url}>
                      {post.title}
                    </Link>
                  </div>
                  <div className='divider-hor'></div>
                </li>
              ))}
            </ul>

            <h3>DevLogs</h3>
            <ul className='quick-links'>
              {posts
              .filter(post => post.id === 'DevLog')
              .map((post, idx) => (
                <li key={idx}>
                  <div>
                    <p className='no-margin topic-quick'>{post.topic}</p>
                    <Link className='no-margin title-quick' href={post.url}>
                      {post.title}
                    </Link>
                  </div>
                  <div className='divider-hor'></div>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  )
}