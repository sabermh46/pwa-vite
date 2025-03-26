import { useEffect, useState } from "react";

const PWAInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault(); // Prevent default banner
      setDeferredPrompt(e); // Store event
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt(); // Show install prompt
      deferredPrompt.userChoice.then((choice) => {
        if (choice.outcome === "accepted") {
          console.log("User accepted PWA install");
        } else {
          console.log("User dismissed PWA install");
        }
        setDeferredPrompt(null); // Reset prompt
      });
    }
  };

  return (
    <button
      id="installBtn"
      onClick={handleInstallClick}
      style={{
        display: deferredPrompt ? "block" : "none",
        background: "blue",
        color: "white",
        padding: "10px",
        borderRadius: "5px",
      }}
    >
      Install App
    </button>
  );
};

export default PWAInstallPrompt;
