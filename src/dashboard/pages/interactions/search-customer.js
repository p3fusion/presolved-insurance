import React, { useEffect, useRef } from 'react'

const SearchCustomer = () => {
    const customerprofiles = useRef(null);
    useEffect(() => {
        if (customerprofiles.current) {
            const connectUrl = "https://p3fusion-qa.my.connect.aws/customerprofiles-v2/"
            //let client = new connect.CustomerProfilesClient(instanceUrl);
            connect.agentApp.initApp("customerprofiles","customerprofiles-container",connectUrl + "",{ style: "width:100%; height:1000px;" });
        }

    }, [])


    return (
        <section >
            <div id="customerprofiles-container" className='customerprofiles-container' ref={customerprofiles} />
        </section>
    )
}

export default SearchCustomer