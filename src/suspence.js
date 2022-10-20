import React from 'react'
import styled from 'styled-components'
import lazy from './images/suspence.gif'



const Suspence = () => {

    const style={ display: 'flex', flexDirection: 'column',  alignItems:'center', justifyContent:'center' }


    return (
        <div style={{...style, minHeight: '99vh',}}>
            <div  id="loader"  style={{...style, width:900, boxShadow:'#0e2161 1px 2px 33px 0px', borderRadius:10, padding:'10px 20px', fontFamily:'arial'}}>

                <img src={lazy} width={640} />
                <h2>Please wait . . .</h2>
            </div>

        </div>
    )
}

export default Suspence