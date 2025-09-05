"use server";

import { Recipe } from "@/components/RecipeCard";
import { serverEnv } from "@/env/env.server";
import { ApiError, GoogleGenAI } from "@google/genai";

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in raw json format with the following fields: title, subtitle, ingredients, instructions, notes, preptime and servings. ingredients, instructions and notes should be arrays. servings should be a number. Make sure to include all of these fields in your response. Don't add any markdown formatting and don't add any extra text. Just return the json object.
`;

const gemini = new GoogleGenAI({
  apiKey: serverEnv.GEMINI_API_KEY,
});

export async function getRecipe(
  ingredients: string[]
): Promise<Recipe | Error> {
  const ingredientString = ingredients.join(", ");
  try {
    const response = await gemini.models.generateContent({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: SYSTEM_PROMPT,
      },
      contents: `I have the following ingredients: ${ingredientString}. Please give me a recipe you'd recommend I make!`,
    });
    if (response.text !== undefined) {
      return JSON.parse(response.text) as Recipe;
    } else {
      return Error("No response from API");
    }
  } catch (error) {
    if (error instanceof ApiError) {
      try {
        const parsedError = JSON.parse(error.message);
        const apiMessage = parsedError.error.message;

        if (apiMessage) {
          return new Error(apiMessage);
        } else {
          return new Error("Could not parse API error message.");
        }
      } catch {
        return new Error("API response was not valid JSON.");
      }
    } else {
      return Error("An unknown error occurred.");
    }
  }
}
