import { useToast as vueToast } from 'vue-toastification'
import type { ToastOptions } from 'vue-toastification'

export const useToast = () => {
  const toast = vueToast()

  const showSuccess = (message: string, options?: ToastOptions) => {
    toast.success(message, {
      timeout: 3000,
      position: "top-right",
      ...options
    })
  }

  const showError = (message: string, options?: ToastOptions) => {
    toast.error(message, {
      timeout: 5000,
      position: "top-right",
      ...options
    })
  }

  const showInfo = (message: string, options?: ToastOptions) => {
    toast.info(message, {
      timeout: 3000,
      position: "top-right",
      ...options
    })
  }

  const showWarning = (message: string, options?: ToastOptions) => {
    toast.warning(message, {
      timeout: 4000,
      position: "top-right",
      ...options
    })
  }

  return {
    showSuccess,
    showError,
    showInfo,
    showWarning
  }
}
