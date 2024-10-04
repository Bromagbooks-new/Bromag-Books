/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    fontFamily: {
      'roboto': ['Roboto'],
      'space-grotesk': ["Space Grotesk"],
      'roboto-condensed': ["Roboto Condensed"]
    },
    extend: {
      scale: {
        '-100': '-1'
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        'landing-primary': '#3ABBC6',
        'landing-secondary': '#486072',
        '486072-color': '#486072',
        'color-CB5124': '#CB5124',
        'color-038D47': '#038D47',
        'color-097ACA': '#097ACA',
        'color-1F303C': '#1F303C',
        'color-C1E4FF': '#C1E4FF',
        'color-50758F': '#50758F',
        'color-D6EEFF': '#D6EEFF',
        'color-5C7A8F': '#5C7A8F',
        'color-CCD7DF': '#CCD7DF',
        'color-80A1B9': '#80A1B9',
        'color-89A3B7': '#89A3B7',
        'color-C6C6C6': '#C6C6C6',
        'color-2321A8': '#2321A8',
        'color-FF9068': '#FF9068',
        'color-2B77AD': '#2B77AD',
        'color-13BF2F': '#13BF2F'
      },
      fontWeight: {
        'font-thin': 100,
        'font-extralight': 200,
        'font-light': 300,
        'font-normal': 400,
        'font-medium': 500,
        'font-semibold': 600,
        'font-bold': 700,
        'font-extrabold': 800,
        'font-black': 900,
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      backgroundImage: theme => ({
        'custom-gradient': 'linear-gradient(180deg, #C8E1FF 26.95%, #FFFFFF 100%)',
      }),
    },
  },
  plugins: [require("tailwindcss-animate")],
}