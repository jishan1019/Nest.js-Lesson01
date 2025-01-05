import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schema/book.schema';
import mongoose from 'mongoose';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name)
    private bookModel: mongoose.Model<Book>,
  ) {}

  async findAllBookFromDB(): Promise<Book[]> {
    const book = await this.bookModel.find();

    return book;
  }

  async createBookIntoDB(book: Book): Promise<Book> {
    const result = await this.bookModel.create(book);
    return result;
  }

  async findBookByIdFromDb(id: string): Promise<Book> {
    const result = await this.bookModel.findById(id);

    if (!result) {
      throw new NotFoundException('Book not found');
    }

    return result;
  }

  async updateBookFromDb(id: string, payload: Book): Promise<Book> {
    const result = await this.bookModel.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });

    return result;
  }

  async deleteBookFromDb(id: string): Promise<Book> {
    const result = await this.bookModel.findByIdAndDelete(id);

    if (!result) {
      throw new NotFoundException('Book not found');
    }

    return result;
  }
}
