import Link from 'next/link'
import { compareDesc, format, parseISO } from 'date-fns'
import { allPosts, Post } from 'contentlayer/generated'


const cardContainerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '10px', 
}


function PostCard(post) {
  return (
    <div className='article-cards'>
      <img src={post.imagepath}/>
      <div className='section flex-a-center-j-start-column'>
        <div className='flex-a-j-center'>
        <time dateTime={post.date}>
          {format(parseISO(post.date), 'dd.MM.yyyy')}
        </time>
        <p>/{post.topic}</p>
        </div>

        <h2>
          <Link className='card-heading' href={post.url}>
            {post.title}
          </Link>
        </h2>
        <div>
          <p>
            {post.des}
          </p>
        </div>
      </div>
      
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
            <li><a href=''>Home</a></li>
            <li><a href=''>Projekt</a></li>
            <li><a href=''>Hausaufgaben</a></li>
            <li><a href=''>Gedankengänge</a></li>
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
      <div className='flex-a-start-j-center section margintop'>
        <main>
          <h1>Uploads</h1>
          <div className='flex taglist'>
            <a className='taglist-active'>Alles</a>
            <a>Gedankengänge</a>
            <a>Projekte</a>
            <a>Hausaufgaben</a>
          </div>
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
            <h3>Quick Links</h3>
            <ul className='quick-links'>
              {posts.map((post, idx) => (
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