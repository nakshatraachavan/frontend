import React from 'react';
import './KanbanBoard.css';
import lowPriorityIcon from '../assets/Img - Low Priority.svg';
import mediumPriorityIcon from '../assets/Img - Medium Priority.svg';
import highPriorityIcon from '../assets/Img - High Priority.svg';
import urgentPriorityIcon from '../assets/SVG - Urgent Priority colour.svg';
import noPriorityIcon from '../assets/No-priority.svg';
import todoLogo from '../assets/todo-logo.svg'; // Path to Todo logo
import inProgressLogo from '../assets/in-progress-logo.svg'; // Path to In Progress logo
import doneLogo from '../assets/done-logo.svg'; // Path to Done logo
import cancelledLogo from '../assets/cancelled-logo.svg'; // Path to Cancelled logo
import KanbanColumn from './KanbanColumn'; // Import the KanbanColumn component

const KanbanBoard = ({ tickets }) => {
  const counts = {
    'No priority': tickets.filter(ticket => ticket.priority === 0).length,
    Urgent: tickets.filter(ticket => ticket.priority === 4).length,
    High: tickets.filter(ticket => ticket.priority === 3).length,
    Medium: tickets.filter(ticket => ticket.priority === 2).length,
    Low: tickets.filter(ticket => ticket.priority === 1).length,
    Todo: tickets.filter(ticket => ticket.status === 'Todo').length,
    'In Progress': tickets.filter(ticket => ticket.status === 'In Progress').length,
    Done: tickets.filter(ticket => ticket.status === 'Done').length,
    Canceled: tickets.filter(ticket => ticket.status === 'Canceled').length,
  };

  return (
    <div className="kanban-board">
      <KanbanColumn 
        title="Todo" 
        count={counts['Todo']} 
        icon={todoLogo}
        logo={todoLogo} // Logo for Todo
      />
      <KanbanColumn 
        title="In Progress" 
        count={counts['In Progress']} 
        icon={inProgressLogo}
        logo={inProgressLogo} // Logo for In Progress
      />
      <KanbanColumn 
        title="Done" 
        count={counts['Done']} 
        icon={doneLogo}
        logo={doneLogo} // Logo for Done
      />
      <KanbanColumn 
        title="Canceled" 
        count={counts['Canceled']} 
        icon={cancelledLogo}
        logo={cancelledLogo} // Logo for Canceled
      />
      <KanbanColumn 
        title="Urgent" 
        count={counts['Urgent']} 
        icon={urgentPriorityIcon}
        logo={urgentPriorityIcon} // Logo for Urgent
      />
      <KanbanColumn 
        title="High" 
        count={counts['High']} 
        icon={highPriorityIcon}
        logo={highPriorityIcon} // Logo for High
      />
      <KanbanColumn 
        title="Medium" 
        count={counts['Medium']} 
        icon={mediumPriorityIcon}
        logo={mediumPriorityIcon} // Logo for Medium
      />
      <KanbanColumn 
        title="Low" 
        count={counts['Low']} 
        icon={lowPriorityIcon}
        logo={lowPriorityIcon} // Logo for Low
      />
    </div>
  );
};

export default KanbanBoard;
