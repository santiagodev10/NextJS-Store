import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { Roboto } from "next/font/google";
import { env } from "@/config/env";
//No hace falta importar los estilos globales como en css modules, ya que Next JS los aplica automáticamente a toda la aplicación
import "@/scss/global.scss";

export const metadata = {
  metadataBase: new URL(env.SITE_URL),
  title: {
    default: "Next JS Store",
    template: "%s | Next JS Store",
  },
  description: "Tienda online construida con Next.js y Shopify.",
  keywords: ["Next.js", "Shopify", "e-commerce", "tienda online"],
  openGraph: {
    title: "Next JS Store",
    description: "Tienda online construida con Next.js y Shopify.",
    type: "website",
    locale: "es_ES",
    images: [
      {
        url: "/images/description.jpeg",
        width: 1200,
        height: 630,
        alt: "Next JS Store",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Next JS Store",
    description: "Tienda online construida con Next.js y Shopify.",
    images: ["/images/description.jpeg"],
  },
};

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap"
})

//Todo lo que agreguemos en el root layout va a aparecer en TODAS las páginas de la aplicación
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
