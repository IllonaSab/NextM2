"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

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
      type: "error" as const,
      message: "Merci de renseigner l'email et le mot de passe.",
    };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/local`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ identifier: email, password }),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      return {
        type: "error" as const,
        message: errorData.message || "Erreur lors de la connexion.",
      };
    }

    const data = await response.json();
    const cookieStore = await cookies();
    cookieStore.set("token", data.jwt, { httpOnly: true, path: "/" });
    redirect("/account/dashboard");

    return {
      type: "success" as const,
      message: "Connexion réussie !",
    };
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    return {
      type: "error" as const,
      message: "Une erreur est survenue. Veuillez réessayer.",
    };
  }
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
      type: "error" as const,
      message: "Merci de remplir tous les champs.",
    };
  }

  if (password !== confirmPassword) {
    return {
      type: "error" as const,
      message: "Les mots de passe ne correspondent pas.",
    };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/local/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      return {
        type: "error" as const,
        message: errorData.message || "Erreur lors de l'inscription.",
      };
    }

    const data = await response.json();
    const cookieStore = await cookies();
    cookieStore.set("token", data.jwt, { httpOnly: true, path: "/" });
    redirect("/account/dashboard");

    return {
      type: "success" as const,
      message: "Inscription réussie !",
    };
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error);
    return {
      type: "error" as const,
      message: "Une erreur est survenue. Veuillez réessayer.",
    };
  }
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

// Fonction pour s'inscrire
export const registerUser = async (email: string, password: string) => {
  try {
    const response = await fetch(`${API_URL}/auth/local/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error);
    throw error;
  }
};

// Fonction pour se connecter
export const loginUser = async (email: string, password: string) => {
  try {
    const response = await fetch(`${API_URL}/auth/local`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ identifier: email, password }),
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    throw error;
  }
};
