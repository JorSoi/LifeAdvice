CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  category_name varchar(50) NOT NULL
  );

CREATE TABLE lessons (
  id SERIAL PRIMARY KEY,
  category_id  integer REFERENCES categories(id),
  lesson varchar(250) NOT NULL,
  lesson_desc varchar(700),
  author_name varchar(50)
  );
  
   INSERT INTO categories
  VALUES (1, 'Friendship', '🫂' ), (2, 'Mental Health', '🧠'), (3, 'Love', '💌'), (4, 'Business', '💼'), (5, 'Sports', '🏅'), (6, 'Education', '🎓');