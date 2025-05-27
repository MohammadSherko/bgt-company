document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded");

  // INTRO
  const intro = document.getElementById("intro");
  if (intro) {
    setTimeout(() => {
      intro.style.display = "none";
    }, 3000);
  }

  // Debounce helper
  function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function () {
      const context = this,
        args = arguments;
      const later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  // Scroll Animations
  const animatedElements = document.querySelectorAll(
    ".fade-slide-up, .fade-in-up, .fade-in-left, .zoom-in"
  );

  function onScrollFadeIn() {
    animatedElements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        el.classList.add("visible");
      }
    });
  }

  window.addEventListener("scroll", debounce(onScrollFadeIn, 50));
  window.addEventListener("load", onScrollFadeIn);
  onScrollFadeIn();

  // Mobile Menu Toggle
  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      const expanded = menuBtn.getAttribute("aria-expanded") === "true";
      menuBtn.setAttribute("aria-expanded", (!expanded).toString());
      mobileMenu.classList.toggle("hidden");
    });
  }

  // Dropdown Menu
  const dropdownButton = document.getElementById("dropdown-button");
  const dropdownMenu = document.getElementById("dropdown-menu");
  if (dropdownButton && dropdownMenu) {
    dropdownButton.addEventListener("click", () => {
      const isExpanded =
        dropdownButton.getAttribute("aria-expanded") === "true";
      dropdownButton.setAttribute("aria-expanded", (!isExpanded).toString());
      dropdownMenu.classList.toggle("show");
    });

    document.addEventListener("click", (e) => {
      if (
        !dropdownButton.contains(e.target) &&
        !dropdownMenu.contains(e.target)
      ) {
        dropdownMenu.classList.remove("show");
        dropdownButton.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Close Mobile Menu on Link Click
  if (mobileMenu) {
    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
        if (menuBtn) menuBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Animate Counter
  function animateCounter(el) {
    const target = +el.getAttribute("data-target");
    const duration = 2000;
    const start = 1;
    let startTimestamp = null;

    function step(timestamp) {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = timestamp - startTimestamp;
      const current = Math.min(
        Math.floor((progress / duration) * (target - start) + start),
        target
      );
      el.textContent = current;
      if (progress < duration) {
        window.requestAnimationFrame(step);
      } else {
        el.textContent = target + "+";
      }
    }

    window.requestAnimationFrame(step);
  }

  function setupCounters() {
    const counters = document.querySelectorAll(".counter");
    let triggered = false;

    function onScrollCounters() {
      const section = document.querySelector("#about-us");
      if (!section) return;

      const sectionTop = section.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (!triggered && sectionTop < windowHeight) {
        counters.forEach((counter) => animateCounter(counter));
        triggered = true;
        window.removeEventListener("scroll", onScrollCounters);
      }
    }

    window.addEventListener("scroll", debounce(onScrollCounters, 50));
    onScrollCounters();
  }

  setupCounters();

  // Sticky Header
  const header = document.querySelector("header");
  if (header) {
    window.addEventListener(
      "scroll",
      debounce(() => {
        if (window.scrollY > 50) {
          header.classList.add("sticky");
        } else {
          header.classList.remove("sticky");
        }
      }, 50)
    );
  }

  // Slideshow in #slideshow
  const slideshow = document.getElementById("slideshow");
  if (slideshow) {
    const imageCount = 30;
    for (let i = 1; i <= imageCount; i++) {
      const img = document.createElement("img");
      img.src = `images/img${i}.jpg`;
      Object.assign(img.style, {
        opacity: 0,
        transition: "opacity 1s ease-in-out",
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
      });
      slideshow.appendChild(img);
    }

    const images = slideshow.querySelectorAll("img");
    let current = 0;
    if (images.length > 0) images[0].style.opacity = 1;

    setInterval(() => {
      images[current].style.opacity = 0;
      current = (current + 1) % images.length;
      images[current].style.opacity = 1;
    }, 3000);
  }

  // ========== OUR BRANDS SECTION ==========

  const products = [
    { name: "Tropia" },
    { name: "Landessa" },
    { name: "Bomba" },
    { name: "Clight" },
    { name: "Jacker" },
  ];

  const allImages = [
    "Zedazeni.png.png",
    "vitamilk.png.png",
    "Valor.png.png",
    "twist.png.png",
    "tropia.png.png",
    "topjuic.png.jpg",
    "topjuic.png.jpg",
    "top juice 1.png.jpg",
    "top coco.png.png",
    "STDalfour.png.png",
    "shrilalmahal.png.webp",
    "Pfanner.png.png",
    "oriental.png.png",
    "Nom.png.png",
    "natural.png.png",
    "Maharani.logo.png",
    "landessa.png.png",
    "kex.png.png",
    "jumex.png.png",
    "hello.png.png",
    "hellenergy.png.png",
    "happyvibes.png.png",
    "Fontana.png.png",
    "florbu.png.png",
    "Crisup.png.webp",
  ];

  function shuffleArray(arr) {
    let array = arr.slice();
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const productsSection = document.getElementById("products");
  if (productsSection) {
    productsSection.innerHTML = ""; // clear container

    const shuffledImages = shuffleArray(allImages);
    const imagesPerCircle = 5;

    products.forEach((product, index) => {
      const productDiv = document.createElement("div");
      productDiv.className = "product-slide";

      const imgContainer = document.createElement("div");
      imgContainer.className = "img-container";

      const startIdx = index * imagesPerCircle;
      const circleImages = shuffledImages.slice(
        startIdx,
        startIdx + imagesPerCircle
      );

      circleImages.forEach((imgSrc, i) => {
        const img = document.createElement("img");
        img.src = `logos/${imgSrc}`;
        img.alt = product.name;
        img.style.opacity = i === 0 ? "1" : "0";
        img.style.position = "absolute";
        img.style.top = "0";
        img.style.left = "0";
        img.style.width = "100%";
        img.style.height = "100%";
        img.style.objectFit = "cover";
        img.style.borderRadius = "50%";
        img.style.transition = "opacity 1s ease-in-out";
        imgContainer.appendChild(img);
      });

      productDiv.appendChild(imgContainer);
      productsSection.appendChild(productDiv);

      // Slideshow per circle
      const imgs = imgContainer.querySelectorAll("img");
      let current = 0;
      setInterval(() => {
        imgs[current].style.opacity = "0";
        current = (current + 1) % imgs.length;
        imgs[current].style.opacity = "1";
      }, 3000);
    });
  }
});



