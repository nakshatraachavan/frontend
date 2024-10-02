import React, { useEffect, useState } from 'react';
import './App.css';
import Card from './components/Card';
import DisplayDropdown from './components/DisplayDropdown';

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [displayOption, setDisplayOption] = useState('status');
  const [sortOption, setSortOption] = useState('');  // New state for sorting

  const apiUrl = 'https://api.quicksell.co/v1/internal/frontend-assignment';

  useEffect(() => {
    const fetchTicketsAndUsers = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setTickets(data.tickets);
        setUsers(data.users);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchTicketsAndUsers();
  }, []);

  const handleDisplayChange = (option) => {
    setDisplayOption(option);
  };

  const handleSortChange = (option) => {
    setSortOption(option);  // Update sorting option when selected
  };

  const sortTickets = (tickets) => {
    // Sorting logic based on the selected sorting option
    if (sortOption === 'title-asc') {
      return [...tickets].sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === 'priority-desc') {
      return [...tickets].sort((a, b) => b.priority - a.priority);
    }
    return tickets;
  };

  const getColumns = () => {
    const sortedTickets = sortTickets(tickets);  // Apply sorting to tickets

    if (displayOption === 'user') {
      return users.map(user => ({
        name: user.name,
        tickets: sortedTickets.filter(ticket => ticket.userId === user.id),
      }));
    }
    if (displayOption === 'priority') {
      const priorityLevels = ['No Priority', 'Low', 'Medium', 'High', 'Urgent'];
      return priorityLevels.map((priority, index) => ({
        name: priority,
        tickets: sortedTickets.filter(ticket => ticket.priority === index),
      }));
    }
    const statuses = ['Todo', 'In progress', 'Done', 'Canceled'];
    return statuses.map(status => ({
      name: status,
      tickets: sortedTickets.filter(ticket => ticket.status === status),
    }));
  };

  return (
    <div className="app-container">
      <div className="top-bar">
        <DisplayDropdown onDisplayChange={handleDisplayChange} onSortChange={handleSortChange} />
      </div>
      <div className="kanban-board">
        {getColumns().map((column, index) => (
          <div className="column" key={index}>
            <div className="column-header">
              <h2>{column.name} ({column.tickets.length})</h2>
              <div className="column-actions">
                <button className="icon-button">+</button>
                <button className="icon-button">⋯</button>
              </div>
            </div>
            <div className="column-tickets">
              {column.tickets.map(ticket => (
                <Card key={ticket.id} ticket={ticket} users={users} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
