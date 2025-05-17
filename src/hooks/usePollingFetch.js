import { useEffect, useState } from 'react'

export default function usePollingFetch(url, intervalMs = 5 * 60 * 1000) {
  const [data, setData] = useState([])

  useEffect(() => {
    let isMounted = true

    const fetchData = () => {
      fetch(`${url}?t=${Date.now()}`, { cache: 'no-store' })
        .then(r => r.json())
        .then(json => {
          if (isMounted) setData(json)
        })
        .catch(console.error)
    }

    // chamada imediata
    fetchData()
    // polling
    const handle = setInterval(fetchData, intervalMs)

    return () => {
      isMounted = false
      clearInterval(handle)
    }
  }, [url, intervalMs])

  return data
}
