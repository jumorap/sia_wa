import React, { useState, createContext } from 'react';


export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
    const [isUser, setUser] = useState(true);

    return (
        <UserContext.Provider value={[isUser, setUser]}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContextProvider;
