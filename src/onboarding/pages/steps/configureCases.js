import React from 'react';
import CreateNewTemplate from '../../../agent_app/dashboard/task_builder/newTemplate';

const ConfigureChannel = () => {


    return (
        <div>
            <CreateNewTemplate location={{
                
                    "state": {
                        id: null,
                        edit: false,
                        record: {}
                    }
                
            }
            } />
        </div>
    );
};

export default ConfigureChannel;