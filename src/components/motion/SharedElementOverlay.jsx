import Box from '@mui/material/Box';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useTheme } from '@mui/material/styles';
import { TimeBlendImage } from '../media/TimeBlendImage';
import { useTimeline } from '../dynamic-color/useTimeline';

/** 사용자가 모션 축소를 설정했는지 */
const prefersReducedMotion = () => typeof window !== 'undefined'
  && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/** DOMRect를 fixed 레이어용 좌표로 변환 */
const toBox = ({ top, left, width, height }) => ({ top, left, width, height });

/**
 * SharedElementOverlay 컴포넌트
 *
 * 화면 전체 위에 떠 있는 전환 레이어. 출발지 이미지와 같은 모습의 클론이 출발 좌표에서 도착 좌표로 이동한다.
 * 도착 좌표(to)가 아직 없으면 출발 좌표에 정지해 기다린다. 이동은 duration.slowest(1.2초) · easing.smooth.
 *
 * Props:
 * @param {object} transition - { key, images, from, to } 현재 전환 [Required]
 * @param {function} onComplete - 이동이 끝났을 때 호출 [Required]
 *
 * Example usage:
 * <SharedElementOverlay transition={ transition } onComplete={ end } />
 */
export function SharedElementOverlay({ transition, onComplete }) {
  const theme = useTheme();
  const { time } = useTimeline();
  const { images, from, to } = transition;
  const duration = prefersReducedMotion() ? 0 : theme.transitions.duration.slowest / 1000;

  return (
    <Box sx={ { position: 'fixed', inset: 0, zIndex: theme.zIndex.appBar + 1, pointerEvents: 'none' } }>
      <motion.div
        initial={ toBox(from) }
        animate={ toBox(to || from) }
        transition={ { duration, ease: [0.37, 0, 0.63, 1] } }
        onAnimationComplete={ () => { if (to) onComplete(); } }
        style={ { position: 'absolute', overflow: 'hidden', backgroundColor: theme.palette.background.default } }
      >
        <TimeBlendImage images={ images } time={ time } fit="contain" sx={ { height: '100%' } } />
      </motion.div>
    </Box>
  );
}
