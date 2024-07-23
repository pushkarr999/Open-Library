import { Schema } from "ajv";

export const createBookValidation: Schema = {
  type: "object",
  properties: {
    title: {
      type: "string",
      minLength: 3,
      errorMessage: {
        type: "Books title must be string",
        minLength: "Books title must be min 3 characters",
      },
    },
    description: {
      type: "string",
      minLength: 15,
      errorMessage: {
        type: "Books Description must be string",
        minLength: "Books Description must be min 15 characters",
      },
    },
    price: {
      type: "number",
      errorMessage: {
        type: "Books Price must be number",
      },
    },
    genre: {
      type: "number",
      errorMessage: {
        type: "Books genre must be number",
      },
    },
    isbn: {
      type: "string",
      errorMessage: {
        type: "ISBN  must be string",
      },
    },
    author: {
      type: "string",
      errorMessage: {
        type: "Author must be string",
      },
    },
    publisher: {
      type: "string",
      errorMessage: {
        type: "Publisher must be string",
      },
    },
    published_year: {
      type: "number",
      errorMessage: {
        type: "Published year must be number",
      },
    },
    quantity: {
      type: "number",
      errorMessage: {
        type: "Book Quantity must be number",
      },
    },
    image: {
      type: "array",
      errorMessage: {
        type: "Images must be array",
      },
    },
    //Add images
  },
  required: [
    "title",
    "description",
    "price",
    "genre",
    "isbn",
    "author",
    "publisher",
    "published_year",
    "quantity",
    "image",
  ],
  errorMessage: {
    type: "Input must be JSON",
    properties: {
      title: "Books title must be string",
      description: "Books description must be string",
      price: "Books Price must be number",
      genre: "Books Genre must be number",
      isbn: "ISBN must be string",
      author: "Author must be string",
      publisher: "Publisher must be string",
      published_year: "Published year must be string",
      quantity: "Quantity must be number",
      image: "Images must be array",
    },
    required: {
      title: "Books name is required",
      description: "Books description is required",
      price: "Books Price is required",
      genre: "Books Genre is required",
      isbn: "ISBN is required",
      author: "Author is required",
      publisher: "Publisher is required",
      published_year: "Published year is required",
      quantity: "Quantity is required",
      image: "Images are required",
    },
  },
  additionalProperties: false,
};

export const updateBookValidation: Schema = {
  type: "object",
  properties: {
    title: {
      type: "string",
      minLength: 3,
      errorMessage: {
        type: "Books title must be string",
        minLength: "Books Name must be min 3 characters",
      },
    },
    description: {
      type: "string",
      minLength: 15,
      errorMessage: {
        type: "Books Description must be string",
        minLength: "Books Description must be min 15 characters",
      },
    },
    price: {
      type: "number",
      errorMessage: {
        type: "Books Price must be number",
      },
    },
    id: {
      type: "string",
      errorMessage: {
        type: "Books ID must be string",
      },
    },
    //Add images
  },
  required: ["id"],
  errorMessage: {
    type: "Input must be JSON",
    properties: {
      title: "Books title must be string",
      description: "Books description must be string",
      price: "Books Price must be number",
      id: "Books ID must be string",
    },
    required: {
      id: "Books ID is required",
    },
  },
  additionalProperties: false,
};

export const getBookValidation: Schema = {
  type: "object",
  properties: {
    limit: {
      type: "number",
      errorMessage: {
        type: "Books Limit must be number",
      },
    },
    skip: {
      type: "number",
      errorMessage: {
        type: "Books Skip must be number",
      },
    },
    text: {
      type: "number",
      errorMessage: {
        type: "Search text must be string",
      },
    },
  },
  required: ["limit", "skip"],
  errorMessage: {
    type: "Input must be JSON",
    properties: {
      limit: "Limit must be number",
      skip: "Skip must be number",
      text: "Search text must be string",
    },
    required: {
      limit: "Limit is required",
      skip: "Skip is required",
    },
  },
  additionalProperties: false,
};

export const getBookByIdValidation: Schema = {
  type: "object",
  properties: {
    id: {
      type: "string",
      errorMessage: {
        type: "Books ID is required",
      },
    },
  },
  required: ["id"],
  errorMessage: {
    type: "Input must be URL params",
    properties: {
      id: "Books ID must be string",
    },
    required: {
      id: "Books ID is required",
    },
  },
  additionalProperties: false,
};
