import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";
import svgrPlugin from 'vite-plugin-svgr'

export default defineConfig({
  plugins: [
    react({
      // Optimisation React
      jsxRuntime: 'automatic',
    }),
    tailwindcss(),
    svgrPlugin({
      svgrOptions: {
        svgo: true,
        svgoConfig: {
          plugins: [
            'cleanupAttrs',
            'removeDoctype',
            'removeXMLProcInst',
            'removeComments',
            'removeMetadata',
            'removeTitle',
            'removeDesc',
            'removeUselessDefs',
            'removeEditorsNSData',
            'removeEmptyAttrs',
            'removeHiddenElems',
            'removeEmptyText',
            'removeEmptyContainers',
            'cleanupIds',
            {
              name: 'cleanupNumericValues',
              params: { floatPrecision: 1 } // Réduit à 1 décimale
            },
            'convertColors',
            'convertTransform',
            'removeUnknownsAndDefaults',
            'convertPathData',
            'mergePaths',
            'collapseGroups',
            'sortAttrs',
            // ✅ Optimisations supplémentaires
            'removeViewBox', // Supprime viewBox si pas nécessaire
            'convertStyleToAttrs', // Convertit les styles en attributs
            'removeUselessStrokeAndFill', // Supprime les strokes/fills inutiles
          ]
        }
      }
    })
  ],

  // ✅ Optimisations de build
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Sépare les backgrounds dans un chunk dédié
          'background': [
            'src/components/common/background/SkyBg.tsx',
            'src/components/common/background/SeaBg.tsx',
            'src/components/common/background/ShoreBg.tsx',
            'src/components/common/background/RockBg.tsx',
            'src/components/common/background/ShipBg.tsx',
            'src/components/common/background/Bird1Bg.tsx',
            'src/components/common/background/Bird2Bg.tsx',
          ],
          'motion': ['motion/react']
        }
      }
    },
    target: 'es2020', // Optimise pour les navigateurs modernes
    minify: 'esbuild',
    terserOptions: {
      compress: {
        drop_console: true, // Supprime les console.log en prod
        drop_debugger: true,
      }
    }
  },

  // ✅ Optimisations de développement
  server: {
    hmr: {
      overlay: false // Désactive l'overlay HMR pour ne pas gêner les tests
    }
  }
})