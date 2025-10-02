/**
 * Utilidad para configuración optimizada de imágenes
 */

export const imageConfig = {
  // Calidades recomendadas para diferentes tipos de imágenes
  quality: {
    thumbnail: 60,
    standard: 75,
    highQuality: 85,
  },

  // Tamaños comunes para responsive images
  sizes: {
    mobile: '(max-width: 640px) 100vw',
    tablet: '(max-width: 1024px) 80vw',
    desktop: '(max-width: 1920px) 60vw',
    full: '100vw',
  },
}

/**
 * Genera el string de sizes para Next.js Image basado en el tipo de imagen
 */
export function getImageSizes(type: 'hero' | 'card' | 'thumbnail' | 'full'): string {
  const sizeMap = {
    hero: '100vw',
    card: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
    thumbnail: '(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw',
    full: '100vw',
  }

  return sizeMap[type]
}

/**
 * Obtiene la calidad óptima basada en el tipo de imagen
 */
export function getImageQuality(type: 'thumbnail' | 'standard' | 'highQuality'): number {
  return imageConfig.quality[type]
}
