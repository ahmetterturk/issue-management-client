import React from 'react';
import Message from '../Message/Message';
import MessageForm from '../MessageForm/MessageForm';

const Messages = ({ messages }) => {
  return (
    <div>
      {messages.map((message, index) => {
        return <Message key={index} message={message} />;
      })}
      <MessageForm />
    </div>
  );
};

export default Messages;
