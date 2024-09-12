// import React, { useState, useEffect } from "react";
// import io from "socket.io-client";

// const socket = io("http://localhost:5000"); 

// function ChatApp() {
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [username, setUsername] = useState("");
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
    
//     socket.on("message", (msgData) => {
//       setMessages((prevMessages) => [...prevMessages, msgData]);
//     });

    
//     socket.on("users", (users) => {
//       setUsers(users);
//     });


//     return () => {
//       socket.off("message");
//       socket.off("users");
//     };
//   }, []);

//   const handleAddUser = () => {
//     if (username) {
//       socket.emit("adduser", username);
//     }
//   };

//   const handleSendMessage = (e) => {
//     e.preventDefault();
//     if (message) {
//       socket.emit("message", message);
//       setMessage("");
//     }
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>Chat Application</h1>

      
//       <div>
//         <input
//           type="text"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           placeholder="Enter your username"
//           style={{ padding: "10px", width: "300px" }}
//         />
//         <button onClick={handleAddUser} style={{ padding: "10px 20px", marginLeft: "10px" }}>
//           Add User
//         </button>
//       </div>

      
//       <form onSubmit={handleSendMessage} style={{ marginTop: "20px" }}>
//         <input
//           type="text"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           placeholder="Enter your message"
//           style={{ padding: "10px", width: "300px" }}
//         />
//         <button type="submit" style={{ padding: "10px 20px", marginLeft: "10px" }}>
//           Send
//         </button>
//       </form>

      
//       <h2>Messages</h2>
//       <ul>
//         {messages.map((msg, index) => (
//           <li key={index}>
//             <strong>{msg.user}:</strong> {msg.message}
//           </li>
//         ))}
//       </ul>

    
//       <h2>Connected Users</h2>
//       <ul>
//         {users.map((user, index) => (
//           <li key={index}>{user}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default ChatApp;









import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { TextField, Button, Typography, Box, List, ListItem, ListItemText } from "@mui/material";

const socket = io("http://localhost:5000");

function ChatApp() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.on("message", (msgData) => {
      setMessages((prevMessages) => [...prevMessages, msgData]);
    });

    socket.on("users", (users) => {
      setUsers(users);
    });

    return () => {
      socket.off("message");
      socket.off("users");
    };
  }, []);

  const handleAddUser = () => {
    if (username) {
      socket.emit("adduser", username);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit("message", message);
      setMessage("");
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Chat Application
      </Typography>

      {/* Username Input */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <TextField
          label="Enter your username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={{ width: "300px" }}
        />
        <Button variant="contained" color="primary" onClick={handleAddUser}>
          Add User
        </Button>
      </Box>

      {/* Message Input */}
      <form onSubmit={handleSendMessage} style={{ marginTop: "20px" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <TextField
            label="Enter your message"
            variant="outlined"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            sx={{ width: "300px" }}
          />
          <Button type="submit" variant="contained" color="secondary">
            Send
          </Button>
        </Box>
      </form>

      {/* Messages List */}
      <Typography variant="h5" gutterBottom sx={{ marginTop: "20px" }}>
        Messages
      </Typography>
      <List>
        {messages.map((msg, index) => (
          <ListItem key={index}>
            <ListItemText primary={`${msg.user}: ${msg.message}`} />
          </ListItem>
        ))}
      </List>

      {/* Connected Users List */}
      <Typography variant="h5" gutterBottom sx={{ marginTop: "20px" }}>
        Connected Users
      </Typography>
      <List>
        {users.map((user, index) => (
          <ListItem key={index}>
            <ListItemText primary={user} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default ChatApp;
