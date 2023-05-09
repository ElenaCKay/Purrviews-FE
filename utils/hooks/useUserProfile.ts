import { useEffect, useState } from "react";
import { getUsersByUsername } from "../../api";

const useUserProfile = (username) => {
    interface catType {
        cat_name: string,
        age: number,
        breed: string,
        characteristics: string[],
        cat_img: string,
        missing: boolean,
        cat_id: number
    }
    interface userType {
        _id: string,
        username: string,
        description: string,
        avatar: string,
        cats: catType[]
    };
    const [userProfile, setuserProfile] = useState({} as userType);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        getUsersByUsername(username)
            .then((data) => {
                setuserProfile(data);
                setIsError(false);
            })
            .catch((err) => setIsError(true))
            .finally(() => setIsLoading(false));
    }, []);

    return { userProfile, isLoading, isError };
};

export default useUserProfile;
