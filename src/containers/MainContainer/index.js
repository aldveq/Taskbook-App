import React from 'react'

const MainContainer = ({children}) => {
    return (
        <div className='container mx-auto py-10 lg:max-w-7xl px-5'>
            {children}
        </div>
    )
}

export default MainContainer;
