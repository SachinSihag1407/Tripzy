import { User } from "../models/user.model.js";

export const createUser = async ({ firstName, lastName, email, password }) => {
    if (!firstName || !email || !password) {
        console.log("All fields are required");
    }

    // now create user

    const user = User.create({
        fullName: {
            firstName,
            lastName
        },
        email,
        password
    })

    return user;
}
