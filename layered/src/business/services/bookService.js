// src/business/services/bookService.js
const bookRepository = require('../../data/repositories/bookRepository');
const bookValidator = require('../validators/bookValidator');

class BookService {
    // TODO: Implement getAllBooks
    async getAllBooks(status = null) {
        // 1. ถ้ามี status ให้ validate
        // 2. เรียก bookRepository.findAll(status)
        // 3. คำนวณสถิติ (available, borrowed, total)
        // 4. return { books, statistics }
        if (status) {
            if (!['available', 'borrowed'].includes(status)) {
                throw new Error('Invalid status');
            }
        }

        const books = await bookRepository.findAll(status);

        const available = books.filter(b => b.status === 'available').length;
        const borrowed = books.filter(b => b.status === 'borrowed').length;

        return {
            books,
            statistics: {
                available,
                borrowed,
                total: books.length
            }
        };
    }

    // TODO: Implement getBookById
    async getBookById(id) {
        // 1. Validate ID
        // 2. เรียก repository
        // 3. ถ้าไม่เจอ throw NotFoundError
        // 4. return book
        const validId = bookValidator.validateId(id);

        const book = await bookRepository.findById(validId);
        if (!book) {
            throw new Error('Book not found');
        }

        return book;
    }

    // TODO: Implement createBook
    async createBook(bookData) {
        // 1. Validate book data
        // 2. Validate ISBN format
        // 3. เรียก repository.create()
        // 4. return created book
        bookValidator.validateBookData(bookData);
        bookValidator.validateISBN(bookData.isbn);

        try {
            return await bookRepository.create(bookData);
        } catch (err) {
            if (err.message.includes('UNIQUE')) {
                throw new Error('ISBN already exists');
            }
            throw err;
        }
    }

    // TODO: Implement updateBook
    async updateBook(id, bookData) {
        // ให้นักศึกษาเขียนเอง
        const validId = bookValidator.validateId(id);
        bookValidator.validateBookData(bookData);
        bookValidator.validateISBN(bookData.isbn);

        const existing = await bookRepository.findById(validId);
        if (!existing) {
            throw new Error('Book not found');
        }

        try {
            return await bookRepository.update(validId, bookData);
        } catch (err) {
            if (err.message.includes('UNIQUE')) {
                throw new Error('ISBN already exists');
            }
            throw err;
        }
    }

    // TODO: Implement borrowBook
    async borrowBook(id) {
        // 1. ดึงหนังสือจาก repository
        // 2. ตรวจสอบว่า status = 'available' หรือไม่
        // 3. ถ้า borrowed อยู่แล้ว throw error
        // 4. เรียก repository.updateStatus(id, 'borrowed')
        // 5. return updated book
        const validId = bookValidator.validateId(id);
        const book = await bookRepository.findById(validId);

        if (!book) {
            throw new Error('Book not found');
        }

        if (book.status === 'borrowed') {
            throw new Error('Book is already borrowed');
        }

        return await bookRepository.updateStatus(validId, 'borrowed');
    }

    // TODO: Implement returnBook
    async returnBook(id) {
        // ให้นักศึกษาเขียนเอง (คล้ายกับ borrowBook)
        const validId = bookValidator.validateId(id);
        const book = await bookRepository.findById(validId);

        if (!book) {
            throw new Error('Book not found');
        }

        if (book.status !== 'borrowed') {
            throw new Error('Book is not borrowed');
        }

        return await bookRepository.updateStatus(validId, 'available');
    }

    // TODO: Implement deleteBook
    async deleteBook(id) {
        // 1. ดึงหนังสือจาก repository
        // 2. ตรวจสอบว่า status ไม่ใช่ 'borrowed'
        // 3. ถ้า borrowed ห้ามลบ throw error
        // 4. เรียก repository.delete(id)
        const validId = bookValidator.validateId(id);
        const book = await bookRepository.findById(validId);

        if (!book) {
            throw new Error('Book not found');
        }

        if (book.status === 'borrowed') {
            throw new Error('Cannot delete borrowed book');
        }

        return await bookRepository.delete(validId);
    }
}

module.exports = new BookService();