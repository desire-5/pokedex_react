import { Grid,Card, CardMedia,Typography,CardContent } from '@material-ui/core'
import React, {useState, useEffect} from 'react'
import {makeStyles, withStyles} from '@material-ui/core/styles'
import ColorsOfType from '../helper/ColorsOfType'
import Modal from "react-modal"
import PokemonDatail from './PokemonDetail'

const styles = theme => ({

    pokImg:{
        margin:"auto"
    },
    cardContent:{
        textAlign:'center'
    },
    types:{
        padding:'0.2rem',
        width:'5rem',
        margin:".3rem auto"
    },
    cardWrap:{
        height:'100%'
    },
    popupCard:{
        width:"40%",
        backgroundColor:"blue"
    }
  });

const CardInfo = ({ pokemon, classes }) => {

  const openModale = (pokemon) => {
        setPokemone(pokemon)
    }
   const closeModale = () => {
        setPokemone(null)
    }
    const [pokemone, setPokemone] = useState(null)
    const fullImageUrl = `https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png`;
    return (
        <Grid item xs={12} sm={4} key={pokemon.id}>
            <Card className={classes.cardWrap}>
                <CardMedia image={fullImageUrl} className={classes.pokImg} style={{width:'100px', height:'100px'}}/>
                    <CardContent className={classes.cardContent}>
                    <a href="#" onClick={() => openModale(pokemon)}>
                        {pokemon.name}
                    </a>
                    {pokemon.types.map(item => {
                        const {type} = item
                        return <Typography className={classes.types} style={{backgroundColor:ColorsOfType[type.name]}}>{type.name}</Typography>
                    })}
                </CardContent>
            </Card>
            {pokemone && (
                <Modal isOpen={true}
                     onRequestClose={closeModale} ariaHideApp={false}
                     style={{
                        content: {
                        width:"30%",
                        left: '440px',
                        }
                    }}
                     >
                    <button onClick={closeModale}>x</button>
                    <div className={styles.popupCard}>
                        <PokemonDatail pokemon={pokemone}/>
                    </div>
                </Modal>
                )}
        </Grid>
    )
}
export default withStyles(styles)(CardInfo)