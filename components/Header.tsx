import { ChefHat } from "lucide-react";
import React from "react";
import { motion } from "motion/react";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Header = () => {
  return (
    <motion.header
      className="py-6 bg-gradient-to-r from-amber-100 to-orange-100 border-b border-amber-200 shadow-sm"
      variants={itemVariants}
    >
      <div className="container mx-auto px-4 flex justify-center items-center">
        <motion.div
          className="flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChefHat className="h-8 w-8 text-orange-600" />
          <h1 className="text-3xl font-bold text-orange-800 font-serif tracking-wide">
            Chef Claude
          </h1>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header;
