<?php
/** @var $book ?\App\Model\Book */
?>

<div class="form-group">
    <label for="title">Title</label>
    <input type="text" id="title" name="book[title]" value="<?= $book ? $book->getTitle() : '' ?>">
</div>

<div class="form-group">
    <label for="author">Author</label>
    <input type="text" id="author" name="book[author]" value="<?= $book ? $book->getAuthor() : '' ?>">
</div>

<div class="form-group">
    <label for="isbn">ISBN</label>
    <input type="text" id="isbn" name="book[isbn]" value="<?= $book ? $book->getIsbn() : '' ?>">
</div>

<div class="form-group">
    <label for="publication_year">Publication Year</label>
    <input type="number" id="publication_year" name="book[publication_year]" value="<?= $book ? $book->getPublicationYear() : '' ?>">
</div>

<div class="form-group">
    <label></label>
    <input type="submit" value="Submit">
</div>