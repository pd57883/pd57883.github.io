const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res, next) => {
    db.all('SELECT * FROM book', [], (err, rows) => {
        if (err) return next(err);
        res.render('book/index', { books: rows });
    });
});

router.get('/create', (req, res) => {
    res.render('book/create', { book: {} });
});

router.post('/create', (req, res, next) => {
    const { title, author, isbn, publication_year } = req.body;
    db.run(
        'INSERT INTO book (title, author, isbn, publication_year) VALUES (?, ?, ?, ?)',
        [title, author, isbn, publication_year || null],
        function (err) {
            if (err) return next(err);
            res.redirect('/book');
        }
    );
});

router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    db.get('SELECT * FROM book WHERE id = ?', [id], (err, row) => {
        if (err) return next(err);
        if (!row) return res.status(404).send('Not found');
        res.render('book/show', { book: row });
    });
});

router.get('/:id/edit', (req, res, next) => {
    const id = req.params.id;
    db.get('SELECT * FROM book WHERE id = ?', [id], (err, row) => {
        if (err) return next(err);
        if (!row) return res.status(404).send('Not found');
        res.render('book/edit', { book: row });
    });
});

router.post('/:id/edit', (req, res, next) => {
    const id = req.params.id;
    const { title, author, isbn, publication_year } = req.body;
    db.run(
        'UPDATE book SET title = ?, author = ?, isbn = ?, publication_year = ? WHERE id = ?',
        [title, author, isbn, publication_year || null, id],
        function (err) {
            if (err) return next(err);
            res.redirect('/book');
        }
    );
});

router.post('/:id/delete', (req, res, next) => {
    const id = req.params.id;
    db.run('DELETE FROM book WHERE id = ?', [id], function (err) {
        if (err) return next(err);
        res.redirect('/book');
    });
});

module.exports = router;
