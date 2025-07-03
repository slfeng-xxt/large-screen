import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'

const modules = import.meta.glob('../mock/**/*.js', { eager: true })

const mockModules = []
Object.keys(modules).forEach((key) => {
  if (modules[key].default) {
    mockModules.push(...modules[key].default)
  }
})

export function setupProdMockServer() {
  createProdMockServer(mockModules)
}
