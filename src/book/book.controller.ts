import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './schema/book.schema';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('book')
export class BookController {
  constructor(private bookService: BookService) {}

  @Get() // GET /book
  async findAllBook(): Promise<Book[]> {
    return this.bookService.findAllBookFromDB();
  }

  @Get(':id')
  async findBookById(@Param('id') id: string): Promise<Book> {
    return this.bookService.findBookByIdFromDb(id);
  }

  @Post()
  async createBook(@Body() book: CreateBookDto): Promise<Book> {
    return this.bookService.createBookIntoDB(book);
  }

  @Patch(':id')
  async updateBook(
    @Param('id') id: string,
    @Body() payload: UpdateBookDto,
  ): Promise<Book> {
    return this.bookService.updateBookFromDb(id, payload);
  }

  @Delete(':id')
  async deleteBook(@Param('id') id: string): Promise<Book> {
    return this.bookService.deleteBookFromDb(id);
  }
}
