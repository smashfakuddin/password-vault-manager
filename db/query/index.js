"use server";

import Password from "@/models/passwordModel";

import { revalidatePath } from "next/cache";
import dbConnect from "../dbconnect";

export async function addPassword(data) {
  await dbConnect();

  try {
    const created = await Password.create(data);
    revalidatePath("/");

    return {
      success: true,
      message: "Password saved successfully!",
    };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

export async function getPasswordByUser(userId) {
  await dbConnect();

  const res = await Password.find({ userId }).lean();
  console.log("response ",userId)
  return res;
}
