// GSAP optimizado para mejor rendimiento
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Registrar plugins solo una vez
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)

  // Configuración global optimizada para móviles
  gsap.config({
    force3D: true,
    nullTargetWarn: false,
    units: { rotation: "rad" }
  })

  // Configuración optimizada de ScrollTrigger para dispositivos móviles
  ScrollTrigger.config({
    autoRefreshEvents: "visibilitychange,DOMContentLoaded,load,resize",
    ignoreMobileResize: true
  })
}

// Optimizaciones para dispositivos móviles
const isMobile = () => {
  if (typeof window === 'undefined') return false
  return window.innerWidth <= 768
}

// Hook personalizado para GSAP con optimizaciones móviles
export const useOptimizedGSAP = (callback, deps = []) => {
  if (typeof window === 'undefined') return

  const cleanup = () => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill())
  }

  // Ejecutar callback con optimizaciones
  const executeCallback = () => {
    if (isMobile()) {
      // Reducir complejidad en móviles
      gsap.config({ force3D: false })
      ScrollTrigger.config({ ignoreMobileResize: true })
    }

    callback()
  }

  // Cleanup y re-ejecución
  cleanup()
  executeCallback()

  return cleanup
}

// Configuraciones predefinidas para diferentes tipos de animaciones
export const animationConfigs = {
  mobile: {
    duration: 0.3,
    ease: "power2.out",
    force3D: false
  },
  desktop: {
    duration: 0.6,
    ease: "power2.out",
    force3D: true
  },
  scroll: {
    scrub: isMobile() ? 0.8 : 0.4,
    end: isMobile() ? "+=2000" : "+=3500"
  }
}

// Función para crear ScrollTriggers optimizados
export const createOptimizedScrollTrigger = (config) => {
  if (typeof window === 'undefined') return null

  const baseConfig = {
    ...config,
    refreshPriority: isMobile() ? -1 : 0,
    invalidateOnRefresh: true
  }

  if (isMobile()) {
    baseConfig.scrub = Math.max(0.8, baseConfig.scrub || 0.4)
    if (baseConfig.end && typeof baseConfig.end === 'string' && baseConfig.end.includes('+=')) {
      const value = parseInt(baseConfig.end.replace('+=', ''))
      baseConfig.end = `+=${Math.min(value, 2500)}`
    }
  }

  return ScrollTrigger.create(baseConfig)
}

export { gsap, ScrollTrigger }