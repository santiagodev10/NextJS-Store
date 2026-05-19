import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  // reactCompiler: true,
  sassOptions: {
    includePaths: [path.join(process.cwd(), 'src', 'scss')],
    // Se usa ruta absoluta para evitar errores de ruteo con Turbopack
    prependData: `@use "${path.join(process.cwd(), 'src', 'scss', '_variables.scss')}" as *;`,
  },
  images: {
    remotePatterns: [
      //remotePatterns se usa para permitir cargar imágenes desde dominios externos, en este caso, el CDN de Shopify, pero también se puede usar para cargar imágenes desde cualquier dominio externo, como por ejemplo, un servidor de imágenes personalizado o un servicio de almacenamiento en la nube.
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;