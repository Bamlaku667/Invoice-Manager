import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { BadRequestError } from "../errors/index.js";
import { GenerateJWT } from "../utils/tokenUtilities.js";
import Joi from "joi";
import { loginSchema, registerSchema } from "../validation/validationSchemas.js";

const prisma = new PrismaClient();

const userRegister = async (req, res) => {

  const { error } = registerSchema.validate(req.body);
  if (error) {
    throw new BadRequestError(error.details[0].message);
  }

  const { email, password, username } = req.body;

  // Check if the user already exists
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new BadRequestError("User already exists");
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user
  const newUser = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });

  return res
    .status(201)
    .json({ message: "User registered successfully", user: newUser });
};

const userLogin = async (req, res) => {
  

  const { error } = loginSchema.validate(req.body);
  
  if (error) {
    throw new BadRequestError(error.details[0].message);
  }

  const { email, password } = req.body;

  // Find the user by email
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new BadRequestError("Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new BadRequestError("Invalid email or password");
  }

  // token
  const tokenData = { userId: user.id, email: user.email };
  const token = await GenerateJWT(res, tokenData);

  return res.status(200).json({ message: "Login successful", token, user });
};

const userLogout = async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0), //expires right away
  });
  return res.json({ msg: "User LoggedOut" });
};

export { userRegister, userLogin, userLogout };
