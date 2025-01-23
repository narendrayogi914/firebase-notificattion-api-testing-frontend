import React, { useState } from 'react';
import './App.css';
import  image  from './assets/54.png'

// You can use `axios` for easier API requests, or continue using `fetch` if you prefer.
import axios from 'axios'; // If you want to use Axios for requests

function App() {
  // State to hold the values for token, title, and body
  const [token, setToken] = useState('');
  const [title, setTitle] = useState('');
  const [projectId , setProjectId] = useState('')
  const [body, setBody] = useState('');

  const [loading, setLoading] = useState(false); // For showing loading status
  const [message, setMessage] = useState(''); // For showing success/error message


  
  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setLoading(true);
    setMessage('');

    try {
      // Make the POST request to the backend to send the notification
      const response = await axios.post('http://localhost:3000/send-notification', {
        token: token,
        title: title,
        projectId:projectId,
        body: body,
      });

      // Handle success response
      if (response.data.success) {
        setMessage('Notification sent successfully!');
      } else {
        setMessage(`Error: ${response.data.message}`);
      }
    } catch (error) {
      console.error('Error sending notification:', error);
      setMessage('Failed to send notification');
    } finally {
      // Hide loading status
      setLoading(false);
    }
  };

  return (
    <>
     <h1 className="headingText">API Testing For Notification</h1>
<div className="mainContainer">
  <div className="imageContainer">
    <img src={image} alt="Notification" />
  </div>
  <div className="formContainer">
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="token">Token:</label>
        <input
          type="text"
          id="token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="projectId">Project   ID:</label>
        <input
          type="text"
          id="projectId"
          value={projectId}
          onChange={(e) => setProjectId(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="body">Body:</label>
        <input
          type="text"
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />
      </div>

      {/* Loading indicator */}
      {loading && <p>Sending notification...</p>}

      <button type="submit" disabled={loading}>
        Send Notification
      </button>
    </form>

    {/* Display success or error message */}
    {message && <p>{message}</p>}
  </div>
</div>
    </>
  );
}

export default App;
