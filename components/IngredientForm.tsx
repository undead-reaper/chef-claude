import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CircleMinus, Loader2, Plus, PlusCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { read } from "fs";

interface IngredientFormProps {
  ingredients: string[];
  handleGetRecipe: () => void;
  setIngredients: React.Dispatch<React.SetStateAction<string[]>>;
  loading: boolean;
  readyRef: React.RefObject<HTMLDivElement | null>;
}

const formSchema = z.object({
  ingredient: z.string().min(1, {
    message: "Ingredient is required.",
  }),
});

const IngredientForm = ({
  ingredients,
  handleGetRecipe,
  setIngredients,
  loading,
  readyRef,
}: IngredientFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ingredient: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIngredients((prev) => [...prev, values.ingredient]);
    form.reset();
  }

  const ingredientsVisible = ingredients.length > 0;
  const ctaVisible = ingredients.length >= 3;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  const ctaVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 300,
      },
    },
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg p-6 border border-amber-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.7 }}
    >
      <motion.h2
        className="text-xl font-bold text-orange-800 mb-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.5 }}
      >
        Add Your Ingredients
      </motion.h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pb-5">
          <motion.div
            className="flex flex-col md:flex-row gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.5 }}
          >
            <FormField
              control={form.control}
              name="ingredient"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      placeholder="e.g. Oregano"
                      className="rounded-lg border-amber-200 focus-visible:ring-orange-400 h-12 text-base px-4 text-black"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-sm font-medium text-red-500 mt-1 ml-1" />
                </FormItem>
              )}
            />
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                type="submit"
                className="h-12 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold shadow-md transition-all duration-200 hover:shadow-lg w-full md:w-auto"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Ingredient
              </Button>
            </motion.div>
          </motion.div>
        </form>
      </Form>

      <AnimatePresence>
        {ingredientsVisible && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.h1
              className="text-orange-800 font-bold text-lg"
              variants={itemVariants}
            >
              Ingredients at Hand
            </motion.h1>
            {ingredients.map((ingredient, index) => (
              <motion.div
                key={index}
                className="flex items-center justify-between bg-amber-50/40 border border-amber-200 rounded-lg p-3 mt-2"
                variants={itemVariants}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <span className="text-orange-800 font-medium text-sm">
                  {ingredient}
                </span>
                <Button
                  variant={"ghost"}
                  size={"icon"}
                  onClick={() =>
                    setIngredients((prev) => prev.filter((_, i) => i !== index))
                  }
                >
                  <CircleMinus className="text-orange-700 size-4" />
                </Button>
              </motion.div>
            ))}

            <AnimatePresence>
              {ctaVisible && (
                <motion.div
                  className="flex flex-col md:flex-row gap-4 justify-between items-center mt-10 p-5 bg-amber-100 border border-amber-200 rounded-lg"
                  variants={ctaVariants}
                  ref={readyRef}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  <div className="flex grow flex-col">
                    <h1 className="font-bold text-orange-800 text-lg">
                      Ready for a recipe?
                    </h1>
                    <p className="text-black text-sm">
                      Generate a recipe from your list of ingredients
                    </p>
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      onClick={handleGetRecipe}
                      disabled={loading}
                      className="h-10 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold shadow-md transition-all duration-200 hover:shadow-lg w-full md:w-auto"
                    >
                      {loading && <Loader2 className="animate-spin" />}
                      {loading ? "Getting Recipe..." : "Get Recipe"}
                    </Button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default IngredientForm;
