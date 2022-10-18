import { Checkbox,  Radio, Card } from 'antd';
import React, { useState } from 'react';


const CheckboxGroup = Checkbox.Group;
const plainOptions = ['Phone', 'Chat', 'Email'];
const defaultCheckedList = ['Phone'];

const OnBoardStep2Content = () => {

    const [value, setValue] = useState(1);
    const [checkedList, setCheckedList] = useState(defaultCheckedList);
    const [isSelectPhone, setIsSelectPhone] = useState(true);

    const onChange = (list) => {
        setCheckedList(list);
       
        if (list.some(val => (val === 'Phone'))) {
            setIsSelectPhone(true);
        }
        else {
            setIsSelectPhone(false);
        }
    };

    const options = [
        { label: 'Inbound', value: 'inbound' },
        { label: 'Outbound', value: 'outbound' }
    ];

    const onChangeRadio = (e) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    }

    return (
        <Card
            title="Channel selection"
            bordered={true}
            style={{
                width: '100%',
                height: '100%',
            }}
        >

            <div>
                <CheckboxGroup options={plainOptions} value={checkedList} onChange={onChange} style={{display:'flex', flexDirection:'column'}} />
            </div>
            <div style={{ marginTop: '20px' }}>
                { isSelectPhone && <h5>Select phone type</h5> }
                { isSelectPhone && <Radio.Group onChange={onChangeRadio} value={value} optionType='button' options={options}/> }
            </div>
        </Card>
    );
};

export default OnBoardStep2Content;