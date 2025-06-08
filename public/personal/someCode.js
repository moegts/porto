{/* google image */ }
<hr />
<GoogleSearch />
{/* go to link /tasklist */ }
<div className="">
    <h2 className='text-white'>
        Here is a list of my Utilities and Tools that I Created
    </h2>
    <div className="bg-[#2c2f33] grid m-auto  w-full sm:grid-cols-2 md:grid-cols-4">
        <Link href={"/tasklist"} >
            <div className=" flex ">
                <p className='text-white grid my-auto'>1.</p>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white grid my-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <br />
                <p className='text-white grid my-auto'>TaskList</p>
            </div>
        </Link>
    </div>
    {/* // "quote": "\"Wisdom is the sum of knowledge and experience often revealing just how much we don't yet know.\"", */}
