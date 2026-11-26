/* =====================================================
   MY IDENTITY PUTRA v15.1
   COMPLETE INTERACTIVE JAVASCRIPT
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  // ================================================
  // 1. ELEMENT SELECTOR
  // ================================================

  const introScreen = document.getElementById("introScreen");
  const enterButton = document.getElementById("enterButton");
  const mainWebsite = document.getElementById("mainWebsite");

  const menuToggle = document.getElementById("menuToggle");
  const navigation = document.getElementById("navigation");

  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");

  const typingText = document.getElementById("typingText");

  const music = document.getElementById("backgroundMusic");
  const musicPlayButton = document.getElementById("musicPlayButton");
  const musicProgress = document.getElementById("musicProgress");
  const musicCurrentTime = document.getElementById("musicCurrentTime");
  const musicDuration = document.getElementById("musicDuration");
  const musicStatus = document.getElementById("musicStatus");
  const musicVisualizer = document.getElementById("musicVisualizer");

  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");

  const backTop = document.getElementById("backTop");
  const currentYear = document.getElementById("currentYear");

  // ================================================
  // 2. INTRO SCREEN
  // ================================================

  if (enterButton && introScreen && mainWebsite) {
    enterButton.addEventListener("click", () => {
      introScreen.classList.add("hide");
      mainWebsite.classList.add("website-entered");

      document.body.style.overflowX = "hidden";

      setTimeout(() => {
        introScreen.style.display = "none";
      }, 850);
    });
  } else if (mainWebsite) {
    mainWebsite.classList.add("website-entered");
  }

  // ================================================
  // 3. TYPING ANIMATION
  // ================================================

  if (typingText) {
    const words = [
      "Retail Administrator",
      "Programmer",
      "Technology Enthusiast",
      "Future CEO / Owner",
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeEffect() {
      const currentWord = words[wordIndex];

      if (deleting) {
        charIndex--;
      } else {
        charIndex++;
      }

      typingText.textContent = currentWord.substring(0, charIndex);

      let delay = deleting ? 45 : 90;

      if (!deleting && charIndex === currentWord.length) {
        deleting = true;
        delay = 1500;
      } else if (deleting && charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        delay = 450;
      }

      setTimeout(typeEffect, delay);
    }

    typeEffect();
  }

  // ================================================
  // 4. MOBILE NAVIGATION
  // ================================================

  if (menuToggle && navigation) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navigation.classList.toggle("open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navigation.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navigation.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });

    document.addEventListener("click", (event) => {
      if (
        navigation.classList.contains("open") &&
        !navigation.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        navigation.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // ================================================
  // 5. DARK MODE / LIGHT MODE
  // ================================================

  function updateThemeIcon() {
    if (!themeIcon) return;

    const isLight = document.body.classList.contains("light-mode");

    themeIcon.textContent = isLight ? "☾" : "☼";

    if (themeToggle) {
      themeToggle.setAttribute(
        "aria-label",
        isLight ? "Aktifkan dark mode" : "Aktifkan light mode",
      );
    }
  }

  let savedTheme = "dark";

  try {
    savedTheme = localStorage.getItem("putra-theme") || "dark";
  } catch (error) {
    console.warn("Pengaturan tema tidak dapat dibaca.", error);
  }

  if (savedTheme === "light") {
    document.body.classList.add("light-mode");
  }

  updateThemeIcon();

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("light-mode");

      const selectedTheme = document.body.classList.contains("light-mode")
        ? "light"
        : "dark";

      try {
        localStorage.setItem("putra-theme", selectedTheme);
      } catch (error) {
        console.warn("Pengaturan tema tidak dapat disimpan.", error);
      }

      updateThemeIcon();
    });
  }

  // ================================================
  // 6. SCROLL REVEAL ANIMATION
  // ================================================

  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
      },
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("visible");
    });
  }

  // ================================================
  // 7. ACTIVE NAVIGATION ON SCROLL
  // ================================================

  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  function updateActiveNavigation() {
    let currentSection = "home";

    sections.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top;

      if (sectionTop <= 150) {
        currentSection = section.id;
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === "#" + currentSection,
      );
    });
  }

  // ================================================
  // 8. BACK TO TOP
  // ================================================

  function handleScroll() {
    const scrollPosition = window.scrollY;

    if (backTop) {
      backTop.classList.toggle("show", scrollPosition > 400);
    }

    updateActiveNavigation();
  }

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  if (backTop) {
    backTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // ================================================
  // 9. MUSIC PLAYER
  // ================================================

  function formatTime(seconds) {
    if (!Number.isFinite(seconds)) return "0:00";

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    return minutes + ":" + String(remainingSeconds).padStart(2, "0");
  }

  function updateMusicDisplay() {
    if (!music) return;

    if (musicCurrentTime) {
      musicCurrentTime.textContent = formatTime(music.currentTime);
    }

    if (musicDuration) {
      musicDuration.textContent = formatTime(music.duration);
    }

    if (
      musicProgress &&
      Number.isFinite(music.duration) &&
      music.duration > 0
    ) {
      musicProgress.value = (music.currentTime / music.duration) * 100;
    }
  }

  function updateMusicButton() {
    if (!music || !musicPlayButton) return;

    const isPlaying = !music.paused;

    musicPlayButton.textContent = isPlaying ? "Ⅱ" : "▶";

    musicPlayButton.setAttribute(
      "aria-label",
      isPlaying ? "Jeda musik" : "Putar musik",
    );

    if (musicVisualizer) {
      musicVisualizer.classList.toggle("playing", isPlaying);
    }

    if (musicStatus) {
      musicStatus.textContent = isPlaying ? "NOW PLAYING" : "PAUSED";
    }
  }

  if (music && musicPlayButton) {
    musicPlayButton.addEventListener("click", async () => {
      if (music.paused) {
        try {
          await music.play();
        } catch (error) {
          if (musicStatus) {
            musicStatus.textContent = "FILE MUSIK TIDAK DAPAT DIPUTAR";
          }

          console.error("Gagal memutar musik:", error);
        }
      } else {
        music.pause();
      }

      updateMusicButton();
    });

    music.addEventListener("play", updateMusicButton);
    music.addEventListener("pause", updateMusicButton);
    music.addEventListener("ended", updateMusicButton);

    music.addEventListener("loadedmetadata", updateMusicDisplay);
    music.addEventListener("timeupdate", updateMusicDisplay);
    music.addEventListener("durationchange", updateMusicDisplay);

    music.addEventListener("error", () => {
      if (musicStatus) {
        musicStatus.textContent = "MUSIC FILE NOT FOUND";
      }
    });
  }

  if (musicProgress && music) {
    musicProgress.addEventListener("input", () => {
      if (Number.isFinite(music.duration) && music.duration > 0) {
        music.currentTime =
          (Number(musicProgress.value) / 100) * music.duration;
      }
    });
  }

  // ================================================
  // 10. WHATSAPP CONTACT FORM
  // ================================================

  // GANTI DENGAN NOMOR WHATSAPP KAMU.
  // Format: kode negara + nomor, tanpa tanda +, spasi, atau strip.
  // Contoh format Indonesia: 628xxxxxxxxxx
  const WHATSAPP_NUMBER = "6285167783391";

  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const name = document.getElementById("contactName")?.value.trim();
      const email = document.getElementById("contactEmail")?.value.trim();
      const subject = document.getElementById("contactSubject")?.value.trim();
      const message = document.getElementById("contactMessage")?.value.trim();

      if (!name || !email || !subject || !message) {
        if (formStatus) {
          formStatus.textContent = "Mohon lengkapi semua kolom formulir.";
        }
        return;
      }

      if (WHATSAPP_NUMBER === "GANTI_DENGAN_NOMOR_WA") {
        if (formStatus) {
          formStatus.textContent =
            "Nomor WhatsApp belum diatur. Silakan ganti nomor di script.js terlebih dahulu.";
        }
        return;
      }

      const whatsappMessage =
        "Halo Risky Putra!\n\n" +
        "Saya ingin menghubungi kamu melalui website MY IDENTITY PUTRA.\n\n" +
        "Nama: " +
        name +
        "\n" +
        "Email: " +
        email +
        "\n" +
        "Subject: " +
        subject +
        "\n\n" +
        "Pesan:\n" +
        message;

      const whatsappURL =
        "https://wa.me/" +
        WHATSAPP_NUMBER +
        "?text=" +
        encodeURIComponent(whatsappMessage);

      if (formStatus) {
        formStatus.textContent =
          "Membuka WhatsApp. Periksa kembali pesan sebelum mengirim.";
      }

      window.open(whatsappURL, "_blank", "noopener,noreferrer");
    });
  }

  // ================================================
  // 11. CURRENT YEAR
  // ================================================

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  // ================================================
  // 12. WEBSITE INITIALIZATION
  // ================================================

  console.log("--------------------------------");
  console.log("MY IDENTITY PUTRA v15.1");
  console.log("JavaScript berhasil dijalankan.");
  console.log("Theme:", savedTheme);
  console.log("Interactive features initialized.");
  console.log("--------------------------------");
});
