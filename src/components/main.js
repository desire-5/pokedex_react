import React, {useState, useEffect, useRef, useCallback} from 'react'
import {AppBar, Toolbar, Grid,Button, TextField} from '@material-ui/core'
import {fade,withStyles} from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress';
import {getAllPokemon,getPokemonApi} from '../api/pok_api'
import CardInfo from './CardInfo';
import Fade from "react-reveal/Fade"
import SearchIcon from '@material-ui/icons/Search';

const styles = theme => ({
    mainContainer:{
        padding:"2rem"
    },
    progress: {
      margin: theme.spacing.unit * 2,
    },
    button:{
      margin:"1rem auto"
    },
    searchContainer: {
       display:"flex",
       padding:"25px",
       margin: "5px",
       backgroundColor: fade(theme.palette.common.white, 0.20),
       
    },
    searchIcon:{
      alignSelf:"flex-end"
    },
    searchInput:{
      width:"30%"
    }  
  });
  
const Main = (props) => {
    const { classes } = props;
    const [pokemData, setPokemonData] = useState([])
    const [limit, setLimit] = useState(12)
    const [loading, setLoading] = useState(true)
    const [offset, setOffset] = useState(0)
    const [filter, setFilter] = useState("")

    const observer = useRef()
    const lastBookElementRef = useCallback(node => {
    if (loading) return
    console.log('observer',observer)
        if (observer.current) 
            observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting ) {
          // setOffset(prevPageNumber => prevPageNumber + limit)
        }
    })
    if (node) observer.current.observe(node)
    }, [loading])

    async function fetchData(a,b) {
        // debugger
      let {results} = await getAllPokemon(`https://pokeapi.co/api/v2/pokemon?limit=${a}&offset=${b}`)
      await loadPokemon(results);
      setLoading(false);
    }
    useEffect(() => {
        fetchData(limit,offset);
    }, [offset])

    const loadPokemon = async (data) => {
      let _pokemonData = await Promise.all(data.map(async pokemon => {
      let pokemonItem = await getPokemonApi(pokemon)
      return pokemonItem   
      }))
      
      setPokemonData(prevState => {
        return [...prevState, ..._pokemonData]
      });
    }
      
    const getMore = () => {
        let offset_new =  offset + limit
        setOffset(offset_new)
        fetchData(limit,offset_new)
    } 
    const handleSearch=(e)=>{
      setFilter(e.target.value)
    }

    return (
        <>
        <AppBar position='static'>
            <Toolbar/>
            <div className={classes.searchContainer}>
              <SearchIcon className={classes.searchIcon}/>  
              <TextField 
              onChange={handleSearch}
              label="Search"/>
            </div>
        </AppBar>
        {pokemData && !loading ? (
          <>
          <Fade bottom >
            <Grid container spacing={3} className={classes.mainContainer}>          
                {                   
                    pokemData.map( (item, id) => {
                      if (pokemData.length === id + 1) {
                        return  pokemData[id].name.includes(filter) &&
                        <CardInfo ref={lastBookElementRef} key={id} pokemon={item} />
                      }else {
                        return  pokemData[id].name.includes(filter) &&
                        <CardInfo key={id} pokemon={item} />
                      }
                    })
                }                  
            </Grid>
            </Fade>    
            <Grid container spacing={2} >
              <Button className={classes.button} onClick={getMore} variant="contained">load more</Button>
            </Grid>    
            </>
        ) : (
            <CircularProgress/>
        ) } 
        </>
    )
}
export default withStyles(styles)(Main);