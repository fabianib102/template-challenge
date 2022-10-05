import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import { Avatar } from '@mui/material';

const Country = ({ countryData }) => {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {countryData.name.common} 
                </Typography>
                <Chip label="Chip Outlined" variant="outlined" />
            </CardContent>
            <CardHeader
                avatar={<Avatar>{countryData.flag}</Avatar>}
                title={`Capital: ${countryData.capital[0]}`}
                subheader="September 14, 2016"
            />
            <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    )
}

export default Country