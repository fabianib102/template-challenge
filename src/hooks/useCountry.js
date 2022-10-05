import { useEffect, useState } from 'react';
import { getCountriesByRegion } from '../services/countryService';

export const useCountry = (region) => {
    
    const [dataCountries, setDataCountries] = useState([]);
    const [errorData, setErrorData] = useState({})
  
    useEffect(()=>{
        getCountriesByRegion(region).then(data => {
            setDataCountries(data)
        }).catch(error => {
            setErrorData({
                error: true,
                description: error
            })
        })
    }, [region])
  
    return {
        dataCountries,
        errorData
    };
};