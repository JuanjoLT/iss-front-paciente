// Este “shim” le dice a TypeScript que los imports de .vue son componentes válidos
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}