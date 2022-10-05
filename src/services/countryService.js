import axios from "axios";
import { urlGetCountriesByRegion } from "../utils/urlDataFetch";

export const getCountriesByRegion = (region) => {
    return axios(`${urlGetCountriesByRegion}/${region}`)
    .then(resp => {
        const { data } = resp;
        return data
    });
}