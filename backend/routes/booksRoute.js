import express from 'express'
import { Book } from "../models/bookModel.js";

const router = express.Router();

//Route for create new book
router.post('/', async (req,res)=> {
    try {
        const {title} = req.body
        const {author} = req.body
        const {publishyear} = req.body
        if (!title || !author || !publishyear) {
          return  res.status(400).send("please enter all fields");
        }
        const newbook = {
            title : req.body.title,
            author : req.body.author,
            publishyear : req.body.publishyear
        }

        const book  = await Book.create(newbook);
        res.send(book);
    } catch (error) {
        res.send(error);
    }
});

//route to get all books
router.get('/', async (req,res)=> {
    const allBooks = await Book.find({});
    res.send({
        count: allBooks.length,
        data: allBooks
    });
})

//route to get a single book using id
router.get('/:id',async (req,res)=> {
    
    const {id} = req.params
    const book = await Book.findById(id);
    res.send(book);
})

//update a book
router.put('/:id', async (req,res)=> {
    const { id } = req.params
    const book = await Book.findByIdAndUpdate(id,req.body);
    
    if(!book) {
        res.status(400).send("book not found");

    }
    else {
        res.status(200).send("book updated");
    }
    
})

//delete a book
router.delete('/:id',async (req,res)=> {
    
    try {

        const {id} = req.params
        const result = await Book.findByIdAndDelete(id);
        if(!result) {
            res.status(400).send("cant delete | cant find the book");
        }
        else {
            res.status(201).send("book is deleted");
        }

    } catch (error) {
        res.status(400).send(error.message);
    }
    
    
})

export default router;