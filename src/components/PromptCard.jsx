import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";
import { usePathname } from "next/navigation";

const PromptCard = ({ post, handleTagClick, handleDelete, handleEdit }) => {
  const [copied, setCopied] = useState("");
  const { data: session } = useSession();
  const pathname = usePathname();

  const copyHandler = () => {
    setCopied(post.prompt);

    navigator.clipboard.writeText(post.prompt);
    // reset the copy state
    setTimeout(() => {
      setCopied("");
    }, 3000);
  };

  return (
    <div className="prompt_card">
      <div className="flex justify-content items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3">
          <Image
            src={post.creator.image}
            alt="creator"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />

          {/* details of the creator */}
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.creator.email}
            </p>
          </div>
        </div>
        {/* copy button */}
        <div className="copy_btn" onClick={copyHandler}>
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            width={12}
            height={12}
            alt="copy_btn"
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-gray-700 text-sm">{post.prompt}</p>
      <p
        className="font-inter blue_gradient text-sm cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        #{post.tag}
      </p>

      {session?.user.id === post.creator._id && pathname === "/profile" && (
        <div className="mt-4 flex-center gap-5 border-t border-gray-200 pt-4">
          <p
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
