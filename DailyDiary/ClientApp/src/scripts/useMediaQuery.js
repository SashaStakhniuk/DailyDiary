import {useEffect, useState} from 'react'

function useMediaQuery(query, defaultmatches = window.matchMedia(query)){
    const [maches, setMaches] = useState(defaultmatches)

    useEffect(() => {
        const media = window.matchMedia(query)
        if(media.matches !== maches) setMaches(media.matches)
        const listner = () => setMaches(maches.matches)
        media.addEventListener("change", listner)
        return () =>{
            media.removeEventListener("change", listner)
        }
    }, [query, maches])
    return maches
}

export default useMediaQuery