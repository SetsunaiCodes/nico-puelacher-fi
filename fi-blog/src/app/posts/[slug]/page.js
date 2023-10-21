import { compareDesc, format, parseISO } from 'date-fns'
import { allPosts } from 'contentlayer/generated'
import Link from 'next/link'
import { Navbar } from 'src/app/page'

export const generateStaticParams = async () => allPosts.map((post) => ({ slug: post._raw.flattenedPath }))

export const generateMetadata = ({ params }) => {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug)
  if (!post) throw new Error(`Post not found for slug: ${params.slug}`)
  return { title: post.title }
}

const PostLayout = ({ params }) => {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug)
  if (!post) throw new Error(`Post not found for slug: ${params.slug}`)

function AsideaBar() {
  const posts = allPosts.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
  
  return(
    <div>

    
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
  </div>
  )
}

const currentImagePath = ('/' + post.imagepath)
  return (
    <div>
      <Navbar/>
      <div className='section'>
        <div className='flex-a-start-j-center'>
          <main>
          <article>
            <div>
            <img className='artikel-image' src= {currentImagePath}/>
            <div className='article-heading-container flex-a-j-center'>
            <h1 className='article-heading'>{post.title}</h1>
              <div className='divider-sen'></div>
              <time className='font-bold' dateTime={post.date}>
                {format(parseISO(post.date), 'dd.MM.yyyy')}
              </time>
            </div>

            </div>
            <div dangerouslySetInnerHTML={{ __html: post.body.html }} />
        </article>
          </main>
          <aside className='margin-aside'>
            <AsideaBar/>
          </aside>
        </div>
      
      </div>
    </div>
  )
}

export default PostLayout