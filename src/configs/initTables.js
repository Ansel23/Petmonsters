const pool = require("../services/db");

const SQLSTATEMENT = `




DROP TABLE IF EXISTS  User;

DROP TABLE IF EXISTS Task;

DROP TABLE IF EXISTS TaskProgress;

DROP TABLE IF EXISTS Pets;

DROP TABLE IF EXISTS Owner;

DROP TABLE IF EXISTS Gameuser;

DROP TABLE IF EXISTS Quest;

DROP TABLE IF EXISTS Gameuserinfo;

DROP TABLE IF EXISTS Messages;

CREATE TABLE Messages (
  id INT PRIMARY KEY AUTO_INCREMENT,
  message_text TEXT NOT NULL,
  user_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO Messages (message_text, user_id) VALUES
  ("Hello world!", 1),
  ("Yummy!", 2),  
  ("I am the one", 3);


CREATE TABLE User (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username TEXT,
    email TEXT,
    password TEXT
    );
    CREATE TABLE Task (
    task_id INT PRIMARY KEY AUTO_INCREMENT,
    title TEXT,
    description TEXT,
    points INT
    );
    CREATE TABLE TaskProgress (
    progress_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    task_id INT NOT NULL,
    completion_date TIMESTAMP,
    notes TEXT
    );


    CREATE TABLE Pets(
      pet_id INT PRIMARY KEY AUTO_INCREMENT,
      owner_id INT DEFAULT NULL,
      pet_name TEXT,
      type TEXT,
      breed TEXT,
      age INT NOT NULL,
      skills TEXT,
      feed_time TIMESTAMP,
      groom_time TIMESTAMP
      
      );



    CREATE TABLE Gameuser(
      user_id INT PRIMARY KEY AUTO_INCREMENT,
      username TEXT,
      email TEXT,
      password TEXT
      
      );




    CREATE TABLE Quest(
      quest_id INT PRIMARY KEY AUTO_INCREMENT,
      main_quest TEXT,
      main_quest_points INT,
      sub_quest TEXT,
      sub_quest_points INT
      
      
      );

      

      CREATE TABLE Gameuserinfo(
        info_id INT PRIMARY KEY AUTO_INCREMENT,
        owner_id INT NOT NULL,
        pet_id INT DEFAULT NULL,
        pet_happiness INT DEFAULT 0,
        pet_hunger INT DEFAULT 0,
        pet_thirst   INT DEFAULT 0,
        pet_comfort INT DEFAULT 0,
        points INT DEFAULT 0 CHECK (points >= 0)
        
       
        );
        

        
        

    INSERT INTO Task (title, description, points) VALUES
    ('Plant a Tree', 'Plant a tree in your neighbourhood or a designated green area', '50'),
    ('Use Public Transportation', 'Use public transportation or carpool instead of driving alone', '30'),
    ('Reduce Plastic Usage', 'Commit to using reusable bags and containers', '40'),
    ('Energy Conservation', 'Turn off lights and appliances when not in use', '25'),
    ('Composting', 'Start composting kitchen scraps to create natural fertilizer', '35');




    INSERT INTO Pets (pet_name, type, breed, age, skills) VALUES
    ('Max', 'Dog', 'Golden Retriever', '3', 'Fetch, Sit, Shake, Roll Over'),
    ('Luna', 'Cat', 'Siamese', '2', 'Purr, Jump, Play with Feather Toy'),
    ('Charlie', 'Parrot', 'African Grey', '5', 'Talk, Mimic, Whistle'),
    ('Clover', 'Rabbit', 'Holland Lop', '1', 'Hop, Nose Twitch, Nuzzle'),
    ('Peanut', 'Hamster', 'Syrian', '0.5', 'Run on Wheel, Burrow'),
    ('Sheldon', 'Turtle', 'Red-Eared Slider', '2', 'Swim, Bask, Hide in Shell'),
    ('Finley', 'Fish', 'Betta', '1', 'Swim, Flare Fins, Follow Finger'),
    ('Ginger', 'Guinea Pig', 'Abyssinian', '1.5', 'Squeak, Popcorn Jump, Nibble'),
    ('Blaze', 'Horse', 'Thoroughbred', '6', 'Gallop, Jump, Trot, Respond to Commands'),
    ('Sky', 'Bird', 'Budgerigar', '1', 'Chirp, Fly Short Distances, Play with Toys'),
    ('Daisy', 'Dog', 'Dachshund', '4', 'Dig, Alert Bark, Beg, tail wag'),
    ('Simba', 'Cat', 'Persian', '2', 'Groom, Lounge, Play with Yarn'),
    ('Sunny', 'Bird', 'Cockatiel', '1.5', 'Whistle, Crest Up, Mimic'),
    ('Cooper', 'Dog', 'Labrador Retriever', '2', 'Swim, Retrieve, High Energy'),
    ('Thumper', 'Rabbit', 'Flemish Giant', '2', 'Eat hay, Flop');

    INSERT INTO Quest (main_quest, main_quest_points, sub_quest, sub_quest_points) VALUES
    ('Feed pet total of 10 times','40', 'Feed pet 5 times', '20'),
    ('Groom pet total of 10 times','40', 'Groom pet total of 5 times', '20'),
    ('get ownership of 2 or more pets','40', 'get a new pet', '20'),
    ('add your own unique pet', '40', 'claim ownership for that pet','10'),
    ('improve pet_hapiness','10', 'improve pet_thirst', '10'),
    ('improve pet_hunger','10', 'improve pet_comfort','10'),
    ('obtain pets with more than 10 skills(combined)','60','obtain a pet with more than 2 skills', '20' );

    SELECT User.user_id, User.username, User.email, Gameuser.user_id 
    FROM User
    INNER JOIN Gameuser ON User.user_id = Gameuser.user_id;
    `
;

pool.query(SQLSTATEMENT, (error, results, fields) => {
  if (error) {
    console.error("Error creating tables:", error);
  } else {
    console.log("Tables created successfully:", results);
  }
  process.exit();
});