import React from 'react';

const AuthContext = React.createContext();

export const AuthContextProvider = AuthContext.Provider;
export const AuthContextConsummer = AuthContext.Consumer;

export default AuthContext;
