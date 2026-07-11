import { useState, useEffect } from "react";

const useAnimation = (showComponent) => {
  const [mounted, setMounted] = useState(showComponent);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (showComponent) {
      setMounted(true);
      return;
    }

    const timer = setTimeout(() => setMounted(false), 155);
    return () => clearTimeout(timer);
  }, [showComponent]);

  useEffect(() => {
    if (showComponent && mounted) {
      const raf = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(raf);
    } else {
      setVisible(false);
    }
  }, [showComponent, mounted]);

  return {
    mounted, 
    visible,
  }
}

export default useAnimation;