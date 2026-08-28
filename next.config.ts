import type { NextConfig } from "next";

// Export estático: obrigatório porque o deploy é no Firebase Hosting clássico
// (só serve arquivos estáticos). Ver docs/ARCHITECTURE.md e docs/STACK.md.
const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
