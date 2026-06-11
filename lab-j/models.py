from db import get_db

class Book:
    def __init__(self, id=None, title=None, author=None, isbn=None, publication_year=None):
        self.id = id
        self.title = title
        self.author = author
        self.isbn = isbn
        self.publication_year = publication_year

    @staticmethod
    def find_all():
        db = get_db()
        cursor = db.execute('SELECT * FROM book')
        return [Book(**row) for row in cursor.fetchall()]

    @staticmethod
    def find(book_id):
        db = get_db()
        cursor = db.execute('SELECT * FROM book WHERE id = ?', (book_id,))
        row = cursor.fetchone()
        if row:
            return Book(**row)
        return None

    def save(self):
        db = get_db()
        if self.id is None:
            cursor = db.execute(
                'INSERT INTO book (title, author, isbn, publication_year) VALUES (?, ?, ?, ?)',
                (self.title, self.author, self.isbn, self.publication_year)
            )
            self.id = cursor.lastrowid
        else:
            db.execute(
                'UPDATE book SET title = ?, author = ?, isbn = ?, publication_year = ? WHERE id = ?',
                (self.title, self.author, self.isbn, self.publication_year, self.id)
            )
        db.commit()

    def delete(self):
        db = get_db()
        db.execute('DELETE FROM book WHERE id = ?', (self.id,))
        db.commit()
        self.id = None
