import { Button, message, Steps } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import React, { useState } from 'react';
import SelectAccount from './selectAccount';
import ChooseChannel from './chooseChannel';
import OnBoardStep3Content from './configureChannel';
import ConfigureChannel from './configureCases';
import Review from './review';

const { Step } = Steps;





const OnBoardSteps = () => {

  const [state1, setState1] = useState();
  const [state2, setState2] = useState();
  const [state3, setState3] = useState();
  const [state4, setState4] = useState();
  const [state5, setState5] = useState();


  const [current, setCurrent] = useState(0);

  const next = () => {
    console.log("next")
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };

  const selectAccount=(value)=>{
    console.log(value);
  }

  const steps = [
    {
      title: 'Select Account',
      content: <SelectAccount selectAccount={selectAccount} next={next} />,
    },
    {
      title: 'Choose channel',
      content: <ChooseChannel />,
    },
    {
      title: 'Configure channel',
      content: <OnBoardStep3Content />,
    },
    {
      title: 'Configure cases',
      content: <ConfigureChannel />,
    },
    {
      title: 'Review',
      content: <Review />,
    },
  ];


  return (
    <Content className='Steps' style={{ margin: '15px 15px 10px 10px' }}>
      <Steps current={current}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content" style={{ margin: '50px 3px 50px 3px' }}>{steps[current].content}</div>
      {/* <div className="steps-action">
        {current < steps.length - 1 && (
          <Button type="primary">
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={() => message.success('Processing complete!')}>
            Done
          </Button>
        )}
        {current > 0 && (
          <Button
            style={{
              margin: '0 8px',
            }}
            onClick={() => prev()}
          >
            Previous
          </Button>
        )}
      </div> */}
    </Content>
  );
};
export default OnBoardSteps;