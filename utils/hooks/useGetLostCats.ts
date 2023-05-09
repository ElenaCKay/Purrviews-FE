import { useEffect, useState } from "react";
import { getLostCats } from "../../api";

const useGetLostCats = () => {
    interface catType {
        cat_name: string;
        age: number;
        breed: string;
        characteristics: string[];
        cat_img: string;
        missing: boolean;
        cat_id: number;
    }
    interface userType {
        _id: string;
        username: string;
        cats: catType[];
    }
    const [lostCats, setLostCats] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        getLostCats()
            .then((data) => {
                setLostCats(data);
                setIsError(false);
            })
            .catch((err) => setIsError(true))
            .finally(() => setIsLoading(false));
    }, []);

    return { lostCats, isLoading, isError };
};

export default useGetLostCats;
