import { css } from 'glamor';
import glamorous from "glamorous";

// Define the animation styles
const animationStyles = props => {
  const WobbleBottom = css.keyframes({
    '0%': '',
    '100%': {
      transform: `translateX(0%)`,
      transformOrigin: `20% 20%`,
    },
    '15%': {
      transform: `translateX(-10px) rotate(-6deg)`,
    },
    '30%': {
      transform: `translateX(5px) rotate(6deg)`,
    },
    '45%': {
      transform: `translateX(-5px) rotate(-3.6deg)`,
    },
    '60%': {
      transform: `translateX(3px) rotate(2.4deg)`,
    },
    '75%': {
      transform: `translateX(-2px) rotate(-1.2deg)`,
    },  
  })
  let animationHover;
  if (props.isHover) animationHover = `${WobbleBottom} 0.4s both`;
  return { animation:  animationHover}
}


// Define the element 
const AnimatedDiv = glamorous.div(animationStyles)

export default AnimatedDiv 
// animation: wobble-hor-bottom 0.4s both;

// @keyframes wobble-hor-bottom {
//   0%,
//   100% {
//     transform: translateX(0%);
//     transform-origin: 20% 20%;
//   }
//   15% {
//     transform: translateX(-10px) rotate(-6deg);
//   }
//   30% {
//     transform: translateX(5px) rotate(6deg);
//   }
//   45% {
//     transform: translateX(-5px) rotate(-3.6deg);
//   }
//   60% {
//     transform: translateX(3px) rotate(2.4deg);
//   }
//   75% {
//     transform: translateX(-2px) rotate(-1.2deg);
//   }
// }
