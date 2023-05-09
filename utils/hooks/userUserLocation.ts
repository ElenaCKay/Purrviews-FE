import { useEffect, useState } from 'react';
import * as Location from 'expo-location';

const useUserLocation = () => {
    const [userLocation, setUserLocation] = useState({
        latitude: 51.509865,
        longitude: -0.118092,
        latitudeDelta: 0.5,
        longitudeDelta: 0.1,
    })
    const [locationPerm, setLocationPerm] = useState(false);

    useEffect(() => {
        Location.requestForegroundPermissionsAsync()
        .then(({ status }) => {
            if (status !== 'granted') return Promise.reject('Location Access Denied!');
            else {
                setLocationPerm(true);
                console.log('Location Access Granted!')
                return Location.getCurrentPositionAsync()
            }
        })
        .then(({coords}) => {
            setUserLocation({
                latitude: coords.latitude,
                longitude: coords.longitude,
                latitudeDelta: 0.5,
                longitudeDelta: 0.1,
            });
        })
        .catch(err => {
            setLocationPerm(false);
            console.log(err);
        })
    }, [])

    return { userLocation, locationPerm };
}

export default useUserLocation;