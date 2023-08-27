import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [queueUrl, setQueueUrl] = useState("");
  const [messageBody, setMessageBody] = useState("");
  const [response, setResponse] = useState("");
  const [response2, setPurgeResponse] = useState("");

  const sendMessage = async () => {
    try {
      const response = await axios.post("http://localhost:3001/send-message", {
        queueUrl,
        messageBody,
      });
      setResponse(response.data.message);
      setTimeout(() => {
        setResponse("");
      }, 5000);
    } catch (error) {
      setResponse("An error occurred");
    }
  };

  const purgeQueue = async () => {
    try {
      const response = await axios.post("http://localhost:3001/purge-queue", {
        queueUrl,
      });
      setPurgeResponse(response.data.message);
      setTimeout(() => {
        setPurgeResponse("");
      }, 5000);
    } catch (error) {
      setPurgeResponse("An error occurred");
    }
  };

  return (
    <div className="App">
      <h1>SQS Messaging App</h1>
      <label>
        <h4>Queue URL: </h4>
        <input
          placeholder="Enter the queue url"
          className="queue-link"
          type="text"
          value={queueUrl}
          onChange={(e) => setQueueUrl(e.target.value)}
        />
      </label>
      <label>
        <h4>Message Body:</h4>
        <textarea
          placeholder="Enter the message body"
          className="message-textarea"
          value={messageBody}
          onChange={(e) => setMessageBody(e.target.value)}
        />
      </label>
      <button className="send-button" onClick={sendMessage}>
        Send Message
      </button>
      <p>{response}</p>

      <button className="purge-button" onClick={purgeQueue}>
        Purge Queue
      </button>
      <p>{response2}</p>
    </div>
  );
}

export default App;
