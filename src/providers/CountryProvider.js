import { useState } from "react";
import CountryContext from "../context/CountryContext";

export const CountryProvider = ({ children }) => {
    
    const [listCountrySelected, setListCountrySelected] = useState([]);

    const handleListCountry = (newCountry) => {
        const indexToAdd = listCountrySelected.findIndex(e => e === newCountry);
        const newList = [...listCountrySelected];
        indexToAdd < 0 ? newList.push(newCountry) : newList.splice(indexToAdd, 1)
        setListCountrySelected(newList)
    }
    
    return (
        <CountryContext.Provider 
            value={{
                listCountrySelected,
                handleListCountry
            }}
        >
            {children}
        </CountryContext.Provider>
    );
}