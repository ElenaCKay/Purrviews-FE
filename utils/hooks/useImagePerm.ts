import { requestMediaLibraryPermissionsAsync } from "expo-image-picker";
import React, { useEffect, useState } from "react";

const useImagePerm = () => {
    const [imagePerm, setImagePerm] = useState(false);

    useEffect(() => {
        requestMediaLibraryPermissionsAsync()
        .then(res => {
            setImagePerm(res.status === 'granted');
        });
    }, [])

    return imagePerm;
}

export default useImagePerm;