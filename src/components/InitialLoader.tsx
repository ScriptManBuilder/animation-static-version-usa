import React from 'react';
import {
  LoaderContainer,
  LoaderContent,
  Logo,
  Tagline,
  SpinnerContainer,
  Spinner,
  ProgressSection,
  ProgressBarContainer,
  ProgressBar,
  ProgressText,
  LoadingText
} from '../styles/components/InitialLoaderStyles';

interface InitialLoaderProps {
  progress: number;
}

const InitialLoader: React.FC<InitialLoaderProps> = ({ progress }) => {
  const isComplete = progress >= 100;

  // Dynamic loading messages based on progress
  const getLoadingMessage = () => {
    if (progress < 20) return 'Initializing animation platform...';
    if (progress < 40) return 'Loading educational materials and resources...';
    if (progress < 60) return 'Preparing interactive environment...';
    if (progress < 80) return 'Setting up personalized interface...';
    if (progress < 95) return 'Loading video content...';
    return 'Almost ready to start animation learning...';
  };

  return (
    <LoaderContainer $isComplete={isComplete}>
      <LoaderContent>
        <Logo>ANIMATION STUDIO</Logo>
        <Tagline>Master Creative Excellence</Tagline>
        
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
        
        <ProgressSection>
          <ProgressBarContainer>
            <ProgressBar $progress={progress} />
          </ProgressBarContainer>
          <ProgressText>{Math.round(progress)}%</ProgressText>
        </ProgressSection>
        
        <LoadingText>
          {getLoadingMessage()}
        </LoadingText>
      </LoaderContent>
    </LoaderContainer>
  );
};

export default InitialLoader;