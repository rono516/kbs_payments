import React, { ReactNode } from 'react';
import useInactivityTimer from './useInactivityTimer';

interface InactivityWrapperProps {
  children: ReactNode;
}

const InactivityWrapper: React.FC<InactivityWrapperProps> = ({ children }) => {
  useInactivityTimer(1200000); // 20 minutes in milliseconds
  return <>{children}</>;
};

export default InactivityWrapper;
