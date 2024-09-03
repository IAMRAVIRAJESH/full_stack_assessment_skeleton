CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE home (
    id INT AUTO_INCREMENT PRIMARY KEY,
    street_address VARCHAR(255) NOT NULL,
    state VARCHAR(50) NOT NULL,
    zip VARCHAR(10) NOT NULL,
    sqft FLOAT NOT NULL,
    beds INT NOT NULL,
    baths INT NOT NULL,
    list_price FLOAT NOT NULL
);

-- Alter the existing user_home table
ALTER TABLE user_home
    ADD COLUMN id INT AUTO_INCREMENT PRIMARY KEY,
    ADD COLUMN user_id INT NOT NULL,
    ADD COLUMN home_id INT NOT NULL,

-- Insert data into the user table
INSERT INTO user (username, email)
SELECT DISTINCT username, email
FROM user_home;

-- Insert data into the home table
INSERT INTO home (street_address, state, zip, sqft, beds, baths, list_price)
SELECT DISTINCT street_address, state, zip, sqft, beds, baths, list_price
FROM user_home;

-- Update the user_id and home_id columns in the user_home table
UPDATE user_home
SET user_id = (SELECT id FROM user WHERE user_home.username = user.username),
    home_id = (SELECT id FROM home WHERE user_home.street_address = home.street_address);

-- Alter the existing user_home table
ALTER TABLE user_home
    ADD FOREIGN KEY (user_id) REFERENCES user(id),
    ADD FOREIGN KEY (home_id) REFERENCES home(id);
    DROP COLUMN username,
    DROP COLUMN email,
    DROP COLUMN street_address,
    DROP COLUMN state,
    DROP COLUMN zip,
    DROP COLUMN sqft,
    DROP COLUMN beds,
    DROP COLUMN baths,
    DROP COLUMN list_price;