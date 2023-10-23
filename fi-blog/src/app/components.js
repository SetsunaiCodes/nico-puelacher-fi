import Link from "next/link";
import { compareDesc, format, parseISO } from "date-fns";
import { allPosts } from "contentlayer/generated";

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
          </ul>

          <div className="btn-container-nav">
            <a target="_blank" href="https://github.com/SetsunaiCodes">
              <button>GitHub</button>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export function PostCard(post) {
  return (
    <div className="article-cards">
      <Link href={post.url}>
        <img src={post.imagepath} />
      </Link>
      <div className="section flex-a-center-j-start-column">
        <div className="flex-a-j-center">
          <time dateTime={post.date}>
            {format(parseISO(post.date), "dd.MM.yyyy")}
          </time>
          <p>/{post.topic}</p>
        </div>

        <h2>
          <Link className="card-heading" href={post.url}>
            {post.title}
          </Link>
        </h2>
        <div>
          <p>{post.des}</p>
        </div>
      </div>
    </div>
  );
}

function PersonalCard(){
  const name = "Nico Puelacher"
  const role = "Programmierer"

  return(
    <div className="personal-card flex-a-center-j-start-column gap">
        <img src="/JAKEPB.jpg" />
        <div>
          <div className="flex gap"><b>Name:</b><p>{name}</p></div>
          <div className="flex gap"><b>Rolle:</b><p>{role}</p></div>
        </div>
      </div>
  )
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

export function AsideBar() {

  return (
    <div>
      <PersonalCard/>
      <div className="section">
        <h2>Quick Links</h2>
        <QuickSelectGroup title = "Gedankengänge"/>
        <QuickSelectGroup title = "Hausaufgabe"/>
        <QuickSelectGroup title = "DevLog"/>
      </div>
    </div>
  );
}
