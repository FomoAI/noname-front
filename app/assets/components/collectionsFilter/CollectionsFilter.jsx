import { useState } from 'react'
import styles from './filter.module.scss'

const filtersInitialState = [
    {
        name:'All NFT',
        filterValue:'all',
        isSelect:true,
    },
    {
        name:'No name key',
        filterValue:'nonamekey',
        isSelect:false,
    },
    {
        name:'Crypto',
        filterValue:'crypto',
        isSelect:false,
    },
    {
        name:'Business',
        filterValue:'business',
        isSelect:false,
    },
    {
        name:'zkSync',
        filterValue:'zksync',
        isSelect:false,
    },
]

export default function CollectionsFilter({handleFilterChange}) {
    const [filters,setFilters] = useState(filtersInitialState)

    const changeFilter = (filterToChange) => {
        setFilters((prev) => {
            return (
                prev.map((filter) => {
                    if(filter.filterValue === filterToChange.filterValue){
                        return {...filter,isSelect:true}
                    }
                    return {...filter,isSelect:false}
                })
            )
        })
        handleFilterChange(filterToChange.filterValue)
    }
 
  return (
    <div className={styles.body}>
        {
            filters.map((filter) => {
                return (
                    filter.isSelect
                    ?
                    <button
                    key={filter.name}
                    onClick={() => changeFilter(filter)} 
                    className={styles.filter + ' ' + styles.selected}>
                        {filter.name}
                    </button>
                    :
                    <button
                    key={filter.name}
                    onClick={() => changeFilter(filter)} 
                    className={styles.filter}>
                    {filter.name}
                    </button>
                )
            })
        }
    </div>
  )
}
