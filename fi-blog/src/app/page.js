"use client"
import React, { useState } from "react";
import Link from "next/link";
import { compareDesc, format, parseISO } from "date-fns";
import { allPosts, Post } from "contentlayer/generated";

/*Components*/
import { PostCard } from "./components";
import { AsideBar } from "./components";
import { Navbar } from "./components";

const cardContainerStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: "10px",
};

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredPosts = allPosts
    .filter((post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div>
      <Navbar onSearch={handleSearch} />
      <div className="flex-a-start-j-center section margintop">
        <aside className="margin-aside">
          <AsideBar />
        </aside>
        <main>
          <h1>Uploads</h1>
          <div style={cardContainerStyle}>
            {filteredPosts.map((post, idx) => (
              <PostCard key={idx} {...post} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}