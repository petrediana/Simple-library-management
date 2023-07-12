# Library Manager Module

The Library class represents a store with book management functionality. It implements the BookStore interface and provides methods for adding books, checking availability, borrowing, and returning books. The library also supports penalty calculation for late returns and provides methods for displaying books in various categories.

## Usage

You can use the Library class in your JavaScript or TypeScript project by following these steps:

1. Import the necessary classes and interfaces:

   ```javascript
   import { Library } from 'library';
   ```
   
   ```javascript
   import {ConsoleLoggerProvider, DefaultDateTimeProvider, DefaultPenaltyCalculator} from 'provider';
   ```


2. Create an instance of the Library class:

   ```javascript
   const library = new Library(
     bookStore,                            // Your custom book store implementation
     new DefaultDateTimeProvider(),        // Optional: DateTimeProvider implementation for time-related operations
     new ConsoleLoggerProvider(),          // Optional: LoggerProvider implementation for logging
     new DefaultPenaltyCalculator()        // Optional: PenaltyProvider implementation for penalty calculation
   );
   ```

3. Use the Library methods to manage books:

   ```javascript
   const book = new Book("book", "isbn...", 69.42);
   // Add a book to the library
   library.add(book);

   // Check if a book is available
   const isAvailable = library.isAvailable(book);

   // Borrow a book
   const borrowedBook = library.borrow(book);

   // Return a book
   library.returnBack(book);

   // Get all books in the library
   const allBooks = library.getAll();

   // Get available books in the library
   const availableBooks = library.getAvailable();
   ```

## Customization

The Library class allows for customization through the following optional parameters:

- `dateTimeProvider`: A DateTimeProvider implementation for time-related operations. By default, it uses the DefaultDateTimeProvider.
- `loggerProvider`: A LoggerProvider implementation for logging. By default, it uses the ConsoleLoggerProvider.
- `penaltyProvider`: A PenaltyProvider implementation for penalty calculation. By default, it uses the DefaultPenaltyCalculator.

You can create your own implementations of these interfaces and pass them to the Library constructor to customize the behavior.

## Testing

To run the tests for the Library class, use the following command:

```shell
npm test
```

The tests cover various scenarios and ensure the correct functioning of the module.