import React, { createContext, useState, useContext, useEffect } from 'react';

export const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
    const [array, setArray] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const url = `https://midnight-sec-back.onrender.com/api/products/`;

    const getData = async () => {
        setLoading(true);
        setError(false);
        try {
            const response = await fetch(url);
            const data = await response.json();
            setArray(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error('Error fetching data:', err);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <BlogContext.Provider value={{ array, loading, error, getData, setArray }}>
            {children}
        </BlogContext.Provider>
    );
};

export const useBlog = () => useContext(BlogContext);
