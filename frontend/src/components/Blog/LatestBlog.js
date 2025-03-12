import React from "react";
import styles from "./LatestBlog.module.css";
import { Button } from "@mui/material";
import EastIcon from "@mui/icons-material/East";
import { useNavigate } from "react-router-dom";

const blogPosts = [
  {
    title: "First Time Home Owner Ideas",
    author: "Kristin Watson",
    date: "Apr 19, 24",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1080&fit=crop",
  },
  {
    title: "How To Keep Your Furniture Clean",
    author: "Robert Fox",
    date: "Apr 20, 24",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1080&fit=crop",
  },
  {
    title: "Small Space Furniture Apartment Ideas",
    author: "Kristin Watson",
    date: "Dec 20, 24",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1080&fit=crop",
  },
];
const LatestBlog = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.blogContainer}>
      <div className={styles.header}>
        <h2>Explore Our Latest Blog</h2>
        <Button className={styles.btn} variant="contained" color="warning" onClick={() => navigate("/blog")}>
          View All Posts <EastIcon />
        </Button>
      </div>
      <div className={styles.blogGrid}>
        {blogPosts.map((post, index) => (
          <div key={index} className={styles.blogCard}>
            <img
              src={post.image}
              alt={post.title}
              className={styles.blogImage}
            />
            <h3 className={styles.blogTitle}>{post.title}</h3>
            <p className={styles.blogPara}>
              by <span className={styles.author}>{post.author}</span> on {""}
              <span className={styles.date}>{post.date}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default LatestBlog;
