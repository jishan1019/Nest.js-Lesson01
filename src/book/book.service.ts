import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schema/book.schema';
import mongoose from 'mongoose';

import { Query } from 'express-serve-static-core';
import QueryBuilder from 'src/builder/QueryBuilder';
import { PaginatedResult } from 'src/interface/pagination.interface';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name)
    private bookModel: mongoose.Model<Book>,
  ) {}

  async findAllBookFromDB(query: Query): Promise<PaginatedResult<Book>> {
    const bookQuery = new QueryBuilder(this.bookModel.find(), query)
      .search(['title', 'author']) // Pass the searchable fields
      .filter()
      .sort()
      .paginate()
      .fields();

    const data = await bookQuery.modelQuery.exec(); // Execute the query
    const meta = await bookQuery.countTotal(); // Get the total count

    return {
      meta,
      data,
    };
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
