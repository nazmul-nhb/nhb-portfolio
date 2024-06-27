import PropTypes from 'prop-types';
import { Navigate } from "react-router-dom";
import useAuth from '../hooks/useAuth';
import Spinner from '../components/Spinner/Spinner';

const PrivateRoute = ({ children }) => {
    const { user, userLoading } = useAuth();

    if (userLoading) {
        return <Spinner />
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