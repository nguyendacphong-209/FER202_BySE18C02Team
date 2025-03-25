import React from "react";
import "./ReviewComponent.scss";


const reviews = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    avatar: "/images/avt.jpg",
    comment: "Phim rất hay, nội dung hấp dẫn!",
    rating: 4.5,
  },
  {
    id: 2,
    name: "Trần Thị B",
    avatar: "/images/avt2.jpg",
    comment: "Diễn xuất xuất sắc, đáng để xem!",
    rating: 5,
  },
  {
    id: 3,
    name: "Lê Văn C",
    avatar: "/images/user.png",
    comment: "Hơi dài nhưng rất đáng tiền!",
    rating: 4,
  },
];

const ReviewComponent = () => {
  return (
    <div className="review-section">
      <h3>Đánh giá từ khán giả</h3>
      {reviews.map((review) => (
        <div key={review.id} className="review-card">
          <img src={review.avatar} alt={review.name} className="review-avatar" />
          <div className="review-content">
            <h4>{review.name}</h4>
            <p>{review.comment}</p>
            <span className="review-rating">⭐ {review.rating}/5</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewComponent;
