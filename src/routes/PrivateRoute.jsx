import PropTypes from 'prop-types';
import { Navigate } from "react-router-dom";
import useAuth from '../hooks/useAuth';
import { LogoSpinner } from '../components/Spinner/Spinner';

const PrivateRoute = ({ children }) => {
    const { user, userLoading } = useAuth();

    if (userLoading) {
        return <LogoSpinner />
    }

    if (user) {
        return children;
    }

    return <Navigate to="/"></Navigate>
};

PrivateRoute.propTypes = {
    children: PropTypes.node
}

export default PrivateRoute;