-- Drop existing tables and type if they exist
DROP TABLE IF EXISTS tickets CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TYPE IF EXISTS ticket_status;

-- Create users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Insert sample data into users table
INSERT INTO users (username, password) VALUES
('user1', '1234'),
('user2', 'password2');

-- Create categories table
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT
);

-- Insert sample data into categories table
INSERT INTO categories (name, description) VALUES
('Bugs', 'Issues related to software bugs.'),
('New Feature', 'Requests for new features or enhancements.'),
('Support', 'General support and troubleshooting requests.');

-- Create an ENUM type for ticket status
CREATE TYPE ticket_status AS ENUM ('Open', 'In Progress', 'Resolved', 'Closed');

-- Create tickets table
CREATE TABLE tickets (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    expiry_date TIMESTAMP NOT NULL,
    category_id INTEGER REFERENCES categories(id),
    status ticket_status NOT NULL DEFAULT 'Open'
);

-- Insert sample data into tickets table
INSERT INTO tickets (title, description, expiry_date, category_id, status) VALUES
('Fix Login Bug', 'Resolve the recurring login bug that affects all users.', '2024-12-31 23:59:59', 1, 'In Progress'),
('Develop Chat Feature', 'Design and implement a real-time chat feature for customer support.', '2025-06-30 23:59:59', 2, 'Open'),
('Update Documentation', 'Update the help documentation with the latest interface changes.', '2024-08-31 23:59:59', 3, 'Resolved');
