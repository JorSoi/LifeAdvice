CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  category_name varchar(50) NOT NULL,
  category_emoji	varchar(4)	4

  );

CREATE TABLE lessons (
  id SERIAL PRIMARY KEY,
  category_id  integer REFERENCES categories(id),
  lesson varchar(250) NOT NULL,
  author varchar(20),
  upvotes integer,
  downvotes integer
  );
  
INSERT INTO categories VALUES (DEFAULT, 'Friendship', '🫂' ), (DEFAULT, 'Mindset', '🧠'), (DEFAULT, 'Love', '💌'), (DEFAULT, 'Business', '💼'), (DEFAULT, 'Sports', '🏅'), (DEFAULT, 'Education', '🎓'), (DEFAULT, 'Other Lessons', '💭');

INSERT INTO lessons VALUES (DEFAULT,	5,	'Healthy food must not always be low-carb! It always depends on what your goals are. If your plan is to get stronger you MUST eat more than you burn.',	'jpel_1997',	0,	0);