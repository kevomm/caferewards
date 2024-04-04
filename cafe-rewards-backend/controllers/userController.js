// Example userController.js

// Dummy users array for demonstration
const users = [{ id: 1, name: "John Doe", email: "john@example.com" }];

// Get all users
exports.listUsers = (req, res) => {
    res.json(users);
};

// Get a single user by ID
exports.getUser = (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('User not found.');
    res.json(user);
};

// Create a new user
exports.createUser = (req, res) => {
    // Implement user creation logic here
    // For demonstration, returning a simple message
    res.send("User created successfully.");
};

// Update a user
exports.updateUser = (req, res) => {
    // Implement user update logic here
    // For demonstration, returning a simple message
    res.send("User updated successfully.");
};

// Delete a user
exports.deleteUser = (req, res) => {
    // Implement user deletion logic here
    // For demonstration, returning a simple message
    res.send("User deleted successfully.");
};
