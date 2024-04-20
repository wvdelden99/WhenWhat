/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./App.{js,jsx,ts,tsx}",
        "./components/**/*.{js,jsx,ts,tsx}",
        "./views/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                "dark": "#212427",
                "gray": "#E5E6ED",
                "gray-dark": "#D9D9D9",
                "primary" : "#FFC700",
                "secondary-light": "#4CCD99",
                "secondary" : "#007F73",
            },
        },
    },
    plugins: [],
}

