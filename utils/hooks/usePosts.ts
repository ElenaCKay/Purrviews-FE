import { useEffect, useState } from 'react';
import { getPosts } from '../../api';

const usePosts = () => {
    const [postsData, setPostsData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        getPosts()
        .then(data => {
            setPostsData(data);
            setIsError(false);
        })
        .catch(err => setIsError(true))
        .finally(() => setIsLoading(false));
    }, []);

    return { postsData, setPostsData, isLoading, isError };
}

export default usePosts;