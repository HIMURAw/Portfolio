import gsap from "gsap";

export function setPortreTimeline() {
  if (window.innerWidth > 1024) {
    const tl1 = gsap.timeline({
      scrollTrigger: { trigger: ".landing-section", start: "top top", end: "bottom top", scrub: true, invalidateOnRefresh: true },
    });
    const tl2 = gsap.timeline({
      scrollTrigger: { trigger: ".about-section", start: "center 55%", end: "bottom top", scrub: true, invalidateOnRefresh: true },
    });
    const tl3 = gsap.timeline({
      scrollTrigger: { trigger: ".whatIDO", start: "top top", end: "bottom top", scrub: true, invalidateOnRefresh: true },
    });
    tl1
      .fromTo(".character-model", { x: 0 }, { x: "-25%", duration: 1 }, 0)
      .to(".landing-container", { opacity: 0, duration: 0.4 }, 0)
      .to(".landing-container", { y: "40%", duration: 0.8 }, 0)
      .fromTo(".about-me", { y: "-50%" }, { y: "0%" }, 0);
    tl2
      .to(".about-section", { y: "30%", duration: 6 }, 0)
      .to(".about-section", { opacity: 0, delay: 3, duration: 2 }, 0)
      .fromTo(".character-model", { pointerEvents: "inherit" }, { pointerEvents: "none", x: "-12%", delay: 2, duration: 5 }, 0)
      .fromTo(".portre-sahne", { scale: 1 }, { scale: 0.85, delay: 2, duration: 5 }, 0)
      .fromTo(".what-box-in", { display: "none" }, { display: "flex", duration: 0.1, delay: 6 }, 0)
      .fromTo(".character-rim", { opacity: 1, scaleX: 1.4 }, { opacity: 0, scale: 0, y: "-70%", duration: 5, delay: 2 }, 0.3);
    tl3
      .fromTo(".character-model", { y: "0%" }, { y: "-100%", duration: 4, ease: "none", delay: 1 }, 0)
      .fromTo(".whatIDO", { y: 0 }, { y: "15%", duration: 2 }, 0);
  } else {
    gsap.timeline({
      scrollTrigger: { trigger: ".what-box-in", start: "top 70%", end: "bottom top" },
    }).to(".what-box-in", { display: "flex", duration: 0.1, delay: 0 }, 0);
  }
}

export function setAllTimeline() {
  const careerTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".career-section",
      start: "top 30%",
      end: "100% center",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });
  careerTimeline
    .fromTo(
      ".career-timeline",
      { maxHeight: "10%" },
      { maxHeight: "100%", duration: 0.5 },
      0
    )

    .fromTo(
      ".career-timeline",
      { opacity: 0 },
      { opacity: 1, duration: 0.1 },
      0
    )
    .fromTo(
      ".career-info-box",
      { opacity: 0 },
      { opacity: 1, stagger: 0.1, duration: 0.5 },
      0
    )
    .fromTo(
      ".career-dot",
      { animationIterationCount: "infinite" },
      {
        animationIterationCount: "1",
        delay: 0.3,
        duration: 0.1,
      },
      0
    );

  if (window.innerWidth > 1024) {
    careerTimeline.fromTo(
      ".career-section",
      { y: 0 },
      { y: "20%", duration: 0.5, delay: 0.2 },
      0
    );
  } else {
    careerTimeline.fromTo(
      ".career-section",
      { y: 0 },
      { y: 0, duration: 0.5, delay: 0.2 },
      0
    );
  }
}
