import { useEffect, useState } from "react";

export const useFetchPosts = (url) => {
    const [spaPosts, setSpaPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        fetch(url)
        .then((response) => response.json())
        .then((postsFromServer) => {
            setSpaPosts(postsFromServer);
            setIsLoading(false);
        })
        .catch((error) => {
            setIsLoading(false);
            setError(error);
        })
    }, [url]);

    return { spaPosts, setSpaPosts, isLoading, error }
}