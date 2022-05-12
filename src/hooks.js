import { useEffect, useState, useRef, useCallback } from 'react';

export function useAuthState(auth) {
    // If user is authenticated, let them enter directly
    //Access the authenticated user property
    const [user, setUser] = useState(() => auth.currentUser);
    // blocks main application from rendering while connection is being established
    const [initializing, setInitializing] = useState(true);

    useEffect (() => {
        // async, triggers initial state when connection established
        const unsubscribe = auth().onAuthStateChanged(user => {
            if (user) {
                setUser(user)
            } else {
                setUser(false);
            } 
            // dont initialize when connection is being established
            if (initializing) {
                setInitializing(false);
            }
        });
        // clean up subscription
        return unsubscribe;
    }, [auth, initializing])

    return {user, initializing};
}