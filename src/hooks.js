import { useEffect, useState, useRef, useCallback } from 'react';

export function useAuthState(auth) {
    // If user is authenticated, let them enter directly
    //Access the authenticated user property
    const [user, setUser] = useState(() => auth.currentUser);
    // blocks main application from rendering while connection is being established
    const [initializing, setInitializing] = useState(true);

    useEffect (() => {
        // async, triggers initial state when connection established
        const unsubscribe = auth.onAuthStateChanged(user => {
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

export function useFirestoreQuery(query) {
    const [docs, setDocs] = useState([]);
  
    // Store current query in ref
    const queryRef = useRef(query);
  
    // Compare current query with the previous one
    useEffect(() => {
      // Use Firestore built-in 'isEqual' method
      // to compare queries
      if (!queryRef?.curent?.isEqual(query)) {
        queryRef.current = query;
      }
    });

    // Re-run data listener only if query has changed
  useEffect(() => {
    if (!queryRef.current) {
      return null;
    }

    // Subscribe to query with onSnapshot
    const unsubscribe = queryRef.current.onSnapshot(querySnapshot => {
      // Get all documents from collection - with IDs
      const data = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));
      // Update state
      setDocs(data);
    });

    // Detach listener
    return unsubscribe;
  }, [queryRef]);
  return docs;
}