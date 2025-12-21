'use client';

import { useScreenWidth } from '@/hooks/useScreenWidth';
import { TailwindBreakpoints } from '@/lib/css-constants';
import { motion, Variants } from 'motion/react';

interface LogoStrokeFillAnimatedProps {
  delay?: number;
  duration?: number;
}

const LogoStrokeFillAnimated = ({
  delay = 0,
  duration = 2,
}: LogoStrokeFillAnimatedProps) => {
  const {screenWidth} = useScreenWidth();
  const isMobile = screenWidth < TailwindBreakpoints.md;
  const svgWidth = isMobile ? 200 : 300;
  const textAnimationDelay = delay + duration;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const pathVariants: Variants = {
    hidden: { pathLength: 0, strokeOpacity: 0, fillOpacity: 0 },
    visible: {
      x: [300, null, null, 0, null],
      pathLength: [0, null,  1,null, null],
      strokeOpacity: [0, null, 1, null, null],
      fillOpacity: [0, null, null, null, 1],
      transition: {
        duration,
        delay,
        ease: 'easeInOut',
      },
    },
  };

  const textContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: textAnimationDelay,
        staggerChildren: 0.1,
        delayChildren: textAnimationDelay,
      },
    },
  };

  const textLetterVariants: Variants = {
    hidden: { 
      opacity: 0,
      y: 20,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const symbolPaths = [
    'M3.02148 30.3208L55.3506 0H247.176L194.833 30.3208H3.02148Z',
    'M0 160.425V43.5973H186.909V69.1877H20.9048V160.425H0Z',
    'M37.4229 160.418V134.828H165.991V114.789H37.4229V89.1987H186.909V160.418H37.4229Z',
    'M199.491 134.824L238.547 112.187V91.2717L199.491 113.909V43.587L251.834 13.249V37.9594L220.393 56.1656V77.1014L251.834 58.878V129.197L199.491 159.517V134.824Z',
  ];

  const textPaths = [
    'M290.913 145.678H311.489V88.629H338.049V69.9247H311.489V33.4507H345.344V14.7461H290.913V145.678Z', 
    'M342.912 145.678H361.991L365.732 120.053H389.112V119.678L392.853 145.678H413.428L392.105 14.7461H364.235L342.912 145.678ZM368.163 102.283L377.141 37.5659H377.515L386.681 102.283H368.163Z', 
    'M448.592 147.548C468.794 147.548 479.642 135.577 479.642 114.254C479.642 97.9812 474.218 87.5066 457.01 72.3562C443.542 60.5723 439.24 53.6515 439.24 44.1122C439.24 35.1339 442.981 31.5803 449.528 31.5803C456.074 31.5803 459.815 35.1339 459.815 44.4862V51.22H479.268V45.7955C479.268 24.8466 469.355 12.8757 449.341 12.8757C429.327 12.8757 418.665 24.8466 418.665 45.4215C418.665 60.3853 424.277 71.0469 441.485 86.1973C454.952 97.9812 459.067 104.902 459.067 115.751C459.067 125.477 454.952 128.844 448.406 128.844C441.859 128.844 437.744 125.477 437.744 116.125V107.147H418.291V114.628C418.291 135.577 428.392 147.548 448.592 147.548Z', 
    'M506.576 145.678H527.152V33.4507H548.662V14.7461H485.066V33.4507H506.576V145.678Z', 
    'M613.38 147.548C633.581 147.548 644.429 135.577 644.429 114.254C644.429 97.9812 639.005 87.5066 621.796 72.3562C608.329 60.5723 604.028 53.6515 604.028 44.1122C604.028 35.1339 607.769 31.5803 614.315 31.5803C620.862 31.5803 624.603 35.1339 624.603 44.4862V51.22H644.055V45.7955C644.055 24.8466 634.142 12.8757 614.128 12.8757C594.114 12.8757 583.452 24.8466 583.452 45.4215C583.452 60.3853 589.064 71.0469 606.272 86.1973C619.739 97.9812 623.854 104.902 623.854 115.751C623.854 125.477 619.739 128.844 613.193 128.844C606.646 128.844 602.531 125.477 602.531 116.125V107.147H583.078V114.628C583.078 135.577 593.179 147.548 613.38 147.548Z', 
    'M671.364 145.678H691.939V33.4507H713.449V14.7461H649.854V33.4507H671.364V145.678Z', 
    'M722.428 145.678H743.003V89.5643H750.111C759.463 89.5643 763.017 93.4921 763.017 105.65V129.592C763.017 140.254 763.765 142.311 764.887 145.678H785.836C783.779 140.815 783.591 136.139 783.591 129.779V106.773C783.591 91.9958 780.225 82.2695 769.937 79.0897V78.7157C779.103 74.9748 783.405 66.3708 783.405 52.9033V44.8606C783.405 24.6597 774.239 14.7461 752.916 14.7461H722.428V145.678ZM743.003 70.8597V33.4507H752.355C759.65 33.4507 762.83 37.5659 762.83 46.9179V57.0185C762.83 67.4931 758.153 70.8597 750.485 70.8597H743.003Z', 
    'M826.799 147.548C847 147.548 857.474 135.578 857.474 114.628V14.7461H837.648V116.125C837.648 125.477 833.72 128.844 827.173 128.844C820.626 128.844 816.699 125.477 816.699 116.125V14.7461H796.124V114.628C796.124 135.578 806.598 147.548 826.799 147.548Z', 
    'M900.121 147.548C919.948 147.548 930.422 135.577 930.422 115.377V96.8589H910.97V116.873C910.97 125.477 906.854 128.844 900.682 128.844C894.51 128.844 890.394 125.477 890.394 116.873V43.7382C890.394 35.1339 894.51 31.5803 900.682 31.5803C906.854 31.5803 910.97 35.1339 910.97 43.7382V58.8887H930.422V45.0475C930.422 24.8466 919.948 12.8757 900.121 12.8757C880.294 12.8757 869.82 24.8466 869.82 45.0475V115.377C869.82 135.577 880.294 147.548 900.121 147.548Z', 
    'M957.918 145.678H978.493V33.4507H1000V14.7461H936.408V33.4507H957.918V145.678Z', 
  ];

  return (
    <div className='relative flex items-center justify-center'>
      <motion.svg
        width={svgWidth}
        height='161'
        viewBox='0 0 1000 161'
        fill='white'
        strokeWidth={2}
        stroke='white'
        xmlns='http://www.w3.org/2000/svg'
        variants={containerVariants}
        initial='hidden'
        animate='visible'
      >
        {symbolPaths.map((path, index) => (
          <motion.path
            key={`symbol-${index}`}
            d={path}
            variants={pathVariants}
          />
        ))}

        <motion.g
          variants={textContainerVariants}
          initial='hidden'
          animate='visible'
        >
          {textPaths.map((path, index) => (
            <motion.path
              key={`text-${index}`}
              d={path}
              variants={textLetterVariants}
            />
          ))}
        </motion.g>
      </motion.svg>
    </div>
  );
};

export default LogoStrokeFillAnimated;
