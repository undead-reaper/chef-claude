"use client";

import { useState } from "react";
import Header from "@/components/Header";
import { getRecipe } from "@/lib/ai";
import { motion } from "motion/react";
import IngredientForm from "@/components/IngredientForm";
import RecipeCard from "@/components/RecipeCard";
import type { Recipe } from "@/components/RecipeCard";
import { set } from "zod";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.2,
      duration: 0.5,
    },
  },
};

export default function Home() {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleGetRecipe() {
    console.log("Getting recipe with ingredients:", ingredients);
    setLoading(true);
    const result = await getRecipe(ingredients);
    console.log("Received recipe:", result);

    // Check if result is a string (JSON) and convert it to Recipe object
    if (typeof result === "string") {
      try {
        const parsedRecipe = JSON.parse(result) as Recipe;
        setRecipe(parsedRecipe);
      } catch (error) {
        console.error("Failed to parse recipe JSON:", error);
        setRecipe(null);
      }
    } else {
      // If it's already an object, use it directly
      setRecipe(result);
    }
    setLoading(false);
  }
  return (
    <motion.div
      className="min-h-screen flex flex-col bg-amber-50"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Header />

      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <IngredientForm
            ingredients={ingredients}
            setIngredients={setIngredients}
            handleGetRecipe={handleGetRecipe}
            loading={loading}
          />
        </div>

        {recipe != null && (
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h2
              className="text-xl font-bold text-orange-800 mb-4 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Generated Recipe
            </motion.h2>
            <RecipeCard recipe={recipe} />
          </motion.div>
        )}
      </main>
    </motion.div>
  );
}
