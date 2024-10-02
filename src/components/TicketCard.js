import React from "react";
import './TicketCard.css';

const TicketCard = ({ id, title, tag, userId, priority }) => {
  const user = users.find(user => user.id === userId);

  return (
    <div className="ticket-card-container">
      <div className="ticket-card-header">
        <div>
          <span className="ticket-card-id">{id}</span>
          <h2 className="ticket-card-title">{title}</h2>
        </div>
        <div className="ticket-card-avatar" style={{ backgroundImage: `url(${user.avatar})` }}></div>
      </div>

      <div className="ticket-card-tag-container">
        <div className="ticket-tag-icon">!</div>
        <div className="ticket-tag">{tag}</div>
      </div>

      <div className="ticket-more-options"></div>
    </div>
  );
};

export default TicketCard;
