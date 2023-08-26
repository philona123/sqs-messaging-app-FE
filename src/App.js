import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [queueUrl, setQueueUrl] = useState("");
  const [messageBody, setMessageBody] = useState("");
  const [response, setResponse] = useState("");

  const sendMessage = async () => {
    try {
      const response = await axios.post("http://localhost:3001/send-message", {
        queueUrl,
        messageBody,
      });
      setResponse(response.data.message);
    } catch (error) {
      setResponse("An error occurred");
    }
  };

  return (
    <div className="App">
      <h1>SQS Messaging App</h1>
      <label>
        <h4>Queue URL: </h4>
        <input
          className="queue-link"
          type="text"
          value={queueUrl}
          onChange={(e) => setQueueUrl(e.target.value)}
        />
      </label>
      <label>
        <h4>Message Body:</h4>
        <textarea
          className="message-textarea"
          value={messageBody}
          onChange={(e) => setMessageBody(e.target.value)}
        />
      </label>
      <button className="send-button" onClick={sendMessage}>
        Send Message
      </button>
      <p>{response}</p>
    </div>
  );
}

export default App;


