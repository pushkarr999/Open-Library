import { HISTORY_TYPE } from "../../utility/constants";

export const createHistoryValidation = {
  type: "object",
  properties: {
    type: {
      type: "number",
      enum: Object.values(HISTORY_TYPE),
      errorMessage: {
        type: "History type must be number",
        enum: "History type must be valid",
      },
    },
    time: {
      type: "number",
      errorMessage: {
        type: "Time must be number",
      },
    },
    book_id: {
      type: "string",
      errorMessage: {
        type: "Book Id must be number",
      },
    },
  },
  required: ["type", "book_id", "time"],
  errorMessage: {
    type: "Input must be JSON",
    properties: {
      type: "History type must be Number",
      book_id: "Book ID must be string",
      time: "Time must be number",
    },
    required: {
      type: "History type is required",
      book_id: "Book ID is required",
      time: "Time is required",
    },
  },
};

export const updateHistoryValidation = {
  type: "object",
  properties: {
    type: {
      type: "number",
      enum: [HISTORY_TYPE.RETURNED],
      errorMessage: {
        type: "History type is number",
        enum: "History type must be returned",
      },
    },
    book_id: {
      type: "string",
      errorMessage: {
        type: "Bood ID must be string",
      },
    },
    id: {
      type: "string",
      errorMessage: {
        type: "ID must be string",
      },
    },
  },
  required: ["type", "book_id", "id"],
  errorMessage: {
    type: "Input must be JSON",
    properties: {
      type: "History type must be number",
      book_id: "Book ID must be string",
      id: "ID must be string",
    },
    required: {
      type: "History type is required",
      book_id: "Book ID is required",
      id: "ID is required",
    },
  },
};

export const getHistoryValidation = {
  type: "object",
  properties: {
    type: {
      type: "number",
      errorMessage: {
        type: "History type must be number",
      },
    },
    users_id: {
      type: "string",
      errorMessage: {
        type: "Users Id must be number",
      },
    },
    book_id: {
      type: "string",
      errorMessage: {
        type: "Book Id must be number",
      },
    },
    limit: {
      type: "number",
      errorMessage: {
        type: "Limit must be number",
      },
    },
    skip: {
      type: "number",
      errorMessage: {
        type: "Skip must be number",
      },
    },
  },
  required: ["limit", "skip"],
  errorMessage: {
    type: "Input must be JSON",
    properties: {
      type: "History type must be Number",
      book_id: "History ID must be string",
      users_id: "Users ID must be string",
    },
    required: {
      limit: "Limit is required",
      skip: "Skip is required",
    },
  },
  additionalProperties: false,
};
