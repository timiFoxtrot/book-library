import { optional, z } from "zod";

export const addBookValidator = z.object({
  body: z.object({
    Title: z.string({
      required_error: "Book title is required",
      invalid_type_error: "Title must be a string"
    }),
    Author: z.string({
      required_error: "Author is required",
      invalid_type_error: "Author must be a string"
    }),
    datePublished: z.string({
      required_error: "datePublished is required",
      invalid_type_error: "datePublished must be a string"
    }).optional(),
    Description: z.string({
      required_error: "Description is required",
      invalid_type_error: "Description must be a string"
    }),
    pageCount: z.string({
      required_error: "pageCount is required",
      invalid_type_error: "pageCount must be a string"
    }).optional(),
    Genre: z.string({
      required_error: "Genre is required",
      invalid_type_error: "Genre must be a string"
    }),
   
    Publisher: z.string({
      required_error: "Publisher is required",
      invalid_type_error: "Publisher must be a string"
    }),

  })
})

export const updateBookValidator = z.object({
  body: z.object({
    Title: z.string().optional(),
    Author: z.string().optional(),
    datePublished: z.string().optional(),
    Description: z.string().optional(),
    pageCount: z.number().optional(),
    Genre: z.string().optional(),
    Publisher: z.string().optional(),
  })
})

export const createUser = z.object({
  body: z.object({
    userName: z.string({
      required_error: "Username required",
      invalid_type_error: "Username must be a string"
    }),
    email: z.string({
      required_error: "email required",
      invalid_type_error: "email must be a string"
    }).email("Not a valid email"),
    password: z.string({
      required_error: "Password required",
      invalid_type_error: "Password must be a string"
    }).min(5, "Password too short - should be 6 chars minimum"),
  })
})

export const loginUser = z.object({
  body: z.object({
    email: z.string({
      required_error: "email required",
      invalid_type_error: "email must be a string"
    }).email("Not a valid email"),
    password: z.string({
      required_error: "Password required",
      invalid_type_error: "Password must be a string"
    }).min(5, "Password too short - should be 6 chars minimum"),
  })
})