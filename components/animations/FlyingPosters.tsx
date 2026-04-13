'use client';

import { useRef, useEffect } from 'react';
import { Renderer, Camera, Transform, Plane, Program, Mesh, Texture } from 'ogl';

/* ──────── Shaders ──────── */

const vertexShader = `
precision highp float;

attribute vec3 position;
attribute vec2 uv;
attribute vec3 normal;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform mat3 normalMatrix;

uniform float uPosition;
uniform float uTime;
uniform float uSpeed;
uniform vec3 distortionAxis;
uniform vec3 rotationAxis;
uniform float uDistortion;

varying vec2 vUv;
varying vec3 vNormal;

float PI = 3.141592653589793238;

mat4 rotationMatrix(vec3 axis, float angle) {
  axis = normalize(axis);
  float s = sin(angle);
  float c = cos(angle);
  float oc = 1.0 - c;
  return mat4(
    oc*axis.x*axis.x+c,           oc*axis.x*axis.y-axis.z*s,  oc*axis.z*axis.x+axis.y*s, 0.0,
    oc*axis.x*axis.y+axis.z*s,    oc*axis.y*axis.y+c,         oc*axis.y*axis.z-axis.x*s, 0.0,
    oc*axis.z*axis.x-axis.y*s,    oc*axis.y*axis.z+axis.x*s,  oc*axis.z*axis.z+c,        0.0,
    0.0,                           0.0,                        0.0,                       1.0
  );
}

vec3 rotate(vec3 v, vec3 axis, float angle) {
  return (rotationMatrix(axis, angle) * vec4(v, 1.0)).xyz;
}

float qinticInOut(float t) {
  return t < 0.5
    ? 16.0 * pow(t, 5.0)
    : -0.5 * abs(pow(2.0 * t - 2.0, 5.0)) + 1.0;
}

void main() {
  vUv = uv;
  float norm = 0.5;
  vec3 newpos = position;
  float offset = (dot(distortionAxis, position) + norm / 2.) / norm;
  float localprogress = clamp(
    (fract(uPosition * 5.0 * 0.01) - 0.01 * uDistortion * offset) / (1. - 0.01 * uDistortion),
    0., 2.
  );
  localprogress = qinticInOut(localprogress) * PI;
  newpos = rotate(newpos, rotationAxis, localprogress);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(newpos, 1.0);
}
`;

const fragmentShader = `
precision highp float;

uniform vec2 uImageSize;
uniform vec2 uPlaneSize;
uniform sampler2D tMap;

varying vec2 vUv;

void main() {
  vec2 ratio  = vec2(
    min((uPlaneSize.x / uPlaneSize.y) / (uImageSize.x / uImageSize.y), 1.0),
    min((uPlaneSize.y / uPlaneSize.x) / (uImageSize.y / uImageSize.x), 1.0)
  );
  vec2 uv = vUv * ratio + (1.0 - ratio) * 0.5;
  gl_FragColor = texture2D(tMap, uv);
}
`;

/* ──────── Helpers ──────── */

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function mapRange(num: number, min1: number, max1: number, min2: number, max2: number) {
  return ((num - min1) / (max1 - min1)) * (max2 - min2) + min2;
}

/* ──────── Media (one poster plane) ──────── */

class Media {
  gl: any;
  geometry: any;
  scene: any;
  screen: { width: number; height: number };
  viewport: { width: number; height: number };
  image: string;
  length: number;
  index: number;
  planeWidth: number;
  planeHeight: number;
  distortion: number;
  program: any;
  plane: any;
  padding: number;
  height: number;
  heightTotal: number;
  y: number;

  constructor({ gl, geometry, scene, screen, viewport, image, length, index, planeWidth, planeHeight, distortion }: any) {
    this.gl = gl;
    this.geometry = geometry;
    this.scene = scene;
    this.screen = screen;
    this.viewport = viewport;
    this.image = image;
    this.length = length;
    this.index = index;
    this.planeWidth = planeWidth;
    this.planeHeight = planeHeight;
    this.distortion = distortion;
    this.padding = 5;
    this.height = 0;
    this.heightTotal = 0;
    this.y = 0;

    this.createShader();
    this.createMesh();
    this.onResize();
  }

  createShader() {
    const texture = new Texture(this.gl, { generateMipmaps: false });

    this.program = new Program(this.gl, {
      depthTest: false,
      depthWrite: false,
      fragment: fragmentShader,
      vertex: vertexShader,
      uniforms: {
        tMap: { value: texture },
        uPosition: { value: 0 },
        uPlaneSize: { value: [0, 0] },
        uImageSize: { value: [0, 0] },
        uSpeed: { value: 0 },
        rotationAxis: { value: [0, 1, 0] },
        distortionAxis: { value: [1, 1, 0] },
        uDistortion: { value: this.distortion },
        uViewportSize: { value: [this.viewport.width, this.viewport.height] },
        uTime: { value: 0 },
      },
      cullFace: false,
    });

    const img = new window.Image();
    img.crossOrigin = 'anonymous';
    img.src = this.image;
    img.onload = () => {
      texture.image = img;
      this.program.uniforms.uImageSize.value = [img.naturalWidth, img.naturalHeight];
    };
  }

  createMesh() {
    this.plane = new Mesh(this.gl, { geometry: this.geometry, program: this.program });
    this.plane.setParent(this.scene);
  }

  setScale() {
    this.plane.scale.x = (this.viewport.width * this.planeWidth) / this.screen.width;
    this.plane.scale.y = (this.viewport.height * this.planeHeight) / this.screen.height;
    this.plane.position.x = 0;
    this.plane.program.uniforms.uPlaneSize.value = [this.plane.scale.x, this.plane.scale.y];
  }

  onResize({ screen, viewport }: any = {}) {
    if (screen) this.screen = screen;
    if (viewport) {
      this.viewport = viewport;
      this.plane.program.uniforms.uViewportSize.value = [this.viewport.width, this.viewport.height];
    }
    this.setScale();
    this.padding = 5;
    this.height = this.plane.scale.y + this.padding;
    this.heightTotal = this.height * this.length;
    this.y = -this.heightTotal / 2 + (this.index + 0.5) * this.height;
  }

  update(scroll: any) {
    this.plane.position.y = this.y - scroll.current;

    // Map to [0, 120] so center (y=0) → 60 → fract(3)=0 → flat at center
    const position = mapRange(this.plane.position.y, -this.viewport.height, this.viewport.height, 0, 120);
    this.program.uniforms.uPosition.value = position;
    this.program.uniforms.uTime.value += 0.04;
    this.program.uniforms.uSpeed.value = scroll.current;

    // NO wrapping — finite scroll
  }

  /** normalised position for this plane: 1 = centred, 0 = fully off-screen */
  getCenterProximity(vpH: number) {
    const dist = Math.abs(this.plane.position.y);
    const max = vpH / 2 + this.plane.scale.y / 2;
    return Math.max(0, 1 - dist / max);
  }
}

/* ──────── Canvas controller ──────── */

class CanvasController {
  container: HTMLElement;
  canvas: HTMLCanvasElement;
  items: string[];
  planeWidth: number;
  planeHeight: number;
  distortion: number;
  scroll: { ease: number; current: number; target: number; last: number; position: number };
  cameraFov: number;
  cameraZ: number;
  renderer: any;
  gl: any;
  camera: any;
  scene: any;
  planeGeometry: any;
  medias: Media[];
  screen: { width: number; height: number };
  viewport: { width: number; height: number };
  isDown: boolean;
  start: number;
  raf: number;
  onActiveChange?: (index: number) => void;
  minScroll: number;
  maxScroll: number;
  lastActiveIdx: number;

  constructor({ container, canvas, items, planeWidth, planeHeight, distortion, scrollEase, cameraFov, cameraZ, onActiveChange }: any) {
    this.container = container;
    this.canvas = canvas;
    this.items = items;
    this.planeWidth = planeWidth;
    this.planeHeight = planeHeight;
    this.distortion = distortion;
    this.scroll = { ease: scrollEase, current: 0, target: 0, last: 0, position: 0 };
    this.cameraFov = cameraFov;
    this.cameraZ = cameraZ;
    this.isDown = false;
    this.start = 0;
    this.raf = 0;
    this.medias = [];
    this.screen = { width: 1, height: 1 };
    this.viewport = { width: 1, height: 1 };
    this.onActiveChange = onActiveChange;
    this.minScroll = 0;
    this.maxScroll = 0;
    this.lastActiveIdx = -1;

    // bind
    this.onResize = this.onResize.bind(this);
    this.onWheel = this.onWheel.bind(this);
    this.onTouchDown = this.onTouchDown.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.onTouchUp = this.onTouchUp.bind(this);
    this.update = this.update.bind(this);

    this.createRenderer();
    this.createCamera();
    this.createScene();
    this.onResize();
    this.createGeometry();
    this.createMedias();
    this.computeScrollBounds();
    this.update();
    this.addEventListeners();
  }

  createRenderer() {
    this.renderer = new Renderer({ canvas: this.canvas, alpha: true, antialias: true, dpr: Math.min(window.devicePixelRatio, 2) });
    this.gl = this.renderer.gl;
  }
  createCamera() {
    this.camera = new Camera(this.gl);
    this.camera.fov = this.cameraFov;
    this.camera.position.z = this.cameraZ;
  }
  createScene() { this.scene = new Transform(); }
  createGeometry() { this.planeGeometry = new Plane(this.gl, { heightSegments: 1, widthSegments: 100 }); }

  createMedias() {
    this.medias = this.items.map((image, index) =>
      new Media({
        gl: this.gl,
        geometry: this.planeGeometry,
        scene: this.scene,
        screen: this.screen,
        viewport: this.viewport,
        image,
        length: this.items.length,
        index,
        planeWidth: this.planeWidth,
        planeHeight: this.planeHeight,
        distortion: this.distortion,
      })
    );
  }

  /** Compute scroll limits: first poster at center → last poster at center */
  computeScrollBounds() {
    if (!this.medias.length) return;
    // poster.y = -heightTotal/2 + (index + 0.5) * height
    // poster at center when: poster.y - scroll = 0  →  scroll = poster.y
    const first = this.medias[0];
    const last = this.medias[this.medias.length - 1];
    this.minScroll = first.y;   // scroll value to put first poster at center
    this.maxScroll = last.y;    // scroll value to put last poster at center
  }

  /** Returns true if scroll is at a boundary */
  isAtBoundary(direction: number): boolean {
    const EPS = 0.01;
    if (direction > 0 && this.scroll.target >= this.maxScroll - EPS) return true;
    if (direction < 0 && this.scroll.target <= this.minScroll + EPS) return true;
    return false;
  }

  onResize() {
    const rect = this.container.getBoundingClientRect();
    this.screen = { width: rect.width, height: rect.height };
    this.renderer.setSize(this.screen.width, this.screen.height);
    this.camera.perspective({ aspect: this.gl.canvas.width / this.gl.canvas.height });
    const fov = (this.camera.fov * Math.PI) / 180;
    const h = 2 * Math.tan(fov / 2) * this.camera.position.z;
    this.viewport = { height: h, width: h * this.camera.aspect };
    this.medias?.forEach(m => m.onResize({ screen: this.screen, viewport: this.viewport }));
    this.computeScrollBounds();
  }

  onTouchDown(e: any) { this.isDown = true; this.scroll.position = this.scroll.current; this.start = e.touches ? e.touches[0].clientY : e.clientY; }
  onTouchMove(e: any) {
    if (!this.isDown) return;
    const y = e.touches ? e.touches[0].clientY : e.clientY;
    const raw = this.scroll.position + (this.start - y) * 0.1;
    this.scroll.target = Math.max(this.minScroll, Math.min(this.maxScroll, raw));
  }
  onTouchUp() { this.isDown = false; }

  onWheel(e: any): boolean {
    const direction = e.deltaY > 0 ? 1 : -1;

    // If at boundary and scrolling further, let page scroll
    if (this.isAtBoundary(direction)) {
      return false;  // signal: don't preventDefault
    }

    const raw = this.scroll.target + e.deltaY * 0.005;
    this.scroll.target = Math.max(this.minScroll, Math.min(this.maxScroll, raw));
    return true;  // signal: we consumed the scroll
  }

  update() {
    this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease);
    this.medias?.forEach(m => m.update(this.scroll));
    this.renderer.render({ scene: this.scene, camera: this.camera });
    this.scroll.last = this.scroll.current;

    // find which media is closest to center — only fire callback on change
    if (this.onActiveChange && this.medias.length) {
      let bestIdx = 0;
      let bestProx = 0;
      this.medias.forEach((m, i) => {
        const p = m.getCenterProximity(this.viewport.height);
        if (p > bestProx) { bestProx = p; bestIdx = i; }
      });
      if (bestIdx !== this.lastActiveIdx) {
        this.lastActiveIdx = bestIdx;
        this.onActiveChange(bestIdx);
      }
    }

    this.raf = requestAnimationFrame(this.update);
  }

  addEventListeners() {
    window.addEventListener('resize', this.onResize);
  }

  destroy() {
    cancelAnimationFrame(this.raf);
    window.removeEventListener('resize', this.onResize);
  }
}

/* ──────── React Component ──────── */

interface FlyingPostersProps {
  items: string[];
  planeWidth?: number;
  planeHeight?: number;
  distortion?: number;
  scrollEase?: number;
  cameraFov?: number;
  cameraZ?: number;
  className?: string;
  onActiveChange?: (index: number) => void;
  enabled?: boolean;
}

export default function FlyingPosters({
  items = [],
  planeWidth = 320,
  planeHeight = 320,
  distortion = 3,
  scrollEase = 0.1,
  cameraFov = 45,
  cameraZ = 20,
  className = '',
  onActiveChange,
  enabled = true,
}: FlyingPostersProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const instanceRef = useRef<CanvasController | null>(null);
  const enabledRef = useRef(enabled);
  enabledRef.current = enabled;  // keep ref in sync

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    instanceRef.current = new CanvasController({
      container: containerRef.current,
      canvas: canvasRef.current,
      items,
      planeWidth,
      planeHeight,
      distortion,
      scrollEase,
      cameraFov,
      cameraZ,
      onActiveChange,
    });

    return () => {
      instanceRef.current?.destroy();
      instanceRef.current = null;
    };
  }, [items, planeWidth, planeHeight, distortion, scrollEase, cameraFov, cameraZ, onActiveChange]);

  /* Capture wheel/touch ONLY on the canvas. At boundaries, let page scroll. */
  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      if (!instanceRef.current || !enabledRef.current) return; // disabled → page scrolls
      const consumed = instanceRef.current.onWheel(e);
      if (consumed) {
        e.preventDefault();  // only block page scroll if posters consumed it
      }
      // else: don't preventDefault → page scrolls normally
    };

    const handleTouchStart = (e: TouchEvent) => { instanceRef.current?.onTouchDown(e); };
    const handleTouchMove = (e: TouchEvent) => {
      if (!instanceRef.current) return;
      // Only prevent default if not at boundary
      const touch = e.touches[0];
      if (touch) {
        e.preventDefault();
        instanceRef.current.onTouchMove(e);
      }
    };
    const handleTouchEnd = () => { instanceRef.current?.onTouchUp(); };
    const handleMouseDown = (e: MouseEvent) => { instanceRef.current?.onTouchDown(e); };
    const handleMouseMove = (e: MouseEvent) => { instanceRef.current?.onTouchMove(e); };
    const handleMouseUp = () => { instanceRef.current?.onTouchUp(); };

    el.addEventListener('wheel', handleWheel, { passive: false });
    el.addEventListener('touchstart', handleTouchStart, { passive: true });
    el.addEventListener('touchmove', handleTouchMove, { passive: false });
    el.addEventListener('touchend', handleTouchEnd);
    el.addEventListener('mousedown', handleMouseDown);
    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseup', handleMouseUp);

    return () => {
      el.removeEventListener('wheel', handleWheel);
      el.removeEventListener('touchstart', handleTouchStart);
      el.removeEventListener('touchmove', handleTouchMove);
      el.removeEventListener('touchend', handleTouchEnd);
      el.removeEventListener('mousedown', handleMouseDown);
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <div ref={containerRef} className={`w-full h-full overflow-hidden relative ${className}`}>
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
