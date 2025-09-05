"use client";

import Header from "@/components/Header";
import IngredientForm from "@/components/IngredientForm";
import type { Recipe } from "@/components/RecipeCard";
import RecipeCard from "@/components/RecipeCard";
import { getRecipe } from "@/lib/ai";
import { motion } from "motion/react";
import { useEffect, useRef, useState, useTransition } from "react";
import { toast } from "sonner";

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

  const [pending, startTransition] = useTransition();

  const readyRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (recipe !== null && readyRef.current !== null) {
      readyRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [recipe]);

  async function handleGetRecipe() {
    console.log("Getting recipe with ingredients:", ingredients);
    startTransition(async () => {
      setRecipe(null);
      const result = await getRecipe(ingredients).then((result) => {
        if (result instanceof Error) {
          toast.error("Could not generate recipe.", {
            description: result.message,
          });
        } else {
          toast.success("Recipe Generated Successfully!", {
            description: "Bon Appetit Fellow Chef! 🌟",
          });
          setRecipe(result);
        }
      });
      console.log("Received recipe:", result);
    });
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
            loading={pending}
            readyRef={readyRef}
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
