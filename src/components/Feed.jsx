"use client";

import React, { useCallback, useEffect, useState } from "react";
import PromptCard from "./PromptCard";

// this component is going to used in this 'Feed' comp. only
const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);

  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchedResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      console.log(data);
      setAllPosts(data);
    };

    fetchPosts();
  }, [setAllPosts]);

  // debouncing
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      // filter posts
      const regEx = new RegExp(searchText, "i");

      const filteredPosts = allPosts.filter(
        (post) =>
          regEx.test(post.creator.username) ||
          regEx.test(post.prompt) ||
          regEx.test(post.tag)
      );
      setSearchResults(filteredPosts);
    }, 500);

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [searchText, setSearchResults]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const tagClickHandler = (tag) => {
    setSearchText(tag);
  };
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      {/* All Prompts */}
      {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={tagClickHandler}
        />
      ) : (
        <PromptCardList data={allPosts} handleTagClick={tagClickHandler} />
      )}
    </section>
  );
};

export default Feed;
