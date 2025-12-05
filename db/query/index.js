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


export async function getPasswordStats(userId) {
  await dbConnect();

  // Fetch all passwords for this user, sorted by newest first
  const items = await Password.find({ userId })
    .sort({ createdAt: -1 })
    .lean();

  const totalSaved = items.length;

  // If user has no saved passwords
  if (totalSaved === 0) {
    return {
      totalSaved,
      lastSavedAgo: "No data",
    };
  }

  const lastSaved = items[0].createdAt;
  const now = Date.now();

  const diffMs = now - lastSaved;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  // Format human readable time
  let lastSavedAgo;

  if (diffSec < 60) lastSavedAgo = `${diffSec} seconds ago`;
  else if (diffMin < 60) lastSavedAgo = `${diffMin} minutes ago`;
  else if (diffHour < 24) lastSavedAgo = `${diffHour} hours ago`;
  else lastSavedAgo = `${diffDay} days ago`;

  return {
    totalSaved,
    lastSavedAgo,
  };
}
