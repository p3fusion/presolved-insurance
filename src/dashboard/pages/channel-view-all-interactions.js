import React from "react";
import ChannelTypeTable from "../pages/indexpage/channelType-table";
import { PageHeader } from "antd";


const ChannelViewAll = () => {

    return (
        <section className='dashboard-index-page' style={{ padding: '10px 20px' }}>
            
            <PageHeader
                ghost={false}
                className='generic-page-header'
                onBack={() => window.history.back()}
                title="Channel Details"
            />
         
            <ChannelTypeTable  />

        </section>
    );
}

export default ChannelViewAll;