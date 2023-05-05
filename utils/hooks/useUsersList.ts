import { useEffect, useState } from "react";
import { getUsers } from "../../api";

const useUsersList = () => {
    const [userListData, setUserListData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        getUsers()
            .then((data) => {
                setUserListData(data);
                setIsError(false);
            })
            .catch((err) => setIsError(true))
            .finally(() => setIsLoading(false));
    }, []);

    return { userListData, isLoading, isError };
};

export default useUsersList;
