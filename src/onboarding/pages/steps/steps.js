import { Button, message, Steps } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import React, { useState } from 'react';
import OnBoardStep1Content from './onboardStep1Content';
import OnBoardStep2Content from './onboardStep2Content';
import OnBoardStep3Content from './onboardStep3Content';
import OnBoardStep4Content from './onboardStep4Content';
import OnBoardStep5Content from './onboardStep5Content';

const { Step } = Steps;

const steps = [
  {
    title: 'Step1',
    content: <OnBoardStep1Content/>,
  },
  {
    title: 'Step2',
    content: <OnBoardStep2Content/>,
  },
  {
    title: 'Step3',
    content: <OnBoardStep3Content/>,
  },
  {
    title: 'Step4',
    content: <OnBoardStep4Content/>,
  },
  {
    title: 'Step5',
    content: <OnBoardStep5Content/>,
  },
];


const OnBoardSteps = () => {

  const [current, setCurrent] = useState(0);
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };

  return (
    <Content className= 'Steps' style={{margin:'15px 15px 10px 10px'}}>
      <Steps current={current}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content" style={{margin:'50px 3px 50px 3px', background:'#ececec'}}>{steps[current].content}</div>
      <div className="steps-action">
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
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
      </div>
    </Content>
  );
};
export default OnBoardSteps;