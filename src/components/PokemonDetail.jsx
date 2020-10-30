
import React from 'react'
import { Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import ColorsOfType from '../helper/ColorsOfType'
import {withStyles} from '@material-ui/core/styles'

const styles = theme => ({
  cardContent:{
      textAlign:'center'
  },
  types:{
      padding:'0.2rem',
      width:'5rem',
      margin:".3rem auto"
  },
});
const PokemonDatail = ({pokemon,classes}) => {
      const generatePokemon = (pokemon1) => {
        const { name, id, height, weight, types, sprites } = pokemon1;
        const fullImageUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
        const { front_default } = sprites;
        return (
          <>
            <div className={classes.cardContent}>
            <Typography variant="h1">
               {name}
              <img src={front_default} />
            </Typography>
            <img style={{ width: "200", height: "200px" }} src={fullImageUrl} />
            <Typography variant="h3">Pokemon Info</Typography>
            <Typography>Height: {height} </Typography>
            <Typography>Weight: {weight} </Typography>
            <Typography variant="h5"> Types:</Typography>
                {types.map((typeInfo) => {
                    const { type } = typeInfo;
                    const { name } = type;
                    return <Typography key={name} className={classes.types} style={{backgroundColor:ColorsOfType[name]}}> {name}</Typography>;
                })}
              </div>
          </>
        );
      };

    return (
        <>
            {pokemon === undefined && <CircularProgress />}
            {pokemon !== undefined && pokemon && generatePokemon(pokemon)}
            {pokemon === false && <Typography> Pokemon not found</Typography>}
        </>
    )
}
export default withStyles(styles)(PokemonDatail)