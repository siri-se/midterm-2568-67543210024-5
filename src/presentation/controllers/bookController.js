// src/presentation/controllers/bookController.js
const bookService = require('../../business/services/bookService');

class BookController {
    // TODO: Implement getAllBooks
    async getAllBooks(req, res, next) {
        try {
            const { status } = req.query;
            // เรียก bookService.getAllBooks()
            // ส่ง response กลับ
            const result = await bookService.getAllBooks(status);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }

    // TODO: Implement getBookById
    async getBookById(req, res, next) {
        // ให้นักศึกษาเขียนเอง
        try {
            const { id } = req.params;
            const product = await bookService.getBookById(id);
            res.json(product);
        } catch (error) {
            next(error);
        }
    }

    // TODO: Implement createBook
    async createBook(req, res, next) {
        // ให้นักศึกษาเขียนเอง
        try {
            const book = await bookService.createBook(req.body);
            res.status(201).json(book);
        } catch (error) {
            next(error);
        }
    }

    // TODO: Implement updateBook
    async updateBook(req, res, next) {
        // ให้นักศึกษาเขียนเอง
        try {
            const { id } = req.params;
            const book = await bookService.updateBook(id, req.body);
            res.json(book);
        } catch (error) {
            next(error);
        }
    }

    // TODO: Implement borrowBook
    async borrowBook(req, res, next) {
        // ให้นักศึกษาเขียนเอง
        try {
            const { id } = req.params;
            const book = await bookService.borrowBook(id);
            res.json(book);
        } catch (error) {
            next(error);
        }
    }

    // TODO: Implement returnBook
    async returnBook(req, res, next) {
        // ให้นักศึกษาเขียนเอง
        try {
            const { id } = req.params;
            const book = await bookService.returnBook(id);
            res.json(book);
        } catch (error) {
            next(error);
        }
    }

    // TODO: Implement deleteBook
    async deleteBook(req, res, next) {
        // ให้นักศึกษาเขียนเอง
        try {
            const { id } = req.params;
            await bookService.deleteBook(id);
            res.status(204).end();
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new BookController();