import { useState } from 'react';
import Box from '@mui/material/Box';
import { TimelineButtons } from './TimelineButtons';

export default {
  title: 'Component/7. Input & Control/TimelineButtons',
  component: TimelineButtons,
  tags: ['autodocs'],
  argTypes: {
    time: { control: { type: 'range', min: 0, max: 1, step: 0.01 }, description: '현재 시간 값 (0: Day, 1: Night). 가장 가까운 시간대가 활성화됨' },
    size: { control: 'select', options: ['small', 'medium', 'large'], description: '버튼 크기' },
    onChange: { action: 'changed', description: '시간대 선택 핸들러 (time 전달)' },
  },
};

export const Default = {
  args: { time: 0, size: 'medium' },
  render: ({ time: initialTime, ...args }) => {
    const [time, setTime] = useState(initialTime);

    return (
      <Box sx={ { p: 2 } }>
        <TimelineButtons { ...args } time={ time } onChange={ setTime } />
      </Box>
    );
  },
};
