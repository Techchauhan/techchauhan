import React from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import CreateCategory from './createCategory'
import FetchCategory from './fetchcategory'

export default function Cateogry() {
  return (
    <div>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
  <Grid item xs={6}>
  <CreateCategory/>

  </Grid>
  <Grid item xs={6}>
  <FetchCategory/>
  </Grid>
  
</Grid>
     

    </div>
  )
}
