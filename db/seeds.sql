INSERT INTO justask_db.user (username, email, password)

VALUES 
('justask', 'test123@gmail.com', 'password'),
('jorge', 'jorge@jorge.com', 'password1234'),
('daniel', 'daniel@daniel.com' 'password4321');

INSERT INTO justask_db.post (title, user_id)

VALUES 
('test', 1),
('test 2', 2),
('test 3', 3);

INSERT INTO justask_db.comment (comment_text, user_id, post_id)

VALUES
('hi how are you', 1, 1),
('im sleeoy', 2, 2),
('im hungry', 3);