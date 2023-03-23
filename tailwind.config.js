/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      classes: {
        'button-primary': 'transition ease-in-out duration-200 group relative flex w-full py-3 justify-center rounded-md bg-indigo-600 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
      },
    },
  },
  plugins: [],
};