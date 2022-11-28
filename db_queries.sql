CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  category_name varchar(50) NOT NULL,
  category_emoji	varchar(5)
  );

CREATE TABLE lessons (
  id SERIAL PRIMARY KEY,
  category_id  integer REFERENCES categories(id),
  lesson varchar(250) NOT NULL,
  author varchar(20),
  upvotes integer,
  downvotes integer,
  reports integer,
  creation_date timestamp
  );

CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX "IDX_session_expire" ON "session" ("expire");
  
INSERT INTO categories VALUES (DEFAULT, 'Friendship', '🫂' ), (DEFAULT, 'Mindset', '🧠'), (DEFAULT, 'Love', '💌'), (DEFAULT, 'Business', '💼'), (DEFAULT, 'Sports', '🏅'), (DEFAULT, 'Education', '🎓'), (DEFAULT, 'Other Lessons', '💭');

INSERT INTO lessons VALUES (DEFAULT,	5,	'Healthy food must not always be low-carb! It always depends on what your goals are. If your plan is to get stronger you MUST eat more than you burn.',	'jpel_1997',	0,	0);