import React, { useState } from "react";
import "./AboutUsComponent.scss";

const teamMembers = [
  {
    id: 1,
    name: "Nguyễn Đắc Phong",
    role: "Founder & CEO",
    avatar: "/images/image2.png",
  },
  {
    id: 2,
    name: "Nguyễn Thành Sơn",
    role: "Lead Developer",
    avatar: "/images/image1.png",
  },
  {
    id: 3,
    name: "Hồ Sĩ Hưng",
    role: "UI/UX Designer",
    avatar: "/images/image.png",
  },
  {
    id: 4,
    name: "Lê Long Phú",
    role: "UI/UX Designer",
    avatar: "/images/image3.png",
  },
  {
    id: 5,
    name: "Nguyễn Quang Thanh",
    role: "UI/UX Designer",
    avatar: "/images/image4.png",
  },
];

const AboutUsComponent = () => {
  const [feedback, setFeedback] = useState("");
  const [feedbackList, setFeedbackList] = useState([]);

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    if (feedback.trim() !== "") {
      setFeedbackList([...feedbackList, feedback]);
      setFeedback("");
    }
  };

  return (
    <div className="about-us">
      <h2>Về Chúng Tôi</h2>
      <p>
        Chào mừng bạn đến với <strong>Phim Cu</strong>! Chúng tôi cung cấp đánh giá phim,
        danh sách yêu thích và cập nhật những bộ phim hot nhất!
      </p>

      {/* Hiển thị danh sách thành viên nhóm */}
      <h3>🌟 Đội Ngũ Của Chúng Tôi</h3>
      <div className="team-container">
        {teamMembers.map((member) => (
          <div key={member.id} className="team-member">
            <img src={member.avatar} alt={member.name} />
            <h4>{member.name}</h4>
            <p>{member.role}</p>
          </div>
        ))}
      </div>

      {/* Phản hồi từ người dùng */}
      <h3>💬 Gửi Phản Hồi Của Bạn</h3>
      <form className="feedback-form" onSubmit={handleFeedbackSubmit}>
        <textarea
          placeholder="Nhập phản hồi của bạn..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
        <button type="submit">Gửi</button>
      </form>

      {/* Danh sách phản hồi */}
      {feedbackList.length > 0 && (
        <div className="feedback-list">
          <h4>📢 Ý kiến từ người dùng:</h4>
          <ul>
            {feedbackList.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Thông tin liên hệ */}
      <h3>📩 Liên Hệ</h3>
      <p>📧 Email: <a href="mailto:support@phimcu.com">support@phimcu.com</a></p>
      <p>📍 Địa chỉ: Phòng 216, Đại Học FPT, Đà Nẵng</p>
      <p>📞 Số điện thoại: <a href="tel:+84369035808">+84 369 035 808</a></p>

      {/* Mạng xã hội */}
      <div className="social-links">
        <a href="https://www.facebook.com/share/16Wf4cvzrw/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer">
          Facebook
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          Twitter
        </a>
      </div>
    </div>
  );
};

export default AboutUsComponent;
