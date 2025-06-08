import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import googleImage from '../../public/google.png'


export default function GoogleSearch(props) {
    const [searchValue, setSearchValue] = useState('')
    const [googleSuggestions, setGoogleSuggestions] = useState([])
    const [hoverd, setHoverd] = useState(true)
    const getGoogleSuggestions = async (value) => {
        try {
            const listOfawaitGoogleSuggestions = await axios.get(`http://localhost:3001/search/${value}`)
            await setGoogleSuggestions(listOfawaitGoogleSuggestions.data);
        } catch (error) {

        }
    }
    useEffect(() => {
        // on enter press button
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                document.getElementById('search-btn').click()
                setSearchValue('');
                document.getElementById('search').value = '';
                setGoogleSuggestions([]);
            }
            if (e.key === 'Escape') {
                setGoogleSuggestions([]);
            }
        })
    }, [googleSuggestions])
    return (
        <div>
            <div className="my-3 xsm:grid md:flex w-full gap-3 m-auto">
                <div className="xsm:block md:inline-block m-auto ">
                    <Image className='w-fit mx-auto' src={googleImage} alt="google image" width={100} height={100} />
                </div>
                <span className="xsm:grid order-last  md:flex w-full xsm:flex-wrap md:flex-nowrap gap-2 relative">

                    <div className="order-last relative">
                        <button
                            disabled={!searchValue}

                            id='search-btn'
                            className="bg-blue-500   disabled:peer disabled:bg-gray-600 disabled:blur-[1px] text-white rounded-md p-2 disabled:opacity-50 disabled:cursor-not-allowed xsm:w-full md:w-fit"
                            onClick={() => {
                                window.open(`https://www.google.com/search?q=${searchValue}`, '_blank')
                            }}
                        >Search</button>
                        {
                            hoverd && <div className="order-last absolute top-0 z-10  w-full h-full "
                                onMouseEnter={() => {
                                    document.getElementById('searchDiv').style.width = '100%'
                                    document.getElementById('searchDiv').style.position = 'absolute'

                                    setTimeout(function () { document.getElementById('search').focus() }, 100);



                                    setHoverd(false)
                                }}
                            ></div>
                        }
                    </div>
                    <div id='searchDiv' className={`w-full relative peer-disabled:group ${searchValue && '!relative'}`}>
                        <input
                            id='search'
                            onChange={(e) => { getGoogleSuggestions(e.target.value), setSearchValue(e.target.value) }}
                            type="text" className="min-w-max w-full rounded-md border-2 border-gray-300 p-2 " />
                        {searchValue && googleSuggestions.length>0 && googleSuggestions && <div className="w-full  absolute top-15   border-2 border-gray-300 rounded-md bg-gray-100">
                            {searchValue && googleSuggestions?.map((suggestion, index) => (
                                <div className="p-2 hover:bg-gray-200 " key={index}

                                    onClick={() => {
                                        setSearchValue(suggestion);
                                        document.getElementById('search').value = suggestion;
                                        setTimeout(() => {
                                            document.getElementById('search-btn').click();
                                            setSearchValue('');
                                            document.getElementById('search').value = '';
                                            setGoogleSuggestions([]);
                                        }, 0);
                                    }}
                                >{suggestion}</div>
                            ))}
                        </div>}
                    </div>

                </span>
                {/* 
                    powered by google and puppeteer
                */}
            </div >
            <p className='text-xs text-right text-gray-400'>
                Google autocomplete integrated
            </p>
        </div >
    )
}
