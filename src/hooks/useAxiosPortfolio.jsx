import axios from "axios";

const axiosPortfolio = axios.create({
    baseURL: 'http://localhost:5000'
})

const useAxiosPortfolio = () => {
    return axiosPortfolio;
};

export default useAxiosPortfolio;