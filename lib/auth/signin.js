"use server";
import { signIn } from "@/auth";
import dbConnect from "@/db/dbconnect";


export async function credentialLogin({ email, password }) {

  await dbConnect();
  try {
    const response = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    return {message: "Log In Success", ok: true };
  } catch (error) {
    console.error("Login Error:", error);
    return { success: false, message: error.message };
  }
}