  import React, { useState, useRef } from 'react';

const Chatbox = () => {
  const [state, setState] = useState(false); // Open/closed state
  const [messages, setMessages] = useState([]); // Chat messages
  const inputRef = useRef(null); // Reference for the input field
  const chatboxRef = useRef(null); // Reference for the chatbox

  // Toggle chatbox visibility
  const toggleState = () => {
    setState(!state);
  };

  // Handle sending a message
  const onSendButton = async () => {
    const text = inputRef.current.value;

    if (!text) return;

    const userMessage = { name: 'User', message: text };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        body: JSON.stringify({ message: text }),
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();
      const botMessage = { name: 'GreenPick', message: data.answer };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error:', error);
    }

    inputRef.current.value = '';
  };

  // Render chat messages
  const renderMessages = () => {
    return messages
      .slice()
      .reverse()
      .map((msg, index) => (
        <div
          key={index}
          className={`messages__item ${
            msg.name === 'GreenPick' ? 'messages__item--visitor' : 'messages__item--operator'
          }`}
        >
          {msg.message}
        </div>
      ));
  };

  // Handle "Enter" key in input field
  const handleKeyUp = (event) => {
    if (event.key === 'Enter') {
      onSendButton();
    }
  };

  return (
    <div className="chatbox">
      {/* Chatbox Button */}
      <div className="chatbox__button">
        <button onClick={toggleState} id="btnnn">
          <img src="/path/to/icon.jpg" alt="icon" />
        </button>
      </div>

      {/* Chatbox Support */}
      <div
        className={`chatbox__support ${state ? 'chatbox--active' : ''}`}
        ref={chatboxRef}
      >
        {/* Header */}
        <div className="chatbox__header">
          <div className="chatbox__image--header">
            <img src="/path/to/downlod.png" alt="image" />
          </div>
          <div className="chatbox__content--header">
            <h4 className="chatbox__heading--header">GreenPicker</h4>
            <p className="chatbox__description--header">How can I help you?</p>
          </div>
        </div>

        {/* Messages */}
        <div className="chatbox__messages">{renderMessages()}</div>

        {/* Footer */}
        <div className="chatbox__footer">
          <input
            type="text"
            placeholder="Write a message..."
            ref={inputRef}
            onKeyUp={handleKeyUp}
            className="chatbox__input"
          />
          <button onClick={onSendButton} className="chatbox__send--footer">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbox

//   return (
//     <div class="container">
//     <div class="chatbox">
//         <div class="chatbox__support">
//             <div class="chatbox__header">
//                 <div class="chatbox__image--header">
//                     <img src="../assets/downlod.png" alt="image" />
//                 </div>
//                 <div class="chatbox__content--header">
//                     <h4 class="chatbox__heading--header">GreenPicker</h4>
//                     <p class="chatbox__description--header">How can I help you?</p>
//                 </div>
//             </div>
//             <div class="chatbox__messages">
//                 <div></div>
//             </div>
//             <div class="chatbox__footer">
//                 <input type="text" placeholder="Write a message..." />
//                 <button class="chatbox__send--footer send__button">Send</button>
//             </div>
//         </div>
//         <div class="chatbox__button">
//             <button id = "btnnn"><img src="../assets/logo.jpg" /></button>
//         </div>
//     </div>
// </div>
//   )
// }

// export default Chatbot
