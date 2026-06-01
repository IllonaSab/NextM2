"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type LoginActionState = {
  type: "idle" | "success" | "error";
  message: string;
};

export type RegisterActionState = {
  type: "idle" | "success" | "error";
  message: string;
};

export const login = async (
  _prevState: LoginActionState,
  formData: FormData,
): Promise<LoginActionState> => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return {
      type: "error",
      message: "Merci de renseigner l'email et le mot de passe.",
    };
  }

  try {
    const response = await fetch("http://localhost:1337/api/auth/local", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier: email,
        password: password,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        type: "error",
        message: errorData.error?.message || "Identifiants incorrects.",
      };
    }

    const data = await response.json();
    const token = data.jwt;

    if (token) {
      const cookieStore = await cookies();
      cookieStore.set("token", token, {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
      });
      redirect("/account/dashboard");
    }

    return {
      type: "error",
      message: "Une erreur est survenue. Veuillez réessayer.",
    };
  } catch (error) {
    if (error instanceof Error && error.message === "NEXT_REDIRECT") {
      throw error;
    }
    console.error("Erreur lors de la connexion :", error);
    return {
      type: "error",
      message: "Une erreur est survenue. Veuillez réessayer.",
    };
  }
};

export const logout = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("token");
  redirect("/auth/login");
};

export const register = async (
  _prevState: RegisterActionState,
  formData: FormData,
): Promise<RegisterActionState> => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!email || !password || !confirmPassword) {
    return {
      type: "error",
      message: "Merci de remplir tous les champs.",
    };
  }

  if (password !== confirmPassword) {
    return {
      type: "error",
      message: "Les mots de passe ne correspondent pas.",
    };
  }

  try {
    return {
      type: "success",
      message: "Inscription réussie !",
    };
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error);
    return {
      type: "error",
      message: "Une erreur est survenue. Veuillez réessayer.",
    };
  }
};
