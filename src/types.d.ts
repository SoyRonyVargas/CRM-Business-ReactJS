
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
  fecha_nacimiento: Date | string
  apellido: string
  telefono: string
  empresa: string
  vendedor: Basic
  creado: string
  email: string
  rfc: string
}

export type CrearCliente = Pick<Cliente, "apellido" | "fecha_nacimiento" | "email" | "nombre" | "telefono"> & {
  empresa: string
  rfc: string
}

export type ActualizarCliente = CrearCliente & {
  id: string
  vendedor: string
}

export type ClienteLight = Cliente & {
  vendedor: Usuario
  creado: string
  id: string
}

// PRODUCTOS 

export type Producto = Basic & {
  existencias?: number
  descripcion: string
  imagen: string[]
  precio: number
  creado?: string
  status: number
}

export type ProductoLight = Basic & {
  descripcion: string
  imagen: string
  precio: number
  creado: string
  status: number
}

export type CrearProducto = Pick<Producto, "descripcion" | "nombre" | "precio" | "status"> & {
  imagen?: string[]
};

export type QueryProductos ={
  nombre: string
  precio: number
  status: number
  pagina: number
}