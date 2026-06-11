from flask import Flask, render_template, request, redirect, url_for, abort, g
from db import get_db
from models import Book

app = Flask(__name__)


@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()


@app.route('/')
def index():
    return render_template('base.html', title='Custom Framework')


@app.route('/book')
def book_index():
    books = Book.find_all()
    return render_template('book/index.html', books=books)


@app.route('/book/create', methods=['GET', 'POST'])
def book_create():
    if request.method == 'POST':
        title = request.form.get('title')
        author = request.form.get('author')
        isbn = request.form.get('isbn')
        publication_year = request.form.get('publication_year') or None

        book = Book(title=title, author=author, isbn=isbn, publication_year=publication_year)
        book.save()
        return redirect(url_for('book_index'))

    return render_template('book/create.html', book=None)


@app.route('/book/<int:id>')
def book_show(id):
    book = Book.find(id)
    if not book:
        abort(404)
    return render_template('book/show.html', book=book)


@app.route('/book/<int:id>/edit', methods=['GET', 'POST'])
def book_edit(id):
    book = Book.find(id)
    if not book:
        abort(404)

    if request.method == 'POST':
        book.title = request.form.get('title')
        book.author = request.form.get('author')
        book.isbn = request.form.get('isbn')
        book.publication_year = request.form.get('publication_year') or None
        book.save()
        return redirect(url_for('book_index'))

    return render_template('book/edit.html', book=book)


@app.route('/book/<int:id>/delete', methods=['POST'])
def book_delete(id):
    book = Book.find(id)
    if book:
        book.delete()
    return redirect(url_for('book_index'))


if __name__ == '__main__':
    app.run(port=57883, debug=True)
