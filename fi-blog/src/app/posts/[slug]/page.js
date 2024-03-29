import { compareDesc, format, parseISO } from "date-fns";
import { allPosts } from "contentlayer/generated";
import remarkGfm from "remark-gfm";

/*Components*/
import { AsideBar } from "src/app/components";
import { Navbar } from "src/app/components";

export const generateStaticParams = async () =>
  allPosts.map((post) => ({ slug: post._raw.flattenedPath }));

export const generateMetadata = ({ params }) => {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);
  if (!post) throw new Error(`Post not found for slug: ${params.slug}`);
  return { title: post.title };
};

const PostLayout = ({ params }) => {

  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);
  if (!post) throw new Error(`Post not found for slug: ${params.slug}`);

  const currentImagePath = "/" + post.imagepath;
  return (
    <div>
      <Navbar/>
      <div className="section">
        <div className="flex-a-start-j-center">
          <aside className="margin-aside">
            <AsideBar />
          </aside>
          <main>
            <article>
              <div>
                <img className="artikel-image" src={currentImagePath} />
                <div className="article-heading-container flex-a-j-center">
                  <p className="emote">{post.emote}</p>
                  <h1 className="article-heading">{post.title}</h1>
                  <div className="divider-sen"></div>
                  <time className="font-bold" dateTime={post.date}>
                    {format(parseISO(post.date), "dd.MM.yyyy")}
                  </time>
                </div>
              </div>
              <div dangerouslySetInnerHTML={{ __html: post.body.html }} />
            </article>
          </main>
        </div>
      </div>
    </div>
  );
};

export default PostLayout;
