import Axios from "axios";

export async function getAllPokemon(url) {
        const {data} = await Axios.get(url)
        return data
    };

export function getPokemonApi({ url }) {
    return new Promise(async(resolve, reject) => {
       const {data} = await Axios.get(url)
       resolve(data)
    });
}

