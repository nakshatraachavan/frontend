import React, { useState, useEffect, useRef } from 'react';
import './DisplayDropdown.css'; // For dropdown styling
import displayIcon from '../assets/Display.svg'; // Replace with your display icon path
import arrowIcon from '../assets/down.svg'; // Replace with your arrow icon path

const DisplayDropdown = ({ onDisplayChange, onSortChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isGroupingOpen, setIsGroupingOpen] = useState(false);
  const [isSortingOpen, setIsSortingOpen] = useState(false);
  
  const dropdownRef = useRef(null); // Ref for dropdown container

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option) => {
    onDisplayChange(option);
    setIsGroupingOpen(false);
    setIsSortingOpen(false);
    setIsOpen(false); // Close dropdown after option selection
  };

  const handleSortClick = (option) => {
    onSortChange(option);
    setIsSortingOpen(false);
    setIsGroupingOpen(false);
    setIsOpen(false); // Close dropdown after option selection
  };

  // Close dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setIsGroupingOpen(false);
        setIsSortingOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="display-dropdown" ref={dropdownRef}>
      <button onClick={toggleDropdown} className="display-btn">
        <img src={displayIcon} alt="Display Icon" className="display-icon" /> 
        Display
      </button>
      {isOpen && (
        <div className="dropdown-options">
          {/* Grouping Dropdown */}
          <div className="main-dropdown">
            <label className="grouping-label">Grouping:</label>
            <div className="nested-dropdown">
              <button
                onClick={() => setIsGroupingOpen(!isGroupingOpen)}
                className="nested-btn"
              >
                Group by <img src={arrowIcon} alt="Arrow" className="arrow-icon" />
              </button>
              {isGroupingOpen && (
                <ul className="dropdown-menu">
                  <li onClick={() => handleOptionClick('status')}>Status</li>
                  <li onClick={() => handleOptionClick('user')}>User</li>
                  <li onClick={() => handleOptionClick('priority')}>Priority</li>
                </ul>
              )}
            </div>
          </div>

          {/* Sorting Dropdown */}
          <div className="main-dropdown">
            <label className="grouping-label">Sorting:</label>
            <div className="nested-dropdown">
              <button
                onClick={() => setIsSortingOpen(!isSortingOpen)}
                className="nested-btn"
              >
                Sort by <img src={arrowIcon} alt="Arrow" className="arrow-icon" />
              </button>
              {isSortingOpen && (
                <ul className="dropdown-menu">
                  <li onClick={() => handleSortClick('title-asc')}>Title (A-Z)</li>
                  <li onClick={() => handleSortClick('priority-desc')}>
                    Priority (High to Low)
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplayDropdown;
