import { useCallback, useState , useLayoutEffect, useMemo} from 'react'
import { useSelector } from 'react-redux'
import styles from '../styles/projects.module.scss'
import Project from '../project/Project'

const filtersInitialState = [
    {
        title:'Active',
        isSelect:true,
    },
    {
        title:'Upcoming',
        isSelect:false,
    },
    {
        title:'Ended',
        isSelect:false,
    },
]

export default function Projects({type}) {
    const [filters,setFilters] = useState([])
    const [filter,setFilter] = useState('Active')
    const [projects,setProjects] = useState([])
    const allProjects = useSelector((state) => {
        return state.allProjects.projects
    })
    
    useLayoutEffect(() => {
        const findedProjects = allProjects.find((pr) => {
            return pr.name.toLowerCase() === filter.toLowerCase()
        })?.projects

        const availableFilters = filtersInitialState.filter((filter) => {
            if(allProjects.find((item) => {
                return item.name === filter.title && item.projects.length 
            })){
                return true
            }
            return false
        })

        if(!findedProjects?.length){
            setProjects([])
            setFilter(availableFilters[0]?.title ? availableFilters[0]?.title : 'Active')
            setFilters(availableFilters.map((item) => {
                if(item.title === availableFilters[0]?.title){
                    return {...item,isSelect:true}
                }
                return item
            }))
            
            return
        }
        setFilters(availableFilters)
        setProjects([...findedProjects].reverse())
    }, [allProjects]);

    const filtersHandler = useCallback((event) => {
        if(event.target.id === 'block') return 

        const target = event.target.textContent
        setFilters(filters.map((filter) => {
            if(filter.title === target){
                return {...filter,isSelect:true}
            }
            return {...filter,isSelect:false}
        }))
        setFilter(target)
    },[filters,filter])

    useMemo(() => {
        for (let i = 0; i < allProjects.length; i++) {
            if(allProjects[i].name === filter){
                setProjects(allProjects[i].projects)
            }
        }
    },[filter])
 
  return (
    <div className={styles.projects}>
        <div id='block' onClick={filtersHandler} className={styles.filters}>
            {filters.map((filterItem) => {
                return (
                    <button 
                    className=
                    {
                        filterItem.title.toLowerCase() === filter.toLowerCase()
                        ? styles.filterBtnSelected 
                        : 
                        styles.filterBtn
                    } 
                    key={filterItem.title}>
                        {filterItem.title}
                    </button>
                )
            })}
        </div>
       <div className={styles.projectsItems}>
        
       {
        projects?.length
        ?
        projects.map((pr,index) => {
            return <Project type={type} key={index} filter={filter} project={pr} index={index}/>
        })
        :
        <></>    
        } 
       </div>
    </div>
  )
}
