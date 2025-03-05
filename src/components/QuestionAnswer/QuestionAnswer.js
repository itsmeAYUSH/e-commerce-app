import React, { useState } from "react";
import "./QuestionAnswer.css";
const questions = [
  {
    question: "How do I choose the right furniture for my space?",
    answer:
      "Start by measuring your space and considering your layout. Choose furniture that complements your style, fits proportionally, and meets your functional needs. Opt for multi-functional pieces for smaller spaces and ensure there's enough room for movement.",
  },
  {
    question: "What materials are your furniture items made of?",
    answer:
      "Our furniture is crafted from high-quality materials, including solid wood, engineered wood, metal, glass, and premium upholstery fabrics. We prioritize durability, sustainability, and comfort in our material selection.",
  },
  {
    question: "What is your delivery process?",
    answer:
      "We offer white-glove delivery service for most furniture items, which includes professional assembly and placement in your desired room. Delivery times may vary depending on your location and product availability. You will be contacted to schedule a delivery appointment once your order is ready to ship.",
  },
  {
    question: "What is your return and exchange policy?",
    answer:
      "We offer a hassle-free return and exchange policy within 30 days of delivery. Items must be in their original condition and packaging. Custom or clearance items may not be eligible for returns. Please contact our support team to initiate a return or exchange.",
  },
  {
    question: "How do I contact customer support for assistance?",
    answer:
      "You can contact our customer support team via email at furniflex@furniflex.com or call us at +001234567890 or even visit us at Saki Naka, Andheri, Mumbai, Maharashtra. Our support team is available Monday to Friday from 9 AM to 6 PM (EST). You can also reach us through the live chat option on our website.",
  },
];

const QuestionAnswer = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="qna-container">
      <h2>Got Questions? We've Got Answers!</h2>
      <div className="qna-list">
        {questions.map((item, index) => (
          <div
            key={index}
            className={`qna-item ${activeIndex === index ? "active" : ""}`}
            onClick={() => toggleAnswer(index)}
          >
            <div className="qna-question">
              {item.question}
              <button className="toggle-button">
                {activeIndex === index ? "✖" : "→"}
              </button>
            </div>
            {activeIndex === index && (
              <div className="qna-answer">{item.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionAnswer;
