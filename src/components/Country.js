import * as React from 'react';
import { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import { Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import useDataCountry from '../hooks/useDataCountry';

const CardParent = styled(Card)(({ selected }) => ({
    backgroundColor: selected ? '#f2f2f2' : 'white',
    maxWidth: 345
}));

const Country = ({ countryData }) => {

    const [isSelected, setIsSelected] = useState(false);
    const { handleListCountry } = useDataCountry();

    const handleSelectCountry = (name) => {
        setIsSelected(!isSelected);
        handleListCountry(name)
    }
    
    return (
        <CardParent selected={isSelected}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {countryData.name.common} 
                </Typography>
                <Chip label={isSelected ? 'Selected':'Select country'} variant="outlined" onClick={()=>handleSelectCountry(countryData.name.common)} />
            </CardContent>
            <CardHeader
                avatar={<Avatar>{countryData.flag}</Avatar>}
                title={`Capital: ${countryData.capital[0]}`}
                subheader={`Population: ${countryData.population}`}
            />
            <CardActions>
                <Button size="small">View Details</Button>
            </CardActions>
        </CardParent>
    )
}

export default Country