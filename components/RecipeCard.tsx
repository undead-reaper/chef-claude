import { BookOpen, Clock, Users } from "lucide-react";
import React from "react";
import { motion } from "motion/react";

export interface Recipe {
  title: string;
  subtitle: string;
  ingredients: string[];
  instructions: string[];
  notes?: string[];
  preptime?: string;
  servings: number;
}

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg border border-amber-100 overflow-hidden max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <motion.div
        className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <motion.h2
          className="text-2xl md:text-3xl font-bold font-serif tracking-wide"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {recipe.title}
        </motion.h2>
        {recipe.subtitle && (
          <motion.p
            className="mt-2 opacity-90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {recipe.subtitle}
          </motion.p>
        )}

        <motion.div
          className="flex flex-wrap gap-4 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            <span className="text-sm">{recipe.preptime}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="h-4 w-4" />
            <span className="text-sm">{recipe.servings} servings</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Content */}
      <div className="p-6">
        {/* Ingredients */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <h3 className="text-lg font-medium text-orange-800 flex items-center gap-2 mb-3">
            <span className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-orange-600">
              1
            </span>
            Ingredients
          </h3>
          <ul className="space-y-2 pl-4">
            {recipe.ingredients.map((ingredient, index) => (
              <motion.li
                key={index}
                className="flex items-start gap-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1, duration: 0.3 }}
              >
                <span className="text-orange-500 mt-1">•</span>
                <span>{ingredient}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Instructions */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <h3 className="text-lg font-medium text-orange-800 flex items-center gap-2 mb-3">
            <span className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-orange-600">
              2
            </span>
            Instructions
          </h3>
          <ol className="space-y-4 pl-4 pt-5">
            {recipe.instructions.map((instruction, index) => (
              <motion.li
                key={index}
                className="flex items-start gap-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1, duration: 0.3 }}
              >
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center text-orange-600 text-sm font-medium">
                  {index + 1}
                </span>
                <span className="mt-0.5">{instruction}</span>
              </motion.li>
            ))}
          </ol>
        </motion.div>

        {/* Notes */}
        {recipe.notes && recipe.notes.length > 0 && (
          <motion.div
            className="bg-amber-50 rounded-lg p-4 border border-amber-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <h3 className="text-lg font-medium text-orange-800 flex items-center gap-2 mb-2">
              <BookOpen className="h-4 w-4 text-orange-600" />
              Notes
            </h3>
            <ul className="space-y-2">
              {recipe.notes.map((note, index) => (
                <motion.li
                  key={index}
                  className="flex items-start gap-2 text-sm"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.1 + index * 0.1, duration: 0.3 }}
                >
                  <span className="text-orange-500 mt-0.5">•</span>
                  <span>{note}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default RecipeCard;
