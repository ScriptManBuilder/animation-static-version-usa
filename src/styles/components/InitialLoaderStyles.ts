import styled, { keyframes, css } from 'styled-components';

// Анимации
const spinAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const fadeInAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const progressAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const pulseAnimation = keyframes`
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.8;
  }
`;

// Основной контейнер лоадера
export const LoaderContainer = styled.div<{ $isComplete: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  transition: opacity 0.8s ease-out, visibility 0.8s ease-out;
  
  ${props => props.$isComplete && css`
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
  `}

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.1) 0%, transparent 50%);
    animation: ${pulseAnimation} 4s ease-in-out infinite;
  }
`;

// Контент лоадера
export const LoaderContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  z-index: 1;
  animation: ${fadeInAnimation} 1s ease-out;
  max-width: 500px;
  padding: 0 20px;
`;

// Логотип
export const Logo = styled.h1`
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 700;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4);
  background-size: 300% 300%;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${progressAnimation} 3s ease-in-out infinite;
  margin-bottom: 10px;
  letter-spacing: 2px;
  text-transform: uppercase;
`;

// Слоган
export const Tagline = styled.p`
  font-size: clamp(0.9rem, 2vw, 1.2rem);
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 40px;
  font-weight: 300;
  letter-spacing: 1px;
  animation: ${fadeInAnimation} 1s ease-out 0.3s both;
`;

// Контейнер спиннера
export const SpinnerContainer = styled.div`
  margin-bottom: 40px;
  animation: ${fadeInAnimation} 1s ease-out 0.6s both;
`;

// Спиннер
export const Spinner = styled.div`
  width: 60px;
  height: 60px;
  border: 3px solid rgba(255, 255, 255, 0.1);
  border-top: 3px solid #4ecdc4;
  border-radius: 50%;
  animation: ${spinAnimation} 1s linear infinite;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 30px;
    height: 30px;
    margin: -15px 0 0 -15px;
    border: 2px solid rgba(255, 255, 255, 0.1);
    border-top: 2px solid #ff6b6b;
    border-radius: 50%;
    animation: ${spinAnimation} 0.7s linear infinite reverse;
  }
`;

// Секция прогресса
export const ProgressSection = styled.div`
  width: 100%;
  max-width: 300px;
  margin-bottom: 30px;
  animation: ${fadeInAnimation} 1s ease-out 0.9s both;
`;

// Контейнер прогресс-бара
export const ProgressBarContainer = styled.div`
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 10px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    animation: ${progressAnimation} 2s ease-in-out infinite;
  }
`;

// Прогресс-бар
export const ProgressBar = styled.div<{ $progress: number }>`
  height: 100%;
  background: linear-gradient(90deg, #ff6b6b, #4ecdc4, #45b7d1);
  background-size: 200% 100%;
  animation: ${progressAnimation} 3s ease-in-out infinite;
  border-radius: 4px;
  transition: width 0.3s ease-out;
  width: ${props => props.$progress}%;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 20px;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4));
    border-radius: 0 4px 4px 0;
  }
`;

// Текст прогресса
export const ProgressText = styled.span`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
  font-weight: 600;
  display: block;
  text-align: center;
`;

// Текст загрузки
export const LoadingText = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: clamp(0.8rem, 1.5vw, 1rem);
  line-height: 1.5;
  margin: 0;
  min-height: 1.5em;
  animation: ${fadeInAnimation} 1s ease-out 1.2s both;
  font-weight: 400;
  text-align: center;
`;

// Медиа-запросы для мобильных устройств
export const MobileStyles = css`
  @media (max-width: 768px) {
    ${LoaderContent} {
      padding: 0 15px;
    }

    ${Logo} {
      font-size: 2.5rem;
      margin-bottom: 8px;
    }

    ${Tagline} {
      font-size: 1rem;
      margin-bottom: 30px;
    }

    ${Spinner} {
      width: 50px;
      height: 50px;

      &::before {
        width: 25px;
        height: 25px;
        margin: -12.5px 0 0 -12.5px;
      }
    }

    ${SpinnerContainer} {
      margin-bottom: 30px;
    }

    ${ProgressSection} {
      max-width: 250px;
      margin-bottom: 25px;
    }

    ${ProgressBarContainer} {
      height: 6px;
    }

    ${LoadingText} {
      font-size: 0.9rem;
    }
  }

  @media (max-width: 480px) {
    ${Logo} {
      font-size: 2rem;
    }

    ${Tagline} {
      font-size: 0.9rem;
    }

    ${ProgressSection} {
      max-width: 200px;
    }
  }
`;