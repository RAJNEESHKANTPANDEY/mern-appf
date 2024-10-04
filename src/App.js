import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/items'; // URL of the back-end API

function App() {
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState('');
  const [itemSal, setItemSal] = useState('');

  // Fetch items from the server
  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // Handle form submit to add a new item
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(API_URL, { name: itemName ,salary:itemSal}, { headers: { 'Content-Type': 'application/json' } })
      .then((response) => {
        console.log(response.data);
        setItems([...items, { name: itemName,salary:itemSal }]);
        setItemName(''); // Clear input field
      })
      .catch((error) => {
        console.error('Error adding item:', error);
      });
  };

  return (
    <div className="App">
      <h1>Item List</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          placeholder="Enter item name"
          required
        />
             <input
          type="text"
          value={itemSal}
          onChange={(e) => setItemSal(e.target.value)}
          placeholder="Enter item name"
          required
        />
        <button type="submit">Add Item</button>
      </form>

      <ul>
        {items.map((item, index) => (
          <li key={index}>{item.name},{item.salary}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
