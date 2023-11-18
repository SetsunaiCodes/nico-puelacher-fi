import Link from "next/link";
import { compareDesc, format, parseISO } from "date-fns";
import { allPosts, Post } from "contentlayer/generated";

/*Components*/
import { Navbar } from "./components";
import { MainHighlight } from "./components";
import { PostCard } from "./components";
import { AsideBar } from "./components";

const cardContainerStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: "10px",
};

export default function Home() {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date)),
  );

  return (
    <div>
      <MainHighlight/>
      <div className="flex-a-start-j-center section margintop">
        <aside className="margin-aside">
          <AsideBar/>
        </aside>
        <main>
          <h1>Uploads</h1>
          <div style={cardContainerStyle}>
            {posts.map((post, idx) => (
              <PostCard key={idx} {...post} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
