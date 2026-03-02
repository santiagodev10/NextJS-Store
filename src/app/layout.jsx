import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";

export const metadata = {
  title: "Next JS store",
  description: "My first Next JS app",
};

//Todo lo que agreguemos en el root layout va a aparecer en TODAS las páginas de la aplicación
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
