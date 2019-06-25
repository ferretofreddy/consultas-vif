import React from 'react';

export default React.createContext({
    token: null,
    userId: null,
    tokenExpiration: null,
    identificacion: null,
    name: null,
    roll: null,
    login: (token, userId, tokenExpiration, identificacion, name, roll) => {},
    logout: () => {}
});