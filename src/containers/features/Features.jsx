import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './features.css';
import { hasSelectionSupport } from '@testing-library/user-event/dist/utils';


const Features = () => {
    const CLIENT_ID = "7c1197ecd3164251bb3bb7d15a85c189"
    const REDIRECT_URI = "http://localhost:3000"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token"
    const SCOPE = "user-top-read user-read-email"

    const [token, setToken] = useState("")
    const [searchKey, setSearchKey] = useState("")
    const [artists, setArtists] = useState([])

    const [allButtonActive, setAllButtonActive] = useState(false)
    const [shortButtonActive, setShortButtonActive] = useState(false)
    const [longButtonActive, setLongButtonActive] = useState(false)
    
    useEffect(() => {
        const hash = window.location.hash
        let token = window.localStorage.getItem("token")
        console.log({token})
    
        if (!token && hash) {
            token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]
    
            window.location.hash = ""
            window.localStorage.setItem("token", token)
        }
    
        setToken(token)
    
    }, [])

    const logout = () => {
        setToken("")
        setArtists([])
        window.localStorage.removeItem("token")
    }

    const login = () => {
        window.location.href=`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`
    }

    const getTopArtistsAlltime = async () => {
        setShortButtonActive(false)
        setLongButtonActive(false)
        setAllButtonActive(true)
        const {data} = await axios.get("https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=5", {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
              
            }
        })
        setArtists(data.items)
    }

    const getTopArtistsShort = async () => {
        setShortButtonActive(true)
        setLongButtonActive(false)
        setAllButtonActive(false)
        const {data} = await axios.get("https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=5", {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
              
            }
        })
        setArtists(data.items)
    }

    const getTopArtistsLong = async () => {
        setShortButtonActive(false)
        setLongButtonActive(true)
        setAllButtonActive(false)
        const {data} = await axios.get("https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=5", {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
              
            }
        })
        setArtists(data.items)
    }

    const renderArtists = () => {
        return artists.map(artist => (
            <div className="sum__features-content__show scale-up-center" key={artist.id}>
                {artist.images.length ? <img src={artist.images[0].url} alt=""/> : <div>No Image</div>}
                <div className="sum__features-content__show-name">{artist.name}</div>
            </div>
        ))
    }

    return (
        <div className="sum__features section_padding" id="home">
            <div className="sum__features-content">
                    {!token ?
                    <>
                    <div className="sum__features-content__loggedOut">
                        <button onClick={login}>Login</button>
                    </div>
                    </>
                    : <>
                    <div className="sum__features-content__loggedIn">
                        <button onClick={logout}>Logout</button>
                        <div className="sum__features-content__choice">
                            <button onClick={() => getTopArtistsAlltime() } style={{ backgroundColor: allButtonActive ? "grey" : "black" }}>All Time</button>
                            <button onClick={() => getTopArtistsShort()} style={{ backgroundColor: shortButtonActive ? "grey" : "black" }}>Last 4 weeks</button>
                            <button onClick={() => getTopArtistsLong()} style={{ backgroundColor: longButtonActive ? "grey" : "black" }}>Last 6 months</button>
                        </div>
                    </div>
                    </> 
                    }
                    {renderArtists()}
            </div>
        </div>
    )
}

export default Features
