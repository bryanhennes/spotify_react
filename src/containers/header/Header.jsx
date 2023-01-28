import React, { useEffect, useState } from 'react';
import './header.css';
import axios from 'axios';
import { RiContactsBookLine } from 'react-icons/ri';





const Header = () => {
    const CLIENT_ID = "7c1197ecd3164251bb3bb7d15a85c189"
    const REDIRECT_URI = "http://localhost:3000"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token"
    const SCOPE = "user-top-read user-read-email"

    const [token, setToken] = useState("")
    const [searchKey, setSearchKey] = useState("")
    const [artists, setArtists] = useState([])
    
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
        window.localStorage.removeItem("token")
    }

    const getTopArtists = async () => {
        console.log({token});
        const {data} = await axios.get("https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=5", {
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
            <div key={artist.id}>
                {artist.images.length ? <img width={"10%"} src={artist.images[0].url} alt=""/> : <div>No Image</div>}
                {artist.name}
            </div>
        ))
    }


    return (
        <div className="sum__header section_padding">
            <div className="sum__header-content">
                <h1 className="gradient__text">Summify</h1>
                <div className="sum__header-content__login">
                    {!token ?
                    <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`}>Login to Spotify</a>
                    : <button onClick={logout}>Logout</button>}
                </div>
                <div className="sum__header-content__display">
                    <button type="submit" onClick={() => getTopArtists()}>Get Top 5</button>
                </div>
                <div className="sum__header-content__show scale-up-center">
                    {renderArtists()}
                </div>
            </div>
        </div>
    )
}

export default Header
