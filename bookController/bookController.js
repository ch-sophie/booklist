// Import book model
Book = require('../bookModel/bookModel');

// Handle index actions getAll books
// localhost3001/books/
exports.index = function (req, res) {
    Book.get(function (err, books) {
       if (err) {
           res.json({
               status: "error",
               message: err,
           });
       }
       res.json({
           status: "success",
           message: "Books retrieved successfully",
           data: books
       });
    });
};

// Handle create post book actions
exports.new = function (req, res) {
    var book = new Book();
    book.title = req.body.title ? req.body.title : book.title;
    book.author = req.body.author;
    book.genre = req.body.genre;

    // save the book and check for errors
    book.save(function (err) {
       if (err)
           res.json(err);
           console.log("1 book created!");
       res.json({
           message: 'New book created!',
           data: book
       });
    });
};

// Handle view book info
exports.view = function (req, res) {
    Book.findbyId(req.params.book_id, function (err, book) {
       if (err)
           res.send(err);
       res.json({
           message: '1 book found!',
           data: book
       });
    });
};

// Handle update patch book info
exports.update = function (req, res) {
    Book.findById(req.params.book_id, function (err, book) {
       if (err)
           res.send(err);
       book.title = req.body.title ? req.body.title : book.title;
       book.author = req.body.author;
       book.genre = req.body.genre;

       // save the book and check for errors
       book.save(function (err) {
          if (err)
              res.json(err);
              console.log("1 book updated!");
          res.json({
              message: 'Book Info updated!',
              data: book
          });
       });
    });
};

// Handle delete book
exports.delete = function (req, res) {
    Book.deleteOne({
       _id: req.params.book_id
    }, function (err, book) {
        if (err)
            res.send(err);
            console.log("1 book deleted!");
        res.json({
            status: "success",
            message: 'Book deleted'
        });
    });
};