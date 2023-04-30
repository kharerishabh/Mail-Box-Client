import { useCallback } from "react";
import { useState } from "react";

const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const sendRequest = useCallback (async (requestConfig, applyData = null) => {
        setIsLoading(true)
        setError(null)
        try{
            const response = await fetch(requestConfig.url, {
                method: requestConfig.method ? requestConfig.method : 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: requestConfig.body ? JSON.stringify(requestConfig.body) : null
            })
            if(!response.ok){
                throw new Error('Request Failed')
            }
            const data = await response.json()
            if(applyData){
                applyData(data)
            }
        }catch(err){
            setError(err.message || 'Somethinf Went Wrong')
        }
        setIsLoading(false)
    })
    return {
        isLoading,
        error,
        sendRequest
    }
}

export default useHttp;