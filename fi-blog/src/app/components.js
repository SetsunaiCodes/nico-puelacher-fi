import Link from "next/link";
import { compareDesc, format, parseISO } from "date-fns";
import { allPosts } from "contentlayer/generated";
import { FaHtml5, FaCss3, FaJs, FaReact, FaPython, FaGithub } from 'react-icons/fa';

/*Page Layout*/
export function Navbar() {
  return (
    <nav className="flex-a-j-center">
      <div className="section flex-a-center-j-between">
        <p>
          Nico Puelacher <span>.</span>
        </p>
        <div className="flex-a-j-center">
          <ul className="flex gap">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
          </ul>

          <div className="btn-container-nav">
            <a target="_blank" href="https://github.com/SetsunaiCodes">
              <button><FaGithub/></button>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export function AsideBar() {

  return (
    <div>
      <div className="section">
        <h2>Quick Links</h2>
        <QuickSelectGroup title = "Gedankengänge"/>
        <QuickSelectGroup title = "Hausaufgabe"/>
        <QuickSelectGroup title = "DevLog"/>
      </div>
    </div>
  );
}

export function FooterComp(){
  return(
    <div className="footer">
      <div className="techstack flex-a-j-center height100">
        <a className="footer-content">
          <FaGithub/>
        </a>
      </div>
    </div>
  )
}

/*Posts*/
export function PostCard(post) {
  return (
    <div className="article-cards">
      <Link href={post.url}>
        <img src={post.imagepath} />
      </Link>
      <div className="section flex-a-center-j-start-column">
        <h2>
          <Link className="card-heading" href={post.url}>
            {post.title}
          </Link>
        </h2>
        <div className="flex-a-j-center card-topic">
          <time dateTime={post.date}>
            {format(parseISO(post.date), "dd.MM.yyyy")}
          </time>
          <p>/{post.topic}</p>
        </div>

        <div className="margintop">
          <p>{post.des}</p>
        </div>
      </div>
    </div>
  );
}

function QuickSelectGroup(props) {
  const posts = allPosts.sort((a, b) =>
  compareDesc(new Date(a.date), new Date(b.date)),
);

const id = props.title;

  return(
    <div>
        <h3>{props.title}</h3>
        <ul className="quick-links">
          {posts
            .filter((post) => post.id === id)
            .map((post, idx) => (
              <li key={idx}>
                <div>
                  <p className="no-margin topic-quick">{post.topic}</p>
                  <Link className="no-margin title-quick" href={post.url}>
                    {post.title}
                  </Link>
                </div>
                <div className="divider-hor"></div>
              </li>
            ))}
        </ul>
    </div>
  )
}

/*About Me*/
export function AboutMeCard() {
  return(
    <div className="flex gap about-card">
      <img src="/JAKEPB.jpg" alt="ProfileImage"/>
      <div>
        <p><i>Philosphoscher Supertext</i></p>
        <p>~Nico Puelacher~</p>
        <div className="techstack flex gap">
          <FaHtml5/>
          <FaCss3/>
          <FaJs/>
          <FaReact/>
          <FaPython/>
        </div>
      </div>
    </div>
  )
}

/* Main Highlight */

export function MainHighlight() {

  return(
    <div className="highlight-main">
      <div className="black-transparent">
        <Navbar/>
        <div className=" flex-a-j-center height-100">
          <div className="flex-a-j-center-column">
            <h1>Nico Puelacher</h1>
            <p>Fortgeschrittene Interaktionstechnologien</p>
          </div>
        </div>
      </div>

    </div>
  )
}