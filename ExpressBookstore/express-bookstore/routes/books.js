import { Router } from "express";
import { validate } from "jsonschema";
import bookSchemaNew from "../schemas/bookSchemaNew";
import bookSchemaUpdate from "../schemas/bookSchemaUpdate";
import { findAll, findOne, create, update, remove } from "../models/book";

const router = new Router();


/** GET / => {books: [book, ...]}  */

router.get("/", async (req, res, next) => {
  try {
    const books = await findAll(req.query);
    return res.json({ books });
  } catch (err) {
    return next(err);
  }
});

/** GET /[id]  => {book: book} */

router.get("/:id", async (req, res, next) => {
  try {
    const book = await findOne(req.params.id);
    return res.json({ book });
  } catch (err) {
    return next(err);
  }
});

/** POST /   bookData => {book: newBook}  */

router.post("/", async (req, res, next) => {
  try {
    const validation = validate(req.body, bookSchemaNew);
    if (!validation.valid) {
      return next({
        status: 400,
        error: validation.errors.map(e => e.stack)
      });
    }
    const book = await create(req.body);
    return res.status(201).json({book});
  }

  catch (err) {
    return next(err);
  }
});

/** PUT /[isbn]   bookData => {book: updatedBook}  */

router.put("/:isbn", async (req, res, next) => {
  try {
    if ("isbn" in req.body) {
      return next({
        status: 400,
        message: "Not allowed"
      });
    }
    const validation = validate(req.body, bookSchemaUpdate);
    if (!validation.valid) {
      return next({
        status: 400,
        errors: validation.errors.map(e => e.stack)
      });
    }
    const book = await update(req.params.isbn, req.body);
    return res.json({book});
  }

  catch (err) {
    return next(err);
  }
});

/** DELETE /[isbn]   => {message: "Book deleted"} */

router.delete("/:isbn", async (req, res, next) => {
  try {
    await remove(req.params.isbn);
    return res.json({ message: "Book deleted" });
  } catch (err) {
    return next(err);
  }
});

export default router;
