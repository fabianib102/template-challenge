import * as React from 'react';
import { Grid } from '@mui/material';
import Country from './Country';

const ListCountry = ({ countryList }) => {

    return (
        <Grid container spacing={3}>
            {
                countryList.length > 0 ? 
                    countryList.map((item,index)=> (
                        <Grid item xs={12} sm={12} md={6} lg={3} key={index}>
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