import { Steps } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import React, { useState } from 'react';
import SelectAccount from './selectAccount';
import ChooseChannel from './chooseChannel';
import ConfigureChannel from './configureChannel';
import ConfigureCases from './configureCases';
import Review from './review';

const { Step } = Steps;





const OnBoardSteps = () => {

  const [state1, setState1] = useState({
    accountType: "",
    selfAccountId: "",
    presolvedAccountName: "",
    presolvedEmailId: "",
  });
  const [state2, setState2] = useState({
    channel: [],
    phoneType: "",
  });
  const [state3, setState3] = useState([]);
  const [state4, setState4] = useState([]);
  const [state5, setState5] = useState([]);


  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);

  };
  const prev = () => {
    setCurrent(current - 1);
    console.log(state1);
    console.log(state2);
  };

  const selectAccount = (values) => {
    setState1(() => ({
      ...state1,
      accountType: values.accountType,
      selfAccountId: values.selfAccountId,
      presolvedAccountName: values.presolvedAccountName,
      presolvedEmailId: values.presolvedEmailId,
    }));
  }

  const chooseChannel = (values) => {
    setState2(() => ({
      ...state2,
      channel: values.channel,
      phoneType: values.phoneType === undefined ? "" : values.phoneType
    }));
  }

  const configureChannel = (values) => {
    console.log(values);
  }

  const steps = [
    {
      title: 'Select Account',
      content: <SelectAccount selectAccount={selectAccount} next={next} />,
    },
    {
      title: 'Choose channel',
      content: <ChooseChannel chooseChannel={chooseChannel} next={next} prev={prev} />,
    },
    {
      title: 'Configure channel',
      content: <ConfigureChannel selectedChannel={state2.channel} configureChannel={configureChannel} next={next} prev={prev} />,
    },
    {
      title: 'Configure cases',
      content: <ConfigureCases />,
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
    </Content>
  );
};
export default OnBoardSteps;