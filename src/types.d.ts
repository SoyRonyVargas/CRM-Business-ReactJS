
export type Usuario = {
  nombre: string
  id: string
}

export type Basic = {
  nombre: string
  id: string
}

export type NavElement = {
  component: any
  icon?: JSX.Element
  name?: string
  to?: string
  badge?: {
    color: string
    text: string
  }
  href?: string
  items?: NavElement[]
}

export type AuthUser = {
  password: string
  email: string
}

export type WrapperQuery<T> = {
  [key: string]: T
}

export type AutenticatedUser = {
  usuario: Basic
  token: string
}

export type Cliente = Basic & {
  vendedor: Basic
  apellido: string
  creado: string
}