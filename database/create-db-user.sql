-- Tämä on vain mallia
-- ÄLÄ tätä tuuppaa tätä tiedostoa gittiin, jos täällä on oikeita salasanoja!

CREATE USER 'myusername'@'localhost' IDENTIFIED BY 'mypassword';
GRANT ALL PRIVILEGES ON `wskcats`.* TO 'myusername'@'localhost';
FLUSH PRIVILEGES;
