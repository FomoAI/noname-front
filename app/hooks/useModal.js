import { useCallback , useState } from "react"

export default function useModal() {
    const [modal,setModal] = useState(false)

    const modalHandler = useCallback((event,isTrue) => {
        if(isTrue){
            blockScroll()
            setModal(!modal)
            return
        }
        if(event.target.id === 'toggle-modal' || isTrue || event.target.tagName === 'path'){
            blockScroll()
            setModal(!modal)
        }
    },[modal])

  return {modalHandler,state:modal,setModal}
}
