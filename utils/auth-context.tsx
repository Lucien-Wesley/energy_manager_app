import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Définir les types de l'utilisateur et du contexte
interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (token: string, userData: User) => Promise<void>;
  logout: () => Promise<void>;
}

// Crée le contexte d'authentification
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Fournisseur d'authentification
interface AuthProviderProps {
  children: ReactNode; // Assurez-vous que 'children' est correctement typé
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Charger l'état d'authentification au démarrage
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userToken = await AsyncStorage.getItem('token');
        const storedUser = await AsyncStorage.getItem('user'); // Optionnel pour récupérer les détails de l'utilisateur
        if (userToken && storedUser) {
          setIsAuthenticated(true);
          setUser(JSON.parse(storedUser)); // Récupérer l'utilisateur si nécessaire
        }
      } catch (error) {
        console.error('Erreur de récupération du token ou de l\'utilisateur:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  // Fonction de connexion
  const login = async (token: string, userData: User) => {
    try {
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('user', JSON.stringify(userData)); // Stocker l'utilisateur
      setUser(userData);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Erreur de connexion:', error);
    }
  };

  // Fonction de déconnexion
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Erreur de déconnexion:', error);
    }
  };

  // Retourner le contexte avec les valeurs
  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {!loading ? children : null}
    </AuthContext.Provider>
  );
};

// Hook pour utiliser le contexte
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
