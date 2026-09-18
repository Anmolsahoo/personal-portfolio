import React, { useEffect, useRef, useCallback, useMemo } from 'react';

const DEFAULT_INNER_GRADIENT = 'linear-gradient(160deg, rgba(28, 34, 52, 0.96) 0%, rgba(10, 13, 22, 0.98) 100%)';

const ANIMATION_CONFIG = {
  INITIAL_DURATION: 1200,
  INITIAL_X_OFFSET: 70,
  INITIAL_Y_OFFSET: 60,
  DEVICE_BETA_OFFSET: 20,
  ENTER_TRANSITION_MS: 180
} as const;

const clamp = (v: number, min = 0, max = 100): number => Math.min(Math.max(v, min), max);
const round = (v: number, precision = 3): number => parseFloat(v.toFixed(precision));
const adjust = (v: number, fMin: number, fMax: number, tMin: number, tMax: number): number =>
  round(tMin + ((tMax - tMin) * (v - fMin)) / (fMax - fMin));

// Inject keyframes once
const KEYFRAMES_ID = 'pc-keyframes';
if (typeof document !== 'undefined' && !document.getElementById(KEYFRAMES_ID)) {
  const style = document.createElement('style');
  style.id = KEYFRAMES_ID;
  style.textContent = `
    @keyframes pc-holo-bg {
      0% { background-position: 0 var(--background-y), 0 0, center; }
      100% { background-position: 0 var(--background-y), 90% 90%, center; }
    }
  `;
  document.head.appendChild(style);
}

export interface ProfileCardProps {
  avatarUrl?: string;
  iconUrl?: string;
  grainUrl?: string;
  innerGradient?: string;
  behindGlowEnabled?: boolean;
  behindGlowColor?: string;
  behindGlowSize?: string;
  className?: string;
  enableTilt?: boolean;
  enableMobileTilt?: boolean;
  mobileTiltSensitivity?: number;
  miniAvatarUrl?: string;
  name?: string;
  title?: string;
  handle?: string;
  status?: string;
  contactText?: string;
  showUserInfo?: boolean;
  onContactClick?: () => void;
}

interface TiltEngine {
  setImmediate: (x: number, y: number) => void;
  setTarget: (x: number, y: number) => void;
  toCenter: () => void;
  beginInitial: (durationMs: number) => void;
  getCurrent: () => { x: number; y: number; tx: number; ty: number };
  cancel: () => void;
}

const ProfileCardComponent: React.FC<ProfileCardProps> = ({
  avatarUrl = '/anmol-profile-v2.jpg',
  iconUrl,
  grainUrl,
  innerGradient = DEFAULT_INNER_GRADIENT,
  behindGlowEnabled = true,
  behindGlowColor = 'rgba(255, 85, 0, 0.55)',
  behindGlowSize = '60%',
  className = '',
  enableTilt = true,
  enableMobileTilt = false,
  mobileTiltSensitivity = 5,
  miniAvatarUrl = '/anmol-profile-v2.jpg',
  name = 'Anmol Sahoo',
  title = 'Software Engineer',
  handle = 'anmolsahoo',
  status = 'Available for Freelance',
  contactText = 'Connect',
  showUserInfo = true,
  onContactClick
}) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);

  const enterTimerRef = useRef<number | null>(null);
  const leaveRafRef = useRef<number | null>(null);

  const tiltEngine = useMemo<TiltEngine | null>(() => {
    if (!enableTilt) return null;

    let rafId: number | null = null;
    let running = false;
    let lastTs = 0;

    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;

    const DEFAULT_TAU = 0.14;
    const INITIAL_TAU = 0.6;
    let initialUntil = 0;

    const setVarsFromXY = (x: number, y: number): void => {
      const shell = shellRef.current;
      const wrap = wrapRef.current;
      if (!shell || !wrap) return;

      const width = shell.clientWidth || 1;
      const height = shell.clientHeight || 1;

      const percentX = clamp((100 / width) * x);
      const percentY = clamp((100 / height) * y);

      const centerX = percentX - 50;
      const centerY = percentY - 50;

      const properties: Record<string, string> = {
        '--pointer-x': `${percentX}%`,
        '--pointer-y': `${percentY}%`,
        '--background-x': `${adjust(percentX, 0, 100, 35, 65)}%`,
        '--background-y': `${adjust(percentY, 0, 100, 35, 65)}%`,
        '--pointer-from-center': `${clamp(Math.hypot(percentY - 50, percentX - 50) / 50, 0, 1)}`,
        '--pointer-from-top': `${percentY / 100}`,
        '--pointer-from-left': `${percentX / 100}`,
        '--rotate-x': `${round(-(centerX / 5))}deg`,
        '--rotate-y': `${round(centerY / 4)}deg`,
        '--card-opacity': '1'
      };

      for (const [k, v] of Object.entries(properties)) wrap.style.setProperty(k, v);
    };

    const step = (ts: number): void => {
      if (!running) return;
      if (lastTs === 0) lastTs = ts;
      const dt = (ts - lastTs) / 1000;
      lastTs = ts;

      const tau = ts < initialUntil ? INITIAL_TAU : DEFAULT_TAU;
      const k = 1 - Math.exp(-dt / tau);

      currentX += (targetX - currentX) * k;
      currentY += (targetY - currentY) * k;

      setVarsFromXY(currentX, currentY);

      const stillFar = Math.abs(targetX - currentX) > 0.05 || Math.abs(targetY - currentY) > 0.05;

      if (stillFar || document.hasFocus()) {
        rafId = requestAnimationFrame(step);
      } else {
        running = false;
        lastTs = 0;
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      }
    };

    const start = (): void => {
      if (running) return;
      running = true;
      lastTs = 0;
      rafId = requestAnimationFrame(step);
    };

    return {
      setImmediate(x: number, y: number): void {
        currentX = x;
        currentY = y;
        setVarsFromXY(currentX, currentY);
      },
      setTarget(x: number, y: number): void {
        targetX = x;
        targetY = y;
        start();
      },
      toCenter(): void {
        const shell = shellRef.current;
        if (!shell) return;
        this.setTarget(shell.clientWidth / 2, shell.clientHeight / 2);
      },
      beginInitial(durationMs: number): void {
        initialUntil = performance.now() + durationMs;
        start();
      },
      getCurrent(): { x: number; y: number; tx: number; ty: number } {
        return { x: currentX, y: currentY, tx: targetX, ty: targetY };
      },
      cancel(): void {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = null;
        running = false;
        lastTs = 0;
      }
    };
  }, [enableTilt]);

  const getOffsets = (evt: PointerEvent, el: HTMLElement): { x: number; y: number } => {
    const rect = el.getBoundingClientRect();
    return { x: evt.clientX - rect.left, y: evt.clientY - rect.top };
  };

  const handlePointerMove = useCallback(
    (event: PointerEvent): void => {
      const shell = shellRef.current;
      if (!shell || !tiltEngine) return;
      const { x, y } = getOffsets(event, shell);
      tiltEngine.setTarget(x, y);
    },
    [tiltEngine]
  );

  const handlePointerEnter = useCallback(
    (event: PointerEvent): void => {
      const shell = shellRef.current;
      if (!shell || !tiltEngine) return;

      shell.classList.add('active');
      shell.classList.add('entering');
      if (enterTimerRef.current) window.clearTimeout(enterTimerRef.current);
      enterTimerRef.current = window.setTimeout(() => {
        shell.classList.remove('entering');
      }, ANIMATION_CONFIG.ENTER_TRANSITION_MS);

      const { x, y } = getOffsets(event, shell);
      tiltEngine.setTarget(x, y);
    },
    [tiltEngine]
  );

  const handlePointerLeave = useCallback((): void => {
    const shell = shellRef.current;
    if (!shell || !tiltEngine) return;

    tiltEngine.toCenter();

    const checkSettle = (): void => {
      const { x, y, tx, ty } = tiltEngine.getCurrent();
      const settled = Math.hypot(tx - x, ty - y) < 0.6;
      if (settled) {
        shell.classList.remove('active');
        leaveRafRef.current = null;
      } else {
        leaveRafRef.current = requestAnimationFrame(checkSettle);
      }
    };
    if (leaveRafRef.current) cancelAnimationFrame(leaveRafRef.current);
    leaveRafRef.current = requestAnimationFrame(checkSettle);
  }, [tiltEngine]);

  const handleDeviceOrientation = useCallback(
    (event: DeviceOrientationEvent): void => {
      const shell = shellRef.current;
      if (!shell || !tiltEngine) return;

      const { beta, gamma } = event;
      if (beta == null || gamma == null) return;

      const centerX = shell.clientWidth / 2;
      const centerY = shell.clientHeight / 2;
      const x = clamp(centerX + gamma * mobileTiltSensitivity, 0, shell.clientWidth);
      const y = clamp(
        centerY + (beta - ANIMATION_CONFIG.DEVICE_BETA_OFFSET) * mobileTiltSensitivity,
        0,
        shell.clientHeight
      );

      tiltEngine.setTarget(x, y);
    },
    [tiltEngine, mobileTiltSensitivity]
  );

  useEffect(() => {
    if (!enableTilt || !tiltEngine) return;

    const shell = shellRef.current;
    if (!shell) return;

    const pointerMoveHandler = handlePointerMove as EventListener;
    const pointerEnterHandler = handlePointerEnter as EventListener;
    const pointerLeaveHandler = handlePointerLeave as EventListener;
    const deviceOrientationHandler = handleDeviceOrientation as EventListener;

    shell.addEventListener('pointerenter', pointerEnterHandler);
    shell.addEventListener('pointermove', pointerMoveHandler);
    shell.addEventListener('pointerleave', pointerLeaveHandler);

    const handleClick = (): void => {
      if (!enableMobileTilt || location.protocol !== 'https:') return;
      const anyMotion = window.DeviceMotionEvent as typeof DeviceMotionEvent & {
        requestPermission?: () => Promise<string>;
      };
      if (anyMotion && typeof anyMotion.requestPermission === 'function') {
        anyMotion
          .requestPermission()
          .then((state: string) => {
            if (state === 'granted') {
              window.addEventListener('deviceorientation', deviceOrientationHandler);
            }
          })
          .catch(console.error);
      } else {
        window.addEventListener('deviceorientation', deviceOrientationHandler);
      }
    };
    shell.addEventListener('click', handleClick);

    const initialX = (shell.clientWidth || 0) - ANIMATION_CONFIG.INITIAL_X_OFFSET;
    const initialY = ANIMATION_CONFIG.INITIAL_Y_OFFSET;
    tiltEngine.setImmediate(initialX, initialY);
    tiltEngine.toCenter();
    tiltEngine.beginInitial(ANIMATION_CONFIG.INITIAL_DURATION);

    return () => {
      shell.removeEventListener('pointerenter', pointerEnterHandler);
      shell.removeEventListener('pointermove', pointerMoveHandler);
      shell.removeEventListener('pointerleave', pointerLeaveHandler);
      shell.removeEventListener('click', handleClick);
      window.removeEventListener('deviceorientation', deviceOrientationHandler);
      if (enterTimerRef.current) window.clearTimeout(enterTimerRef.current);
      if (leaveRafRef.current) cancelAnimationFrame(leaveRafRef.current);
      tiltEngine.cancel();
      shell.classList.remove('entering');
    };
  }, [
    enableTilt,
    enableMobileTilt,
    tiltEngine,
    handlePointerMove,
    handlePointerEnter,
    handlePointerLeave,
    handleDeviceOrientation
  ]);

  const cardRadius = '32px';

  const cardStyle = useMemo(
    () => ({
      '--icon': iconUrl ? `url(${iconUrl})` : 'none',
      '--grain': grainUrl ? `url(${grainUrl})` : 'none',
      '--inner-gradient': innerGradient ?? DEFAULT_INNER_GRADIENT,
      '--behind-glow-color': behindGlowColor ?? 'rgba(255, 85, 0, 0.55)',
      '--behind-glow-size': behindGlowSize ?? '60%',
      '--pointer-x': '50%',
      '--pointer-y': '50%',
      '--pointer-from-center': '0',
      '--pointer-from-top': '0.5',
      '--pointer-from-left': '0.5',
      '--card-opacity': '0.9',
      '--rotate-x': '0deg',
      '--rotate-y': '0deg',
      '--background-x': '50%',
      '--background-y': '50%',
      '--card-radius': cardRadius,
      '--sunpillar-1': 'hsl(205, 90%, 68%)',
      '--sunpillar-2': 'hsl(220, 85%, 65%)',
      '--sunpillar-3': 'hsl(240, 80%, 70%)',
      '--sunpillar-4': 'hsl(25, 95%, 62%)',
      '--sunpillar-5': 'hsl(205, 80%, 65%)',
      '--sunpillar-6': 'hsl(230, 85%, 70%)',
      '--sunpillar-clr-1': 'var(--sunpillar-1)',
      '--sunpillar-clr-2': 'var(--sunpillar-2)',
      '--sunpillar-clr-3': 'var(--sunpillar-3)',
      '--sunpillar-clr-4': 'var(--sunpillar-4)',
      '--sunpillar-clr-5': 'var(--sunpillar-5)',
      '--sunpillar-clr-6': 'var(--sunpillar-6)'
    }),
    [iconUrl, grainUrl, innerGradient, behindGlowColor, behindGlowSize, cardRadius]
  );

  const handleContactClick = useCallback((): void => {
    onContactClick?.();
  }, [onContactClick]);

  // Holographic shine layer
  const shineStyle = {
    maskImage: 'var(--icon)',
    maskMode: 'luminance',
    maskRepeat: 'repeat',
    maskSize: '150%',
    maskPosition: 'top calc(200% - (var(--background-y) * 5)) left calc(100% - var(--background-x))',
    filter: 'brightness(0.65) contrast(1.25) saturate(0.6) opacity(0.28)',
    animation: 'pc-holo-bg 18s linear infinite',
    animationPlayState: 'running' as const,
    mixBlendMode: 'color-dodge' as const,
    transform: 'translate3d(0, 0, 1px)',
    overflow: 'hidden' as const,
    zIndex: 3,
    background: 'transparent',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundImage: `
      repeating-linear-gradient(
        0deg,
        var(--sunpillar-clr-1) 5%,
        var(--sunpillar-clr-2) 10%,
        var(--sunpillar-clr-3) 15%,
        var(--sunpillar-clr-4) 20%,
        var(--sunpillar-clr-5) 25%,
        var(--sunpillar-clr-6) 30%,
        var(--sunpillar-clr-1) 35%
      ),
      repeating-linear-gradient(
        -45deg,
        #0e152e 0%,
        hsl(215, 30%, 55%) 3.8%,
        hsl(225, 45%, 65%) 4.5%,
        hsl(215, 30%, 55%) 5.2%,
        #0e152e 10%,
        #0e152e 12%
      ),
      radial-gradient(
        farthest-corner circle at var(--pointer-x) var(--pointer-y),
        hsla(0, 0%, 0%, 0.1) 12%,
        hsla(0, 0%, 0%, 0.15) 20%,
        hsla(0, 0%, 0%, 0.25) 120%
      )
    `.replace(/\s+/g, ' '),
    gridArea: '1 / -1',
    borderRadius: cardRadius,
    pointerEvents: 'none' as const
  };

  // Glare reflection layer
  const glareStyle: React.CSSProperties = {
    transform: 'translate3d(0, 0, 1.1px)',
    overflow: 'hidden',
    backgroundImage: `radial-gradient(
      farthest-corner circle at var(--pointer-x) var(--pointer-y),
      hsla(215, 90%, 85%, 0.35) 10%,
      hsla(220, 50%, 25%, 0.2) 85%
    )`,
    mixBlendMode: 'overlay',
    filter: 'brightness(0.95) contrast(1.15)',
    zIndex: 4,
    gridArea: '1 / -1',
    borderRadius: cardRadius,
    pointerEvents: 'none'
  };

  return (
    <div
      ref={wrapRef}
      className={`relative touch-none ${className}`.trim()}
      style={{ perspective: '600px', transform: 'translate3d(0, 0, 0.1px)', ...cardStyle } as React.CSSProperties}
    >
      {behindGlowEnabled && (
        <div
          className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-300 ease-out"
          style={{
            background: `radial-gradient(circle at var(--pointer-x) var(--pointer-y), var(--behind-glow-color) 0%, transparent var(--behind-glow-size))`,
            filter: 'blur(55px) saturate(1.25)',
            opacity: 'calc(0.95 * var(--card-opacity))'
          }}
        />
      )}
      
      <div ref={shellRef} className="relative z-[1] group">
        <section
          className="grid relative overflow-hidden border border-white/[0.12] hover:border-[#ff5500]/50 transition-colors w-[340px] sm:w-[380px] lg:w-[400px] h-[520px] sm:h-[570px] lg:h-[600px]"
          style={{
            maxHeight: '620px',
            maxWidth: '100%',
            aspectRatio: '0.67',
            borderRadius: cardRadius,
            backgroundBlendMode: 'color-dodge, normal, normal, normal',
            boxShadow:
              'rgba(0, 0, 0, 0.85) calc((var(--pointer-from-left) * 14px) - 5px) calc((var(--pointer-from-top) * 22px) - 7px) 30px -5px, 0 0 35px rgba(255, 85, 0, 0.2)',
            transition: 'transform 1s ease',
            transform: 'translateZ(0) rotateX(0deg) rotateY(0deg)',
            background: 'rgba(10, 13, 22, 0.96)',
            backfaceVisibility: 'hidden'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transition = 'none';
            e.currentTarget.style.transform = 'translateZ(0) rotateX(var(--rotate-y)) rotateY(var(--rotate-x))';
          }}
          onMouseLeave={e => {
            const shell = shellRef.current;
            if (shell?.classList.contains('entering')) {
              e.currentTarget.style.transition = 'transform 180ms ease-out';
            } else {
              e.currentTarget.style.transition = 'transform 1s ease';
            }
            e.currentTarget.style.transform = 'translateZ(0) rotateX(0deg) rotateY(0deg)';
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'var(--inner-gradient)',
              backgroundColor: 'rgba(10, 13, 22, 0.96)',
              borderRadius: cardRadius,
              display: 'grid',
              gridArea: '1 / -1'
            }}
          >
            {/* Shine layer */}
            <div style={shineStyle} />

            {/* Glare layer */}
            <div style={glareStyle} />

            {/* Top Text Content (Matching Reference 2 Layout, Scaled Proportional to Left Text) */}
            <div
              className="w-full text-center relative z-[6] pt-9 sm:pt-11 px-5 pointer-events-none"
              style={{
                transform:
                  'translate3d(calc(var(--pointer-from-left) * -6px + 3px), calc(var(--pointer-from-top) * -6px + 3px), 0.1px)',
                gridArea: '1 / -1'
              }}
            >
              <div className="flex flex-col items-center">
                <h3
                  className="font-bold tracking-tight text-white mb-1.5 drop-shadow-md text-3xl sm:text-4xl"
                  style={{
                    lineHeight: '1.2',
                    letterSpacing: '-0.025em',
                    backgroundImage: 'linear-gradient(to bottom, #ffffff 70%, #cad7ef 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '0 2px 12px rgba(0,0,0,0.6)'
                  }}
                >
                  {name}
                </h3>
                <p
                  className="font-medium text-sm sm:text-base tracking-normal"
                  style={{
                    color: '#9eacc9',
                    letterSpacing: '0.015em'
                  }}
                >
                  {title}
                </p>
              </div>
            </div>

            {/* Avatar image container (Positioned below the top text so text does not overlap face) */}
            <div
              className="overflow-hidden"
              style={{
                transform: 'translateZ(2px)',
                gridArea: '1 / -1',
                borderRadius: cardRadius,
                pointerEvents: 'none',
                backfaceVisibility: 'hidden',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center'
              }}
            >
              <img
                className="w-full h-[76%] object-cover object-top will-change-transform transition-transform duration-[120ms] ease-out"
                src={avatarUrl}
                alt={`${name || 'User'} avatar`}
                loading="lazy"
                style={{
                  transformOrigin: '50% 100%',
                  transform:
                    'translateX(calc((var(--pointer-from-left) - 0.5) * 6px)) translateZ(0) scaleY(calc(1 + (var(--pointer-from-top) - 0.5) * 0.02)) scaleX(calc(1 + (var(--pointer-from-left) - 0.5) * 0.01))',
                  borderRadius: `0 0 ${cardRadius} ${cardRadius}`,
                  backfaceVisibility: 'hidden'
                }}
                onError={e => {
                  const t = e.target as HTMLImageElement;
                  t.style.display = 'none';
                }}
              />
            </div>

            {/* Floating Bottom User Info Bar */}
            {showUserInfo && (
              <div
                className="absolute z-[10] flex items-center justify-between backdrop-blur-[24px] border border-white/15 pointer-events-auto shadow-2xl"
                style={
                  {
                    '--ui-inset': '16px',
                    '--ui-radius-bias': '6px',
                    bottom: 'var(--ui-inset)',
                    left: 'var(--ui-inset)',
                    right: 'var(--ui-inset)',
                    background: 'rgba(8, 11, 18, 0.84)',
                    borderRadius: 'calc(max(0px, var(--card-radius) - var(--ui-inset) + var(--ui-radius-bias)))',
                    padding: '11px 14px'
                  } as React.CSSProperties
                }
              >
                <div className="flex items-center gap-3">
                  <div
                    className="rounded-full overflow-hidden border border-[#ff5500]/60 flex-shrink-0 shadow-sm"
                    style={{ width: '42px', height: '42px' }}
                  >
                    <img
                      className="w-full h-full object-cover object-top rounded-full"
                      src={miniAvatarUrl || avatarUrl}
                      alt={`${name || 'User'} mini avatar`}
                      loading="lazy"
                      style={{ display: 'block', pointerEvents: 'auto' }}
                    />
                  </div>
                  <div className="flex flex-col items-start gap-1">
                    <div className="text-xs sm:text-sm font-semibold text-white leading-none flex items-center gap-1.5">
                      @{handle}
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ff5500]"></span>
                    </div>
                    <div className="text-[11px] text-emerald-400 font-medium leading-none flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      {status}
                    </div>
                  </div>
                </div>
                
                <button
                  className="border border-[#ff5500]/50 hover:border-[#ff5500] bg-gradient-to-r from-[#ff5500] to-[#e63c00] text-white rounded-xl px-4 py-2 text-xs font-bold cursor-pointer backdrop-blur-[10px] transition-all duration-200 ease-out hover:shadow-[0_0_18px_rgba(255,85,0,0.5)] active:scale-95"
                  onClick={handleContactClick}
                  type="button"
                  aria-label={`Contact ${name || 'user'}`}
                >
                  {contactText}
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export const ProfileCard = React.memo(ProfileCardComponent);
export default ProfileCard;
