/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    // extend: {
    //   animation: {
    //     "custom-bounce": "bouncy 1.2s infinite ease-in-out",
    //   },
    //   keyframes: {
    //     bouncy: {
    //       "0%, 100%": { transform: "translateY(0)" },
    //       "20%": { transform: "translateY(-20px)" },
    //       "40%": { transform: "translateY(0)" },
    //       "60%": { transform: "translateY(-12px)" },
    //       "80%": { transform: "translateY(0)" },
    //     },
    //   },
    // },
    extend: {
      animation: {
        "custom-bounce": "bouncy 1.2s infinite ease-in-out",
      },
      keyframes: {
        bouncy: {
          "0%, 100%": { transform: "translateY(0)" },
          "20%": { transform: "translateY(-22px)" },
          "40%": { transform: "translateY(0)" },
          "60%": { transform: "translateY(-14px)" },
          "80%": { transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
