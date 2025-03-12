import React from "react";
import styles from "./Blog.module.css";
import Footer from "../../components/Footer/Footer";
import NewsLetter from '../../components/NewsLetter/NewsLetter';
import Collection from "../../components/Collection/Collection";

const blogPosts = [
  {
    title: "10 Tips for Choosing the Perfect Sofa",
    author: "Emma Johnson",
    date: "Feb 10, 24",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2158&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Maximizing Small Spaces: Smart Storage Ideas",
    author: "David Smith",
    date: "Mar 5, 24",
    image:
      "https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "The Best Color Schemes for Modern Interiors",
    author: "Sophia Williams",
    date: "Apr 15, 24",
    image:
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=1080&fit=crop",
  },
  {
    title: "Sustainable Furniture: Eco-Friendly Choices",
    author: "Michael Brown",
    date: "May 8, 24",
    image:
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "How to Mix Vintage and Modern Furniture",
    author: "Jessica Green",
    date: "Jun 20, 24",
    image:
      "https://plus.unsplash.com/premium_photo-1676823553207-758c7a66e9bb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Choosing the Right Lighting for Your Home",
    author: "Daniel Carter",
    date: "Jul 3, 24",
    image:
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1080&fit=crop",
  },
  {
    title: "DIY Home Decor: Easy Projects for Beginners",
    author: "Olivia Martinez",
    date: "Aug 12, 24",
    image:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1080&fit=crop",
  },
  {
    title: "The Ultimate Guide to Outdoor Furniture",
    author: "Christopher White",
    date: "Sep 5, 24",
    image:
      "https://images.unsplash.com/photo-1633330948542-0b3bdeefcdb3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Maintaining Wooden Furniture: Dos and Don'ts",
    author: "Natalie Scott",
    date: "Oct 28, 24",
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1080&fit=crop",
  },
];

const Blog = () => {
  return (
    <div>
      <div className={styles.blogHeader}>
        <h2>Our Blog</h2>
      </div>
      <div className={styles.blogContent}>
        <h2>About our blog</h2>
        <p>
          At Furniture Furniflex, we're passionate about more than just
          furniture. We're dedicated to helping you create a home that reflects
          your unique style and personality. Our blog is your go-to resource for
          the latest trends, design tips, and practical advice on all things
          related to home decor and furnishings.
        </p>
      </div>
      {/* Blog Section */}
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
              by <span className={styles.author}>{post.author}</span> on{" "}
              <span className={styles.date}>{post.date}</span>
            </p>
          </div>
        ))}
      </div>
      <NewsLetter/>
      <Collection />
      <Footer />
    </div>
  );
};

export default Blog;
