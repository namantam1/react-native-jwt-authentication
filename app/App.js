import React, { useState } from 'react';
import AuthContext from './auth/context';
import Navigation from './navigation/Navigation';

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{user, setUser}} >
      <Navigation/>
    </AuthContext.Provider>
  )
};

export default App;
