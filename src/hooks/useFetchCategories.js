import { useState, useEffect } from 'react';

const useFetchCategories = (url) => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(url);
                const data = await response.json();
                setCategories(data);
            } catch (err) {
                console.log(err)
                setError("Failed to fetch categories.");
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, [url]);

    return { categories, loading, error };
};

export default useFetchCategories;
