import bookModel from "../models/bookModel.js";
import { Op } from "sequelize";

export default class BookController {
    //add book
    async addBook(req, res, imageName) {
        const data = await bookModel.create({ ...req.body, image: imageName });
        console.log(data);
        if (data) {
            res.json(data);
        } else {
            res.json({ success: false, message: "Error adding book" });
        }
    }

    //get book
    async getBookById(req, res) {
        const { id } = req.params;
        if (id) {
            const data = await bookModel.findByPk(id);
            if (data) {
                res.json(data);
            } else {
                res.json({ success: false, message: "Invalid book id" });
            }
        } else {
            res.json({ success: false, message: "Book id not provided" });
        }
    }

    //delete book
    async updateBook(req, res) {
        const { id } = req.params;

        if (id) {
            const data = await bookModel.update(req.body, {
                where: {
                    id,
                },
            });

            if (data[0] === 1) {
                res.json({ success: true, message: "Book Updated" });
            } else {
                res.json({ success: true, message: "Couldn't update book!! Invalid Id" });
            }

        } else {
            res.json({ success: false, message: "Book id not provided" });
        }
    }

    //delete book
    async deleteBook(req, res) {
        const { id } = req.params;
        if (id) {
            const data = bookModel.destroy({
                where: {
                    id,
                }
            });
            if (data == 1) {
                res.json({ success: true, message: "Book Deleted" });
            } else {
                res.json({ success: true, message: "Couldn't delete book!! Invalid Id" });
            }

        } else {
            res.json({ success: false, message: "Book id not provided" });
        }
    }

    //search book
    async searchBook(req, res) {
        const { q } = req.query;

        if (q) {
            const data = await bookModel.findAll({
                where: {
                    [Op.or]: {
                        name: {
                            [Op.like]: `%${q}%`,
                        },
                        author: {
                            [Op.like]: `%${q}%`,
                        }
                    }
                }
            });

            console.log(data);
            res.json(data);
        } else {
            res.json({ success: false, message: "Empty query search string" });
        }
    }

    //get all
    async getBooks(req, res) {
        let { limit } = req.query;
        if (!limit) limit = 20;
        const data = await bookModel.findAll({
            limit,
        });

        res.json(data);
    }
}