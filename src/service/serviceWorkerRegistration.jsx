// src/utils/serviceWorkerRegistration.js
const isLocalhost = Boolean(
  window.location.hostname === "localhost" ||
    window.location.hostname === "[::1]" ||
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

export function register(config) {
  if ("serviceWorker" in navigator) {
    const publicUrl = new URL(
      import.meta.env.BASE_URL || "",
      window.location.href
    );

    if (publicUrl.origin !== window.location.origin) {
      return;
    }

    window.addEventListener("load", () => {
      const swUrl = `${import.meta.env.BASE_URL}sw.js`;

      if (isLocalhost) {
        checkValidServiceWorker(swUrl, config);
        navigator.serviceWorker.ready.then(() => {
          console.log(
            "This web app is being served cache-first by a service " +
              "worker. To learn more, visit https://cra.link/PWA"
          );
        });
      } else {
        registerValidSW(swUrl, config);
      }
    });
  }
}

function registerValidSW(swUrl, config) {
  navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {
      console.log("SW registered: ", registration);

      registration.onupdatefound = () => {
        const installingWorker = registration.installing;

        if (installingWorker == null) {
          return;
        }

        installingWorker.onstatechange = () => {
          if (installingWorker.state === "installed") {
            if (navigator.serviceWorker.controller) {
              console.log(
                "New content is available and will be used when all " +
                  "tabs for this page are closed. See https://cra.link/PWA."
              );

              if (config && config.onUpdate) {
                config.onUpdate(registration);
              }
            } else {
              console.log("Content is cached for offline use.");

              if (config && config.onSuccess) {
                config.onSuccess(registration);
              }
            }
          }
        };
      };
    })
    .catch((error) => {
      console.error("Error during service worker registration:", error);
    });
}

function checkValidServiceWorker(swUrl, config) {
  fetch(swUrl, {
    headers: { "Service-Worker": "script" },
  })
    .then((response) => {
      const contentType = response.headers.get("content-type");

      if (
        response.status === 404 ||
        (contentType != null && contentType.indexOf("javascript") === -1)
      ) {
        navigator.serviceWorker.ready.then((registration) => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      console.log(
        "No internet connection found. App is running in offline mode."
      );
    });
}

export function unregister() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister();
      })
      .catch((error) => {
        console.error(error.message);
      });
  }
}

// PWA Install prompt
export function setupPWAInstallPrompt() {
  let deferredPrompt;

  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;

    // Show install button or banner
    showInstallPromotion();
  });

  function showInstallPromotion() {
    const installBanner = document.createElement("div");
    installBanner.id = "install-banner";
    
    const bannerContainer = document.createElement("div");
    Object.assign(bannerContainer.style, {
      position: "fixed",
      bottom: "20px",
      right: "20px",
      background: "#667eea",
      color: "white",
      padding: "16px 20px",
      borderRadius: "8px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      zIndex: "1000",
      maxWidth: "300px",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif"
    });

    const titleDiv = document.createElement("div");
    Object.assign(titleDiv.style, { marginBottom: "8px", fontWeight: "600" });
    titleDiv.textContent = "📱 Install Portfolio App";

    const descDiv = document.createElement("div");
    Object.assign(descDiv.style, { fontSize: "14px", marginBottom: "12px", opacity: "0.9" });
    descDiv.textContent = "Get quick access to my portfolio on your home screen";

    const btnContainer = document.createElement("div");
    
    const installBtn = document.createElement("button");
    installBtn.id = "install-btn";
    Object.assign(installBtn.style, {
      background: "white",
      color: "#667eea",
      border: "none",
      padding: "8px 16px",
      borderRadius: "4px",
      fontWeight: "600",
      cursor: "pointer",
      marginRight: "8px"
    });
    installBtn.textContent = "Install";

    const dismissBtn = document.createElement("button");
    dismissBtn.id = "dismiss-btn";
    Object.assign(dismissBtn.style, {
      background: "transparent",
      color: "white",
      border: "1px solid rgba(255,255,255,0.3)",
      padding: "8px 16px",
      borderRadius: "4px",
      cursor: "pointer"
    });
    dismissBtn.textContent = "Not now";

    btnContainer.appendChild(installBtn);
    btnContainer.appendChild(dismissBtn);

    bannerContainer.appendChild(titleDiv);
    bannerContainer.appendChild(descDiv);
    bannerContainer.appendChild(btnContainer);

    installBanner.appendChild(bannerContainer);

    document.body.appendChild(installBanner);

    document
      .getElementById("install-btn")
      ?.addEventListener("click", async () => {
        if (deferredPrompt) {
          deferredPrompt.prompt();
          const { outcome } = await deferredPrompt.userChoice;
          console.log(`PWA install outcome: ${outcome}`);
          deferredPrompt = null;
          installBanner.remove();
        }
      });

    document.getElementById("dismiss-btn")?.addEventListener("click", () => {
      installBanner.remove();
    });
  }

  window.addEventListener("appinstalled", () => {
    console.log("PWA was installed successfully");
    // Track installation in analytics
    if (typeof window.gtag !== "undefined") {
      window.gtag("event", "pwa_install", {
        event_category: "PWA",
        event_label: "Portfolio App Installed",
      });
    }
  });
}
