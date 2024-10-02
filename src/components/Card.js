import React from 'react';
import './Card.css';
import lowPriorityIcon from '../assets/Img - Low Priority.svg';
import mediumPriorityIcon from '../assets/Img - Medium Priority.svg';
import highPriorityIcon from '../assets/Img - High Priority.svg';
import urgentPriorityIcon from '../assets/SVG - Urgent Priority colour.svg';
import noPriorityIcon from '../assets/No-priority.svg';
import inProgressIcon from '../assets/in-progress.svg';
import todoIcon from '../assets/To-do.svg';
import completedIcon from '../assets/Done.svg';
import cancelledIcon from '../assets/Cancelled.svg';

// Function to get the priority icon based on the priority level
const getPriorityIcon = (priority) => {
  switch (priority) {
    case 4:
      return urgentPriorityIcon;
    case 3:
      return highPriorityIcon;
    case 2:
      return mediumPriorityIcon;
    case 1:
      return lowPriorityIcon;
    case 0:
      return noPriorityIcon;
    default:
      return null;
  }
};

// Function to get the status icon based on the status of the task
const getStatusIcon = (status) => {
  switch (status.toLowerCase()) {
    case 'in progress':
      return inProgressIcon;
    case 'todo':
      return todoIcon;
    case 'done':
      return completedIcon;
    case 'canceled':
      return cancelledIcon;
    default:
      return null;
  }
};

// Function to get initials from the user's name
const getInitials = (name) => {
  const nameParts = name.split(' ');
  const initials = nameParts.map(part => part.charAt(0)).join('');
  return initials.toUpperCase();
};

// Function to get a random color for the avatar background
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const Card = ({ ticket, users }) => {
  const { id, title, priority, tag, status, userId } = ticket;
  const user = users.find((user) => user.id === userId);

  const priorityIcon = getPriorityIcon(priority);
  const statusIcon = getStatusIcon(status);
  const userInitials = user ? getInitials(user.name) : 'NA';
  const avatarColor = getRandomColor();

  return (
    <div className="card-container">
      <div className="card-header">
        <div className="card-status-title">
          {/* Status icon placed before the title */}
          {statusIcon && <img src={statusIcon} alt={status} className="status-icon" />}
          <span className="card-id">{id}</span>
          <h2 className="card-title">{title.length > 50 ? title.substring(0, 100) + '...' : title}</h2>
        </div>
        <div className="card-avatar" style={{ backgroundColor: avatarColor }}>
          {userInitials}
        </div>
      </div>

      <div className="card-info-row">
        <div className="card-priority">
          {priorityIcon && <img src={priorityIcon} alt={`Priority ${priority}`} className="priority-icon" />}
          {/* Add gray dot and tag */}
          <span className="tag-dot"></span>
          <div className="card-tag">
            {tag && tag.length > 0 ? (
              tag.map((t, index) => (
                <div className="tag" key={index}>
                  {t}
                </div>
              ))
            ) : (
              <div className="tag">No tag</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
