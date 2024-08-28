-- Drop existing tables and type if they exist
DROP TABLE IF EXISTS tickets CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TYPE IF EXISTS ticket_status;

-- Create users table with constraints and indexes
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,  -- Ensure usernames are unique
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,  -- Track when each user was created
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create categories table
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,  -- Ensure category names are unique
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,  -- Track when each category was created
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create an ENUM type for ticket status
CREATE TYPE ticket_status AS ENUM ('Open', 'In Progress', 'For Review', 'Resolved', 'Closed');

-- Create tickets table
CREATE TABLE tickets (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    expiry_date TIMESTAMP NOT NULL,
    category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,  -- Set to NULL if the category is deleted
    status ticket_status NOT NULL DEFAULT 'Open',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,  -- Track when each ticket was created
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Triggers to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for users
CREATE TRIGGER update_users_modtime
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_modified_column();

-- Trigger for categories
CREATE TRIGGER update_categories_modtime
    BEFORE UPDATE ON categories
    FOR EACH ROW
    EXECUTE FUNCTION update_modified_column();

-- Trigger for tickets
CREATE TRIGGER update_tickets_modtime
    BEFORE UPDATE ON tickets
    FOR EACH ROW
    EXECUTE FUNCTION update_modified_column();


CREATE TABLE event_logs (
    id SERIAL PRIMARY KEY,
    ticket_id INTEGER REFERENCES tickets(id) ON DELETE CASCADE,  -- Reference to the ticket being updated
    previous_status ticket_status,                              -- Previous status before the update
    new_status ticket_status,                                   -- New status after the update
    event_time TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP, -- Time of the event
    event_description TEXT                                      -- Description of the event
);


CREATE OR REPLACE FUNCTION log_ticket_update()
RETURNS TRIGGER AS $$
BEGIN
    IF OLD.status IS DISTINCT FROM NEW.status THEN
        INSERT INTO event_logs (ticket_id, previous_status, new_status, event_description)
        VALUES (NEW.id, OLD.status, NEW.status, 
                'Ticket ' || NEW.id || ': Has been moved from ' || OLD.status || ' to ' || NEW.status || ' on ' || to_char(now(), 'Mon DD YYYY HH24:MI'));
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_log_ticket_update
AFTER UPDATE ON tickets
FOR EACH ROW
EXECUTE FUNCTION log_ticket_update();
