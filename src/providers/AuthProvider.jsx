import PropTypes from 'prop-types';
import { useState, createContext, useEffect } from "react";
import { signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import useAxiosPortfolio from '../hooks/useAxiosPortfolio';

const googleProvider = new GoogleAuthProvider();

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userLoading, setUserLoading] = useState(true);
    const axiosPortfolio = useAxiosPortfolio();

    // Sign in with Google
    const googleLogin = () => {
        setUserLoading(true);
        return signInWithPopup(auth, googleProvider)
    }

    // Sign Out
    const logOut = () => {
        setUserLoading(true);
        return signOut(auth)
    }

    // Observer Function
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            if(currentUser){
                const userInfo = { email: currentUser.email };
                axiosPortfolio.post('/secret/jwt', userInfo)
                    .then(res => {
                        if (res.data.token) {
                            localStorage.setItem('portfolio-token', res.data.token);
                            setUserLoading(false);
                        }
                    })
            } else {
                // remove token if the token stored in the localStorage
                localStorage.removeItem('portfolio-token');
                setUserLoading(false);
            }
            setUserLoading(false);
        });
        return () => {
            unsubscribe();
        }
    }, [axiosPortfolio])

    const authInfo = { user, setUser, googleLogin, logOut, userLoading, setUserLoading };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node
}

export default AuthProvider;