import React from "react";

const PostCard = ({ post }) => {
  // Check if post is defined and has the necessary properties
  if (
    !post ||
    !post.medium_image ||
    !post.medium_image[0] ||
    !post.medium_image[0].url
  ) {
    // If data is missing, handle accordingly
    return null; // or display a placeholder, error message, etc.
  }

  const date = new Date(post.published_at).toLocaleDateString("en-us", {
    // weekday: "long",
    month: "long",
    year: "numeric",
    day: "numeric",
  });

  const imageUrl = post.medium_image[0].url;
  const placeholder =
    "https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg";
  return (
    <article className="border shadow-xl">
      <img
        className="aspect-video h-1/2"
        src={imageUrl || placeholder}
        alt={post.title}
        loading="lazy"
      />
      <section className="p-6">
        <p className="text-gray-400 font-semibold uppercase">{date}</p>
        <h1 className="font-bold">{post.title}</h1>
      </section>
    </article>
  );
};

export default PostCard;
