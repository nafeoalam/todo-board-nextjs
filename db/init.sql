-- init.sql
CREATE TABLE tickets (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    expiry_date TIMESTAMP NOT NULL
);

INSERT INTO tickets (title, description, expiry_date) VALUES
('Server Maintenance', 'Scheduled maintenance of the server infrastructure.', '2024-12-15 08:00:00'),
('Software Update', 'Update the software to the latest version to include new features and bug fixes.', '2024-12-20 23:59:00'),
('Security Patch', 'Apply critical security patches to address vulnerabilities discovered in the system.', '2024-11-30 15:30:00');

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

INSERT INTO users (username, password) VALUES
('user1', '1234'),
('user2', 'password2');
