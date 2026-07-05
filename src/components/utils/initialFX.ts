import { SplitText } from "gsap/SplitText";
import gsap from "gsap";
import { smoother } from "../Navbar";

let splitInstances: SplitText[] = [];
let timelines: gsap.core.Timeline[] = [];
export let hasInitialized = false;

export function initialFX() {
  hasInitialized = true;
  document.body.style.overflowY = "auto";
  if (smoother) {
    smoother.paused(false);
  }
  document.getElementsByTagName("main")[0].classList.add("main-active");
  gsap.to("body", {
    backgroundColor: "#0b080c",
    duration: 0.5,
    delay: 1,
  });

  // Clear any existing instances just in case
  timelines.forEach((tl) => tl.kill());
  timelines = [];
  splitInstances.forEach((si) => si.revert());
  splitInstances = [];

  var landingText = new SplitText(
    [".landing-info h3", ".landing-intro h2", ".landing-intro h1"],
    {
      type: "chars,lines",
      linesClass: "split-line",
    }
  );
  splitInstances.push(landingText);

  gsap.fromTo(
    landingText.chars,
    { opacity: 0, y: 80, filter: "blur(5px)" },
    {
      opacity: 1,
      duration: 1.2,
      filter: "blur(0px)",
      ease: "power3.inOut",
      y: 0,
      stagger: 0.025,
      delay: 0.3,
    }
  );

  let TextProps = { type: "chars,lines", linesClass: "split-h2" };

  var landingText2 = new SplitText(".landing-h2-info", TextProps);
  splitInstances.push(landingText2);

  gsap.fromTo(
    landingText2.chars,
    { opacity: 0, y: 80, filter: "blur(5px)" },
    {
      opacity: 1,
      duration: 1.2,
      filter: "blur(0px)",
      ease: "power3.inOut",
      y: 0,
      stagger: 0.025,
      delay: 0.3,
    }
  );

  gsap.fromTo(
    ".landing-info-h2",
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      y: 0,
      delay: 0.8,
    }
  );
  gsap.fromTo(
    [".header", ".icons-section", ".nav-fade"],
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      delay: 0.1,
    }
  );

  var landingText3 = new SplitText(".landing-h2-info-1", TextProps);
  var landingText4 = new SplitText(".landing-h2-1", TextProps);
  var landingText5 = new SplitText(".landing-h2-2", TextProps);
  splitInstances.push(landingText3, landingText4, landingText5);

  LoopText(landingText2, landingText3, false);
  LoopText(landingText4, landingText5, false);
}

export function reinitLandingFX() {
  if (!hasInitialized) return;

  // 1. Kill old timelines
  timelines.forEach((tl) => tl.kill());
  timelines = [];

  // 2. Revert old SplitText instances (restores clean translated texts)
  splitInstances.forEach((si) => si.revert());
  splitInstances = [];

  let TextProps = { type: "chars,lines", linesClass: "split-h2" };

  // 3. Re-split the looping texts
  var landingText2 = new SplitText(".landing-h2-info", TextProps);
  var landingText3 = new SplitText(".landing-h2-info-1", TextProps);
  var landingText4 = new SplitText(".landing-h2-1", TextProps);
  var landingText5 = new SplitText(".landing-h2-2", TextProps);
  splitInstances.push(landingText2, landingText3, landingText4, landingText5);

  // 4. Restart LoopText with isReinit = true
  LoopText(landingText2, landingText3, true);
  LoopText(landingText4, landingText5, true);
}

function LoopText(Text1: SplitText, Text2: SplitText, isReinit: boolean = false) {
  var tl = gsap.timeline({ repeat: -1 });
  timelines.push(tl);

  if (isReinit) {
    gsap.set(Text1.chars, { y: 0, opacity: 1 });
  }
  gsap.set(Text2.chars, { y: 80, opacity: 0 });

  const delay = 4;

  // 1. Wait 4 seconds, then slide Word 1 up (to -80) and Word 2 up (to 0)
  tl.to(Text1.chars, { y: -80, duration: 1.2, ease: "power3.inOut", stagger: 0.1 }, `+=${delay}`)
    .to(Text2.chars, { y: 0, opacity: 1, duration: 1.2, ease: "power3.inOut", stagger: 0.1 }, "<")
    
    // 2. Wait 4 seconds, then slide Word 2 up (to -80) and Word 1 up from bottom (from 80 to 0)
    .set(Text1.chars, { y: 80, opacity: 0 })
    .to(Text2.chars, { y: -80, duration: 1.2, ease: "power3.inOut", stagger: 0.1 }, `+=${delay}`)
    .to(Text1.chars, { y: 0, opacity: 1, duration: 1.2, ease: "power3.inOut", stagger: 0.1 }, "<");
}

