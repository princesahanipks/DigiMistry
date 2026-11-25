import typography from "@tailwindcss/typography";

export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: { fontFamily: { Jost: ["Jost", "sans-serif"] } },
  },
  plugins: [typography],
}