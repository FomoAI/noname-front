import {config} from '../config/api.js'

export default async () => {
    try{
        const responce = await fetch(config.createUrl('collections'))
        
        if(!responce.ok){
            return {success:false,projects:[]}
        }   
        const {success,collections} = await responce.json()
        
        return {success,collections}

    }catch(error){
        console.log(error)
        return {success:false}
    }
}