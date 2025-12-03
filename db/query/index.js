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

export async function getPasswordByUser(userId, query) {
  await dbConnect();

  const searchFilter = query
    ? {
        $or: [
          { url: { $regex: query, $options: "i" } },
          { username: { $regex: query, $options: "i" } },
          { category: { $regex: query, $options: "i" } },
          { notes: { $regex: query, $options: "i" } },
        ],
      }
    : {};

  const res = await Password.find({
    userId,
    ...searchFilter,
  }).lean();

  return res;
}
