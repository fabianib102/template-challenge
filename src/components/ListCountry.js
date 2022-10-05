import * as React from 'react';
import { Grid } from '@mui/material';
import Country from './Country';

const ListCountry = ({ countryList }) => {

    console.log('countryList: ', countryList)

    return (
        <Grid container spacing={3}>
            {
                countryList.length > 0 ? 
                    countryList.map((item,index)=> (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <Country countryData={item}/>
                        </Grid>
                    ))
                :
                "Please, wait"
            }
        </Grid>
    )
}

export default ListCountry