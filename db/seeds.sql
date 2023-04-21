INSERT INTO departments (name)
VALUES ("corporate"),
        ("management"),
        ("front"),
        ("back");

INSERT INTO roles (title, salary, department_id)
VALUES ("CEO", 999999, 001),
        ("General Manager", 56830, 002),
        ("Front Manager", 21540, 002),
        ("Back Manager", 22650, 002),
        ("Host", 10500, 003),
        ("Runner", 12500, 003),
        ("Waiter", 15450, 003),
        ("Bartender", 18340, 003),
        ("Prep",  12800, 004),
        ("Line Cook",  16820, 004),
        ("Salad Bar",  15490, 004);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Morgan", "Carlson", 001, null),
("Emmanuel", "Clark", 002, 001),
("Alisa", "Francis", 003, 002),
("Patience", "Landry", 004, 002),
("Cannon", "Chambers", 005, 003),
("Aydin", "Hodges", 005, 003),
("Aileen", "Bolton", 006, 003),
("Jakobe", "Carpenter", 007, 003),
("Michaela", "Beard", 007, 003),
("Abigail", "Ford", 007, 003),
("Alexis", "Erickson", 007, 003),
("Ronnie", "Miller", 008, 003),
("Jon", "Howe", 008, 003),
("Rex", "Bell", 009, 004),
("Lance", "Rollins", 009, 004),
("Anaya", "Larsen", 009, 004),
("Aisha", "Cook", 010, 004),
("Braelyn", "Wilkins", 010, 004),
("Hassan", "Leonard", 011, 004),
("Martha", "Gross", 011, 004);