"use client";
import React, { useEffect, useState } from "react";
import Profile from "@/components/Profile";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const MyProfile = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [posts, setPosts] = useState([]);

  const id = session?.user.id;

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${id}/posts`);

      if (!response.ok) return;

      const data = await response.json();
    //   console.log(data);
      setPosts(data);
    };

    if(id) fetchPosts();
  }, [setPosts, id]);

  const handleDelete = async (post) => {
    const hasConfirmed = confirm('Are you sure you want to delete this prompt?');

    if(hasConfirmed){
        try {
            await fetch(`/api/prompt/${post._id.toString()}`, {
                method: 'DELETE'
            });

            const filteredPosts = posts.filter(p => p._id !== post._id);

            setPosts(filteredPosts);
        } catch (error) {
            console.log(error);
        }
    }
  };
  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };



  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={posts}
      handleDelete={handleDelete}
      handleEdit={handleEdit}
    />
  );
};

export default MyProfile;
