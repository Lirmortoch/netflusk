import { useState, useEffect } from "react";

export default function useDetectDevice() {
  const [device, setDevice] = useState('');

  useEffect(() => {
    const handleDeviceDetect = () => {
      const userAgent = navigator.userAgent.toLowerCase();

      const isMobile = /iphone|ipod|android|blackberry|windows phone| macintosh/g.test(userAgent);
      const isTablet = /(ipad|tablet|playbook|silk)|(android(?!.*mobile)|macintosh)/g.test(userAgent);

      if (isMobile) {
        setDevice('mobile');
      }
      else if (isTablet) {
        setDevice('tablet');
      }
      else {
        setDevice('desktop');
      }
    }

    handleDeviceDetect();

    window.addEventListener('resize', handleDeviceDetect);
    return () => {
      window.removeEventListener('resize', handleDeviceDetect);
    }
  }, []);

  return device;
}