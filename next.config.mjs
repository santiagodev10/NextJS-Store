import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  // reactCompiler: true,
  sassOptions: {
    includePaths: [path.join(process.cwd(), 'src', 'scss')],
    // Se usa ruta absoluta para evitar errores de ruteo con Turbopack
    prependData: `@use "${path.join(process.cwd(), 'src', 'scss', '_variables.scss')}" as *;`,
  }
};

export default nextConfig;