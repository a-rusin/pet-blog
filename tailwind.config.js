import { url } from "inspector";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,tsx,ts}"],
  theme: {
    extend: {
      backgroundImage: {
        "share-icon":
          "url(https://avatars.mds.yandex.net/get-lpc/12602567/7239d4be-9954-4eea-bb09-17409b322db3/orig?width=17&height=18)",
        "searh-icon":
          "url(https://avatars.mds.yandex.net/get-lpc/16904900/e0161e93-147f-4e49-b77c-e9edd457efe6/orig?width=20&height=19)",
      },
      fontFamily: {
        "cabinet-grotesk": ["Cabinet Grotesk", "Times New Roman", "ui-sans-serif", "sans-serif"],
        "cabinet-grotesk-variable": ["Cabinet Grotesk Variable", "Times New Roman", "ui-sans-serif", "sans-serif"],
      },
    },
  },
  plugins: [],
};
