const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");

        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
  },
);

document.querySelectorAll(".reveal").forEach((section) => {
  observer.observe(section);
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      const headerOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  });
});

// --- 1. СЛАЙДЕР В СЕКЦИИ TESTIMONIAL
const testimonialTrack = document.querySelector(".testimonial-track");
const testimonialNext = document.querySelector(".testimonial .next");
const testimonialPrev = document.querySelector(".testimonial .prev");

let testimonialIndex = 0;

if (testimonialTrack && testimonialNext && testimonialPrev) {
  testimonialNext.addEventListener("click", (e) => {
    e.preventDefault();
    if (testimonialIndex < testimonialTrack.children.length - 1) {
      testimonialIndex++;
      testimonialTrack.style.transform = `translateX(-${testimonialIndex * 100}%)`;
    }
  });

  testimonialPrev.addEventListener("click", (e) => {
    e.preventDefault();
    if (testimonialIndex > 0) {
      testimonialIndex--;
      testimonialTrack.style.transform = `translateX(-${testimonialIndex * 100}%)`;
    }
  });
}

// --- 2. СЛАЙДЕР В СЕКЦИИ REVIEW
const reviewTrack = document.getElementById("sliderTrack");
const reviewNext = document.getElementById("nextBtn");
const reviewPrev = document.getElementById("prevBtn");

let currentReviewSlide = 0;
const reviewCardWidth = 530;

function updateReviewButtons() {
  if (!reviewTrack || !reviewNext || !reviewPrev) return;

  const maxSlides = reviewTrack.children.length - 1;

  if (currentReviewSlide === 0) {
    reviewPrev.classList.add("disabled");
  } else {
    reviewPrev.classList.remove("disabled");
  }

  if (currentReviewSlide >= maxSlides) {
    reviewNext.classList.add("disabled");
  } else {
    reviewNext.classList.remove("disabled");
  }
}

updateReviewButtons();

if (reviewTrack && reviewNext && reviewPrev) {
  reviewNext.addEventListener("click", (e) => {
    e.preventDefault();
    const maxSlides = reviewTrack.children.length - 1;
    if (currentReviewSlide < maxSlides) {
      currentReviewSlide++;
      reviewTrack.style.transform = `translateX(-${currentReviewSlide * reviewCardWidth}px)`;
      updateReviewButtons();
    }
  });

  reviewPrev.addEventListener("click", (e) => {
    e.preventDefault();
    if (currentReviewSlide > 0) {
      currentReviewSlide--;
      reviewTrack.style.transform = `translateX(-${currentReviewSlide * reviewCardWidth}px)`;
      updateReviewButtons();
    }
  });
}
