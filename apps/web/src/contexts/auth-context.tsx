import { createContext, useContext, useState, type ReactNode, useEffect, useCallback } from "react"
import api from "@/lib/api"
import axios from "axios"
import { toast } from "sonner"
import { redirect } from "@tanstack/react-router"

interface User {
  id: string
  name: string
  email: string
  whatsapp: string
  bio: string
  avatar?: string
}

interface LoginCredentials {
  email: string
  password: string
}

export interface AuthContextType {
  signed: boolean
  user: User | null
  signIn: (credentials: LoginCredentials) => Promise<void>
  signOut: () => void
  loading: boolean
  token: string | null
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    try {
      const storagedUser = localStorage.getItem('@Nexu:user')
      const storagedToken = localStorage.getItem('@Nexu:token')

      if (!storagedToken || !storagedUser) {
        redirect({ to: "/login" })
      }

      if (storagedToken && storagedUser) {
        setToken(storagedToken)
        api.defaults.headers.common['Authorization'] = `Bearer ${storagedToken}`
        setUser(JSON.parse(storagedUser))
      }

      const check = async () => {
        try {
          await verifyToken(storagedToken || "")
        } catch (err) {
          localStorage.removeItem("@Nexu:token")
          if (!storagedToken) {
            redirect({ to: "/login" })
          }
        } finally {
          setLoading(false)
        }
      }

      check()
    } catch {
      localStorage.removeItem('@Nexu:token')
      localStorage.removeItem('@Nexu:user')
    } finally {
      setLoading(false)
    }
  }, [token])


  const verifyToken = async (token: string) => {
    try {
      const response = await api.get("/auth/verify", {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (!response.data) {
        throw new Error("Token inválido")
      }
      setUser(response.data.user)
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        localStorage.removeItem("auth_token")
        setUser(null)
        const isProtectedRoute = location.pathname.startsWith('/admin')
        if (isProtectedRoute) {
          toast.error("Você precisa estar logado para acessar esta página!")
          // @ts-ignore
          throw redirect({ to: "/login" })
        }
      }
      throw error
    }
  }

  const signIn = useCallback(async ({ email, password }: LoginCredentials) => {
    try {
      const response = await api.post('/auth/login', { email, password })
      const { token, user: userData } = response.data

      localStorage.setItem('@Nexu:token', token)
      localStorage.setItem('@Nexu:user', JSON.stringify(userData))

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      setToken(token)
      setUser(userData)
    } catch (error) {
      throw error
    }
  }, [])

  const signOut = useCallback(() => {
    localStorage.removeItem('@Nexu:token')
    localStorage.removeItem('@Nexu:user')
    delete api.defaults.headers.common['Authorization']
    setToken(null)
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ signed: !!user, user, signIn, signOut, loading, token, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
