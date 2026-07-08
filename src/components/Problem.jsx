import { useEffect, useRef } from "react";
import Matter from "matter-js";
import { Reveal } from "../lib/Reveal";
import whatsapp from "../assets/toolLogos/whatsapp.svg";
import notion from "../assets/toolLogos/notion.svg";
import googleDocs from "../assets/toolLogos/google-docs.svg";
import gmail from "../assets/toolLogos/gmail.svg";
import googleSheets from "../assets/toolLogos/google-sheets.svg";
import slack from "../assets/toolLogos/slack.svg";
import googleDrive from "../assets/toolLogos/google-drive.svg";

const TERCERO_MARK =
  "M29.9246 24.7192C30.3288 25.4185 29.8241 26.2934 29.0164 26.2934H1.05055C0.242798 26.2934 -0.261835 25.4185 0.142351 24.7192L4.96364 16.3774H25.1043L29.9246 24.7192ZM14.1257 0.523857C14.5298 -0.1745 15.5383 -0.174739 15.9422 0.523857L23.5877 13.7543H6.47927L14.1257 0.523857Z";

const SIZE = 58;

// top/left/rot are the resting positions used for the reduced-motion fallback.
const pile = [
  { src: notion, name: "Notion", top: "40%", left: "4%", rot: -10 },
  { src: googleDocs, name: "Google Docs", top: "52%", left: "26%", rot: 6 },
  { src: slack, name: "Slack", top: "44%", left: "48%", rot: -5 },
  { src: googleDrive, name: "Google Drive", top: "50%", left: "70%", rot: 8 },
  { src: googleSheets, name: "Google Sheets", top: "8%", left: "16%", rot: 7 },
  { src: whatsapp, name: "WhatsApp", top: "4%", left: "40%", rot: -8 },
  { src: gmail, name: "Gmail", top: "10%", left: "62%", rot: 5 },
];

function ToolPile() {
  const sceneRef = useRef(null);
  const tileRefs = useRef([]);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // Reduced motion: drop the physics, just place tiles at rest.
    if (reduce) {
      pile.forEach((t, i) => {
        const el = tileRefs.current[i];
        if (el) {
          el.style.left = t.left;
          el.style.top = t.top;
          el.style.transform = `rotate(${t.rot}deg)`;
          el.style.opacity = "1";
        }
      });
      return;
    }

    let engine;
    let raf = 0;
    let stopTimer = 0;
    let started = false;

    const build = () => {
      const width = scene.clientWidth;
      const height = scene.clientHeight;
      if (!width || !height) return;

      engine = Matter.Engine.create({ enableSleeping: true });
      engine.gravity.y = 1.1;

      const wallOpts = { isStatic: true };
      const floor = Matter.Bodies.rectangle(
        width / 2,
        height + 30,
        width + 200,
        60,
        wallOpts,
      );
      const leftWall = Matter.Bodies.rectangle(
        -30,
        height / 2,
        60,
        height * 4,
        wallOpts,
      );
      const rightWall = Matter.Bodies.rectangle(
        width + 30,
        height / 2,
        60,
        height * 4,
        wallOpts,
      );
      Matter.World.add(engine.world, [floor, leftWall, rightWall]);

      const pad = SIZE * 0.8;
      const bodies = pile.map((_, i) => {
        const n = pile.length;
        const baseX = pad + ((i + 0.5) / n) * (width - pad * 2);
        const x = baseX + (Math.random() - 0.5) * 26;
        const y = -80 - i * 78; // cascade in from above
        const body = Matter.Bodies.rectangle(x, y, SIZE, SIZE, {
          restitution: 0.32,
          friction: 0.55,
          frictionAir: 0.008,
          chamfer: { radius: 14 },
        });
        Matter.Body.setAngle(body, (Math.random() - 0.5) * 0.7);
        Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.22);
        return body;
      });
      Matter.World.add(engine.world, bodies);

      const sync = () => {
        Matter.Engine.update(engine, 1000 / 60);
        let allAsleep = true;
        for (let i = 0; i < bodies.length; i++) {
          const b = bodies[i];
          const el = tileRefs.current[i];
          if (el) {
            el.style.opacity = "1";
            el.style.transform = `translate(${b.position.x - SIZE / 2}px, ${b.position.y - SIZE / 2}px) rotate(${b.angle}rad)`;
          }
          if (!b.isSleeping) allAsleep = false;
        }
        if (allAsleep) return; // settled — stop the loop
        raf = requestAnimationFrame(sync);
      };
      sync();
      // Safety stop in case bodies never fully sleep.
      stopTimer = setTimeout(() => cancelAnimationFrame(raf), 8000);
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started) {
            started = true;
            build();
            io.disconnect();
          }
        });
      },
      { threshold: 0.35 },
    );
    io.observe(scene);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      clearTimeout(stopTimer);
      if (engine) {
        Matter.World.clear(engine.world, false);
        Matter.Engine.clear(engine);
      }
    };
  }, []);

  return (
    <div
      ref={sceneRef}
      className="relative w-[340px] max-w-full h-[180px] overflow-hidden"
    >
      {pile.map((t, i) => (
        <div
          key={i}
          ref={(el) => {
            tileRefs.current[i] = el;
          }}
          className="absolute top-0 left-0 w-[58px] h-[58px] rounded-[14px] bg-background border border-border p-1 opacity-0 will-change-transform"
        >
          <img
            src={t.src}
            alt={t.name}
            className="w-full h-full object-contain pointer-events-none"
          />
        </div>
      ))}
    </div>
  );
}

export function Problem() {
  return (
    <section className="py-[60px] max-sm:py-10">
      <div className="max-w-wrap mx-auto px-10 max-sm:px-5">
        <Reveal className="max-w-[560px]">
          <span className="text-xs font-medium text-muted-foreground tracking-[0.06em] uppercase mb-4 block">
            The problem
          </span>
          <h2 className="font-['Bricolage_Grotesque'] text-[clamp(28px,3.5vw,46px)] font-bold leading-[1.1] tracking-[-0.03em] text-foreground mb-3">
            Too many tools.
            <br />
            <em className="not-italic text-muted-foreground">
              Not enough clarity.
            </em>
          </h2>
          <p className="text-base text-muted-foreground leading-[1.7] font-normal max-w-[500px]">
            Agencies run one app per module — a login, an export, and a status
            update for each. Tercero collapses all of it into one workspace.
          </p>
        </Reveal>

        {/* Before → after comparison */}
        <Reveal
          delay={0.16}
          className="mt-14 grid grid-cols-[1fr_auto_1fr] max-sm:grid-cols-1 gap-8 max-sm:gap-4 items-stretch"
        >
          {/* Without Tercero — the physics pile */}
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center justify-center gap-[7px] h-4 mb-4 text-[11px] font-semibold uppercase tracking-[0.06em] text-muted-foreground">
              <span className="w-[7px] h-[7px] rounded-full bg-muted-foreground shrink-0" />
              Without Tercero
            </div>
            <ToolPile />
            <div className="font-['Bricolage_Grotesque'] text-[15px] font-bold text-foreground tracking-[-0.01em] mt-4">
              7 tools. 7 logins. Zero clarity.
            </div>
            <div className="text-[13px] text-muted-foreground leading-[1.55] mt-1 max-w-[280px]">
              Context scattered everywhere, nothing connected to the client.
            </div>
          </div>

          {/* Arrow */}
          <div className="flex flex-col items-center">
            <div className="h-4 mb-4 max-sm:hidden" aria-hidden="true" />
            <div className="flex items-center justify-center h-[180px] max-sm:h-auto max-sm:py-1">
              <div className="w-10 h-10 rounded-full border border-border bg-background flex items-center justify-center text-muted-foreground">
                <svg
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  fill="none"
                  className="max-sm:hidden"
                  style={{ width: 18, height: 18 }}
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
                <svg
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  fill="none"
                  className="sm:hidden"
                  style={{ width: 18, height: 18 }}
                >
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <polyline points="5 12 12 19 19 12" />
                </svg>
              </div>
            </div>
          </div>

          {/* With Tercero — the one mark */}
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center justify-center gap-[7px] h-4 mb-4 text-[11px] font-semibold uppercase tracking-[0.06em] text-foreground">
              <span className="w-[7px] h-[7px] rounded-full bg-green-500 shrink-0" />
              With Tercero
            </div>
            <div className="h-[180px] flex items-end justify-center">
              <div className="w-20 h-20 rounded-[20px] bg-foreground shadow-lg flex items-center justify-center">
                <svg
                  viewBox="0 0 30 27"
                  fill="none"
                  style={{ width: 34, height: 31 }}
                >
                  <path d={TERCERO_MARK} className="fill-background" />
                </svg>
              </div>
            </div>
            <div className="font-['Bricolage_Grotesque'] text-[15px] font-bold text-foreground tracking-[-0.01em] mt-4">
              One workspace. One login.
            </div>
            <div className="text-[13px] text-muted-foreground leading-[1.55] mt-1 max-w-[280px]">
              Everything connected to the client — from lead to invoice.
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
