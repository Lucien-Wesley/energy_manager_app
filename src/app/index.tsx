import { useAuth } from '@/utils/auth-context';
import { Redirect } from 'expo-router';
import React from 'react';


export default function HomeScreen() {
  const isAuthenticated = useAuth();
  return (
    <>
      {isAuthenticated ? (
        <Redirect href={'/(auth)'} />
      ) : (
        <Redirect href={'/(home)'} />
      )}
    </>
  );
}
