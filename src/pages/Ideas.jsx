import React, { useEffect, useState } from "react";
import PostCard from "../components/PostCard";

const Ideas = () => {
  const storedSortOption = localStorage.getItem("sortOption") || "newest";
  const storedItemsPerPage = localStorage.getItem("itemsPerPage") || 10;

  console.log("storedSortOption:", storedSortOption);
  console.log("storedItemsPerPage:", storedItemsPerPage);

  const [posts, setPosts] = useState([]);
  const [sortOption, setSortOption] = useState(storedSortOption);
  const [itemsPerPage, setItemsPerPage] = useState(
    parseInt(storedItemsPerPage, 10)
  );
  const [currentPage, setCurrentPage] = useState(() => {
    return parseInt(localStorage.getItem("currentPage"), 10) || 1;
  });
  const [totalPages, setTotalPages] = useState(1);

  const image = [
    {
      image_src:
        "https://images.unsplash.com/photo-1682685797088-283404e24b9d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8",
      title: "dsds",
    },
  ];

  const getPosts = async () => {
    const sortParam =
      sortOption === "newest" ? "-published_at" : "published_at";
    const response = await fetch(
      `https://suitmedia-backend.suitdev.com/api/ideas?page[number]=${currentPage}&page[size]=${itemsPerPage}&append[]=small_image&append[]=medium_image&sort=${sortParam}`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    const post = await response.json();
    setPosts(post.data);

    setTotalPages(Math.ceil(post.meta.total / itemsPerPage));
  };

  const handleSortChange = (event) => {
    const selectedOption = event.target.value;
    setSortOption(selectedOption);
    setCurrentPage(1);
    localStorage.setItem("sortOption", selectedOption);
  };

  const handleItemsPerPageChange = (event) => {
    const selectedItemsPerPage = parseInt(event.target.value, 10);
    setItemsPerPage(selectedItemsPerPage);
    setCurrentPage(1);
    localStorage.setItem("itemsPerPage", selectedItemsPerPage.toString());
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);

      // Save the current page to localStorage
      localStorage.setItem("currentPage", newPage);
    }
  };

  useEffect(() => {
    getPosts();
  }, [sortOption, itemsPerPage, currentPage]);

  return (
    <main className="w-full mx-auto">
      <img
        className="relative h-screen w-full aspect-video"
        src={image[0].image_src}
        alt={image[0].title}
      />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white text-4xl">
        <h1>Ideas</h1>
        <p className="text-2xl">Where all our great things begin</p>
      </div>
      <div className="absolute -bottom-20 left-0 w-full h-1/2">
        <div
          className="h-full w-full bg-white"
          style={{
            clipPath: "polygon(100% 4%, 0 100%, 100% 100%)",
            // clipPath: "polygon(100% 44%, 100% 0%, 0% 100%)",
          }}
        ></div>
      </div>

      <section className="flex justify-between w-4/5 mx-auto py-6">
        <p>Showing 1 - {itemsPerPage} of 100</p>
        <section className="flex gap-24">
          <div className="flex justify-center items-center gap-4">
            <p>Show per page</p>
            <select
              className="border-2 rounded-xl px-4"
              name="number"
              id="number"
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </div>
          <div className="flex justify-center items-center gap-4">
            <p>Sort by</p>
            <select
              className="border-2 rounded-xl px-4"
              name="sorting"
              id="sorting"
              value={sortOption}
              onChange={handleSortChange}
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
        </section>
      </section>
      <section className="w-4/5 mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {posts.map((post) => {
          return <PostCard key={post.id} post={post} />;
        })}
      </section>
      <div className="flex justify-center items-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="mr-2 px-4 py-2 border border-gray-300 rounded"
        >
          Previous
        </button>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="ml-2 px-4 py-2 border border-gray-300 rounded"
        >
          Next
        </button>
      </div>
    </main>
  );
};

export default Ideas;
