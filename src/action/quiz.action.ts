"use server";

import { API_URL } from "@/lib/data";
import { cookies } from "next/headers";

export async function createQuizAction({
  name,
  retake,
  start_time,
  end_time,
  quiz_type,
  topic,
  start_page,
  end_page,
  upload_ids,
  quiz_difficulty,
}: {
  name: string;
  retake: boolean;
  start_time: string;
  end_time: string;
  quiz_type: string;
  topic: string;
  start_page: number | null;
  end_page: number | null;
  upload_ids: number[];
  quiz_difficulty: string;
}) {
  try {
    const cookieStore = await cookies();

    const response = await fetch(`${API_URL}/exams`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookieStore.get("token")?.value}`,
      },
      body: JSON.stringify({
        name,
        retake,
        start_time,
        end_time,
        quiz_type,
        topic: topic ? topic : null,
        start_page: start_page ? Number(start_page) : null,
        end_page: end_page ? Number(end_page) : null,
        upload_ids,
        quiz_difficulty,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(
        typeof error.detail === "string"
          ? error.detail
          : "Failed to create quiz"
      );
    }

    const data = await response.json();

    return {
      success: true,
      data,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        error: error.message,
      };
    }
    return {
      success: false,
      error: "An unknown error occurred",
    };
  }
}

export async function getQuizzesAction() {
  try {
    const cookieStore = await cookies();
    const response = await fetch(`${API_URL}/exams`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookieStore.get("token")?.value}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch quizzes");
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
}

export async function deleteQuizAction({ id }: { id: number }) {
  try {
    const cookieStore = await cookies();
    const response = await fetch(`${API_URL}/exams/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookieStore.get("token")?.value}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete quiz");
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
}
