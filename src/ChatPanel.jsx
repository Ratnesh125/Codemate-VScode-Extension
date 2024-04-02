
import React, { useState } from 'react';

const ChatPanel = () => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const sendMessage = () => {
        if (inputValue.trim() === '') return;
        setMessages([...messages, inputValue]);
        setInputValue('');
        // You can implement sending message to server logic here
    };

    return (
        <div>
            <div>
                {messages.map((message, index) => (
                    <div key={index}>{message}</div>
                ))}
            </div>
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default ChatPanel;
