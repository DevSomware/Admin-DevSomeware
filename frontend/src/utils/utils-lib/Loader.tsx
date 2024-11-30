"use client";
import { motion } from "framer-motion";
import { useState,useEffect } from "react";
export const Loader = () => {
const [initialValue, setInitialValue] = useState(false);
useEffect(()=>{
setTimeout(()=>{
setInitialValue(true);
},3000)
},[])
  const letters = "DevSomeware".split("");

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.8, delay: 1.5 }}
      className={`fixed inset-0 flex items-center justify-center bg-black ${initialValue?"z-10":"z-50"}`}
    >
      <div className="relative flex flex-col items-center justify-center space-y-6">
        <div className="text-5xl md:text-7xl font-extrabold text-transparent logo">
          {letters.map((letter, index) => (
            <motion.span
              key={index}
              initial={{
                opacity: 0,
                x: index % 2 === 0 ? -30 : 30,
              }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.4,
                delay: index * 0.03,
                ease: "easeOut",
              }}
              className="inline-block shine-text"
            >
              {letter}
            </motion.span>
          ))}
        </div>

        <div className="line-loader">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </motion.div>
  );
};