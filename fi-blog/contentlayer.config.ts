import { defineDocumentType, makeSource } from "contentlayer/source-files";
import remarkGfm from "remark-gfm";

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `**/*.md`,
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
    des: { type: "string", required: false },
    imagepath: { type: "string", required: true },
    topic: { type: "string", required: false },
    id: { type: "string", required: false },
    emote: { type: "string", required: false }
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (post) => `/posts/${post._raw.flattenedPath}`,
    },
  },
}));

export default makeSource({ 
  contentDirPath: "posts", 
  documentTypes: [Post], 
  mdx:{remarkPlugins: [remarkGfm] 
  
  }
});
