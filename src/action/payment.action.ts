"use server";
import { cookies } from "next/headers";
import { API_URL } from "@/lib/data";

export const getPaymentHistoryAction = async () => {
  try {
    const cookieStore = await cookies();
    const response = await fetch(`${API_URL}/payments/history`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookieStore.get("token")?.value}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch payment history");
    }

    const data = await response.json();

    return {
      success: true,
      data,
    };
  } catch (e) {
    if (e instanceof Error) {
      return {
        success: false,
        error: e.message,
      };
    }
    return {
      success: false,
      error: "An unknown error occurred",
    };
  }
};
