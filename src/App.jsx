import React, { useState } from 'react';
import './App.css';
import image from './assets/54.png';
import axios from 'axios'; // If you want to use Axios for requests

function App() {
  const [token, setToken] = useState('');
  const [title, setTitle] = useState('');
  const [projectId, setProjectId] = useState('');
  const [body, setBody] = useState('');

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await axios.post('https://firebase-notification-app-testing-backend.onrender.com/send-notification', {
        token: token,
        title: title,
        projectId: projectId,
        body: body,
      });

      if (response.data.success) {
        setMessage('Notification sent successfully!');
      } else {
        setMessage(`Error: ${response.data.message}`);
      }
    } catch (error) {
      console.error('Error sending notification:', error);
      setMessage('Failed to send notification');
    } finally {
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
              <label htmlFor="projectId">Project ID:</label>
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

      {/* Footer Section */}
      <footer className="footer">
        <p>Developed by Narendra Yogi</p>
        <div className="socialLinks">
          <a href="https://www.linkedin.com/in/naredrayogi914/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://github.com/narendrayogi914" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://www.instagram.com/narendrayogi_/" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
      </footer>
    </>
  );
}

export default App;