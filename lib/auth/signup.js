import bcrypt from "bcryptjs";
import User from "@/models/usermodel";
import dbConnect from "@/db/dbconnect";


export async function signup({ name, email, password }) {
  try {
    await dbConnect();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return { success: false, message: "User already exists" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return { success: true, user: newUser };
  } catch (error) {
    console.error("Signup Error:", error);
    return { success: false, message: error.message };
  }
}