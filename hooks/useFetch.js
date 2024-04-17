import { useState, useEffect } from "react";
import axios from "axios";
const usefetch = () => {
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get("https://api.sampleapis.com/coffee/hot");
            setData(response.data);
            setIsLoading(false);
        } catch (error) {
            setError(true);
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    },[]);

    return {data, isLoading, error}
};

export default usefetch;
