import axios from "axios";

const axiosPortfolio = axios.create({
    baseURL: 'https://nhb-portfolio-server.vercel.app'
})

const useAxiosPortfolio = () => {
    return axiosPortfolio;
};

export default useAxiosPortfolio;