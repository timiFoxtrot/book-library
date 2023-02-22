"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.createUser = exports.updateBookValidator = exports.addBookValidator = void 0;
const zod_1 = require("zod");
exports.addBookValidator = zod_1.z.object({
    body: zod_1.z.object({
        Title: zod_1.z.string({
            required_error: "Book title is required",
            invalid_type_error: "Title must be a string"
        }),
        Author: zod_1.z.string({
            required_error: "Author is required",
            invalid_type_error: "Author must be a string"
        }),
        datePublished: zod_1.z.string({
            required_error: "datePublished is required",
            invalid_type_error: "datePublished must be a string"
        }).optional(),
        Description: zod_1.z.string({
            required_error: "Description is required",
            invalid_type_error: "Description must be a string"
        }),
        pageCount: zod_1.z.string({
            required_error: "pageCount is required",
            invalid_type_error: "pageCount must be a string"
        }).optional(),
        Genre: zod_1.z.string({
            required_error: "Genre is required",
            invalid_type_error: "Genre must be a string"
        }),
        Publisher: zod_1.z.string({
            required_error: "Publisher is required",
            invalid_type_error: "Publisher must be a string"
        }),
    })
});
exports.updateBookValidator = zod_1.z.object({
    body: zod_1.z.object({
        Title: zod_1.z.string().optional(),
        Author: zod_1.z.string().optional(),
        datePublished: zod_1.z.string().optional(),
        Description: zod_1.z.string().optional(),
        pageCount: zod_1.z.number().optional(),
        Genre: zod_1.z.string().optional(),
        Publisher: zod_1.z.string().optional(),
    })
});
exports.createUser = zod_1.z.object({
    body: zod_1.z.object({
        userName: zod_1.z.string({
            required_error: "Username required",
            invalid_type_error: "Username must be a string"
        }),
        email: zod_1.z.string({
            required_error: "email required",
            invalid_type_error: "email must be a string"
        }).email("Not a valid email"),
        password: zod_1.z.string({
            required_error: "Password required",
            invalid_type_error: "Password must be a string"
        }).min(5, "Password too short - should be 6 chars minimum"),
    })
});
exports.loginUser = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            required_error: "email required",
            invalid_type_error: "email must be a string"
        }).email("Not a valid email"),
        password: zod_1.z.string({
            required_error: "Password required",
            invalid_type_error: "Password must be a string"
        }).min(5, "Password too short - should be 6 chars minimum"),
    })
});
