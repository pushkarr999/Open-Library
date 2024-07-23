export const ROLE = {
  ADMIN: 0,
  LIBRARIAN: 1,
  USERS: 2,
};

export const ROLE_REV = {
  0: "Admin",
  1: "Librarian",
  2: "Users",
};

export const BOOK_STATUS = {
  REJECT: 0,
  ACCEPTED: 1,
};

export const TOKEN_TYPE = {
  CREATE_USER: 0,
  REGISTER_USER: 1,
};

export const SALT_ROUNDS = 10;
export const EMAIL_PATTERN =
  "^[a-zA-Z]{1,}[.+_-]{0,1}[a-zA-Z0-9]{1,}@[a-zA-Z]{1,}[.+_-]{1}[a-zA-Z]{2,}[.+_-]{0,1}[a-zA-Z]{0,3}$";
export const PASSWORD_PATTERN =
  "^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$";
export const EXPRIES_IN = "1d";
export const MOBILE_NO_PATTERN = "^[0-9]{10}$";
export const HISTORY_TYPE = {
  BORROWER: 0,
  RETURNED: 1,
};

export const OVERDUE_PRICE = 5;
