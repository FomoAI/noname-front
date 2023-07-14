import {config} from '../config/api.js'

export default async (id) => {
   try{
    const responce = await fetch(config.createUrl(`favourites/${id}`))

    const {success,favourites} = await responce.json()
    
    return {success,favourites}

   }catch(error){
    console.log(error)

    return {success:false,favourites:[]}
   }
}