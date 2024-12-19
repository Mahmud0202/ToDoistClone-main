"use server";
import { eq, not } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db/index";
import { todo } from "@/db/schema";

export const getData = async (UserEmail) => {
    if (!userEmail) {
      throw new Error("User email is required to fetch tasks.");
    }
  
    const data = await db
      .select()
      .from(todo)
      .where("email", UserEmail); // Assuming "email" is the field in your "todo" table for user identification
  
    return data;
  };
  

export const addTodo = async (id: number, text: string,email:string) => {
  await db.insert(todo).values({
    id: id,
    text: text,
    email:email,
  });
};

export const deleteTodo = async (id: number) => {
  await db.delete(todo).where(eq(todo.id, id));

  revalidatePath("/dashboard");
};

export const toggleTodo = async (id: number) => {
  await db
    .update(todo)
    .set({
      completed: not(todo.completed),
    })
    .where(eq(todo.id, id));

  revalidatePath("/dashboard");
};

export const editTodo = async (id: number, text: string
) => {
  await db
    .update(todo)
    .set({
      text: text,

    })
    .where(eq(todo.id, id));

  revalidatePath("/dashboard");
};