"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

import Form from "@/components/Form";

const EditPrompt = () => {
  const router = useRouter();
  const promptId = useSearchParams().get("id");
  // console.log(promptId);

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);

      const post = await response.json();

      setPost({
        prompt: post.prompt,
        tag: post.tag,
      });
    };
    if (promptId) fetchPost();
  }, [promptId, setPost]);


  // updating the current post 
  const editPromptHandler = async (e) => {
    console.log("editPromptHandler");
    e.preventDefault();

    if (!promptId) return alert("Prompt Id not found.");

    setSubmitting(true);

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      submitHandler={editPromptHandler}
    />
  );
};

export default EditPrompt;
