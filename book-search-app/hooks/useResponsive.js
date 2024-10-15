import { useMediaQuery } from 'react-responsive';

export const useResponsive = () => {
  const isSmall = useMediaQuery({ maxWidth: 440 });
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });

  return { isSmall, isMobile, isTablet };
};
