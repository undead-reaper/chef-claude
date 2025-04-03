import { createPerplexity } from "@ai-sdk/perplexity";
import { generateText } from "ai";

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in raw json format with the following fields: title, subtitle, ingredients, instructions, notes, preptime and servings. ingredients, instructions and notes should be arrays. servings should be a number. Make sure to include all of these fields in your response. Don't add any markdown formatting and don't add any extra text. Just return the json object.
`

const perplexity = createPerplexity({
    apiKey: process.env.PERPLEXITY_API_KEY,
})

export async function getRecipe(ingredients: string[]) {
    const ingredientString = ingredients.join(", ")

    const query = await generateText({
        model: perplexity("sonar-pro"),
        maxTokens: 1024,
        system: SYSTEM_PROMPT,
        messages: [
            {role: "user", content: `I have the following ingredients: ${ingredientString}. Please give me a recipe you'd recommend I make!`},
        ],
    });
    return query.text;
}