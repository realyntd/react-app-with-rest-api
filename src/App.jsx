import { useState, useEffect } from 'react';

// Mock data simulating the API response
const mockMessages = [
  { id: 1, content: "Hello!", sender: "User1", timestamp: Date.now() },
  { id: 2, content: "How are you?", sender: "User2", timestamp: Date.now() },
];

function App() {
  const [messages, setMessages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [editMessageId, setEditMessageId] = useState(null);
  const [editContent, setEditContent] = useState('');
  const [loading, setLoading] = useState(false);

  // Simulating fetching messages from an API
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setMessages(mockMessages);
      setLoading(false);
    }, 1000); // Simulate 1s delay for API call
  }, []);

  // Simulate creating a new message
  const handleCreate = async (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setLoading(true);
      const newMessageObj = {
        id: messages.length + 1,
        content: newMessage,
        sender: 'User1',
        timestamp: Date.now(),
      };

      setMessages((prevMessages) => [...prevMessages, newMessageObj]);
      setNewMessage('');
      setLoading(false);
    }
  };

  // Simulate editing a message
  const handleEdit = (id, content) => {
    setEditMessageId(id);
    setEditContent(content);
  };

  // Simulate updating a message
  const handleUpdate = async () => {
    if (editContent.trim()) {
      setLoading(true);
      const updatedMessages = messages.map((msg) =>
        msg.id === editMessageId ? { ...msg, content: editContent } : msg
      );
      setMessages(updatedMessages);
      setEditMessageId(null);
      setEditContent('');
      setLoading(false);
    }
  };

  // Simulate deleting a message
  const handleDelete = async (id) => {
    setLoading(true);
    setMessages(messages.filter((msg) => msg.id !== id));
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-2xl p-6">
        <h1 className="text-4xl font-extrabold text-center mb-8 text-indigo-600">Messaging App</h1>

        {/* New message input */}
        <div className="mb-6">
          <input
            type="text"
            className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 transition"
            placeholder="Type a new message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button
            className="w-full mt-3 py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 transition"
            onClick={handleCreate}
            disabled={loading}
          >
            {loading ? (
              <div className="flex justify-center items-center">
                <div className="w-4 h-4 border-4 border-t-transparent border-indigo-600 border-solid rounded-full animate-spin" />
              </div>
            ) : (
              'Send Message'
            )}
          </button>
        </div>

        {/* Message List */}
        <div className="space-y-6">
          {messages.length > 0 ? (
            messages.map((message) => (
              <div
                key={message.id}
                className="message-card bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition"
              >
                <div className="flex justify-between items-center">
                  <span className="sender text-xl font-semibold text-gray-800">
                    {message.sender}
                  </span>
                  <span className="timestamp text-sm text-gray-500">
                    {new Date(message.timestamp).toLocaleString()}
                  </span>
                </div>

                {/* Display editable message content or regular content */}
                {editMessageId === message.id ? (
                  <div>
                    <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="w-full p-4 mt-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
                    />
                    <div className="mt-4 flex space-x-4">
                      <button
                        className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:ring-2 focus:ring-green-500 transition"
                        onClick={handleUpdate}
                      >
                        Save
                      </button>
                      <button
                        className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:ring-2 focus:ring-gray-500 transition"
                        onClick={() => setEditMessageId(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="mt-3 text-gray-700">{message.content}</p>
                )}

                {/* Action Buttons */}
                <div className="mt-4 flex space-x-4">
                  <button
                    className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-500 transition"
                    onClick={() => handleEdit(message.id, message.content)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:ring-2 focus:ring-red-500 transition"
                    onClick={() => handleDelete(message.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">No messages available</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
