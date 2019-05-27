import React from 'react';

export default React.createContext({
    token: null,
    userId: null,
    identificacion: null,
    roll: null,
    login: (token, userId, identificacion, roll, tokenExpiration) => {},
    logout: () => {}
});