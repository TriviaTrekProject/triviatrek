import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";
import svgrPlugin from 'vite-plugin-svgr'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss(),
    svgrPlugin({
      svgrOptions: {
        svgo: true,
        svgoConfig: {
          plugins: [
            // Nettoie les attributs inutiles
            'cleanupAttrs',
            // Supprime les doctypes
            'removeDoctype',
            // Supprime les commentaires XML
            'removeXMLProcInst',
            // Supprime les commentaires
            'removeComments',
            // Supprime les métadonnées
            'removeMetadata',
            // Supprime les titres (important pour l'accessibilité - à utiliser avec précaution)
            'removeTitle',
            // Supprime les descriptions
            'removeDesc',
            // Supprime les définitions inutilisées
            'removeUselessDefs',
            // Supprime les éléments éditeur (Sketch, Illustrator, etc.)
            'removeEditorsNSData',
            // Supprime les éléments vides
            'removeEmptyAttrs',
            'removeHiddenElems',
            'removeEmptyText',
            'removeEmptyContainers',
            // Optimise les IDs
            'cleanupIds',
            // Optimise les valeurs numériques
            {
              name: 'cleanupNumericValues',
              params: {
                floatPrecision: 2
              }
            },
            // Convertit les couleurs
            'convertColors',
            // Optimise les transformations
            'convertTransform',
            // Supprime les attributs inconnus et valeurs par défaut
            'removeUnknownsAndDefaults',
            // Optimise les paths
            'convertPathData',
            // Fusionne les paths
            'mergePaths',
            // Supprime les groupes inutiles
            'collapseGroups',
            // Réorganise les attributs
            'sortAttrs'
          ]
        }
      }
    })
  ],
})