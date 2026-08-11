// Point-matched morph keyframes for the nav burger: anahtar-logo mark ↔
// 2-bar hamburger ↔ close (X). Each keyframe's `a` (14 pts) and `b` (4 pts)
// arrays share point counts across keyframes so a straight per-vertex lerp
// always yields a valid, non-crossing path — mirrors the anahtar-logo.svg
// path data (evenodd outline + inner square) scaled to its own 810x270 viewBox.

// Subpath `b` is listed TL,TR,BR,BL (same winding + starting corner) in every
// keyframe below — keeps the a/b lerp correspondence untwisted across both
// segments, and gives bars/close the matching winding `nonzero` needs so the
// X's crossing arms union solid instead of cancelling into a hole.
const KF_ANAHTAR = {
  a: [
    [0, 0], [810, 0], [810, 270], [540, 270], [540, 90], [180, 90],
    [180, 180], [270, 180], [270, 270], [0, 270], [0, 180], [90, 180],
    [90, 90], [0, 90],
  ],
  b: [[630, 90], [720, 90], [720, 180], [630, 180]],
}

const KF_BARS = {
  a: [
    [0, 45], [135, 45], [270, 45], [405, 45], [540, 45], [675, 45], [810, 45],
    [810, 105], [675, 105], [540, 105], [405, 105], [270, 105], [135, 105], [0, 105],
  ],
  b: [[0, 165], [810, 165], [810, 225], [0, 225]],
}

// X arms are rotated ±15° (not ±45°) and kept at the same 60pt thickness as
// KF_BARS — a shallower angle trades diagonal steepness for horizontal reach,
// so each arm spans almost the full 810x270 viewBox edge-to-edge like the
// bars do, instead of a stubby, over-thick cross floating in the center.
const KF_CLOSE = {
  a: [
    [28.24, 2.82], [156.42, 37.22], [284.59, 71.62], [412.77, 106.02],
    [540.94, 140.42], [669.12, 174.82], [797.29, 209.22], [781.76, 267.18],
    [653.59, 232.78], [525.41, 198.38], [397.24, 163.98], [269.06, 129.58],
    [140.89, 95.18], [12.71, 60.78],
  ],
  b: [[12.71, 209.22], [781.76, 2.82], [797.29, 60.78], [28.24, 267.18]],
}

export const BURGER_KEYFRAMES = [KF_ANAHTAR, KF_BARS, KF_CLOSE]

function lerp(a, b, t) {
  return a + (b - a) * t
}

function pointsToD(points) {
  return points.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`).join(' ') + 'Z'
}

function lerpPoints(from, to, t) {
  return from.map(([x, y], i) => {
    const [tx, ty] = to[i]
    return [lerp(x, tx, t), lerp(y, ty, t)]
  })
}

// phase is continuous 0..2 across [anahtar, bars, close]. Both subpaths are
// combined into a single path. Segment 0->1 (anahtar->bars) needs evenodd so
// subpath b reads as anahtar-logo's cut-out gap, not a filled block. Segment
// 1->2 (bars->close) needs nonzero: the two arms overlap to form the X, and
// with matching winding nonzero unions that overlap solid instead of holing
// it out the way evenodd would.
export function burgerDAtPhase(phase) {
  const clamped = Math.max(0, Math.min(2, phase))
  const seg = Math.min(1, Math.floor(clamped))
  const t = clamped - seg
  const from = BURGER_KEYFRAMES[seg]
  const to = BURGER_KEYFRAMES[Math.min(seg + 1, 2)]
  const d =
    pointsToD(lerpPoints(from.a, to.a, t)) + ' ' + pointsToD(lerpPoints(from.b, to.b, t))
  return { d, fillRule: seg === 0 ? 'evenodd' : 'nonzero' }
}

// Matches --ease-spring: cubic-bezier(0.22, 1, 0.36, 1)
export function easeSpring(x) {
  const x1 = 0.22, y1 = 1, x2 = 0.36, y2 = 1
  const cx = 3 * x1, bx = 3 * (x2 - x1) - cx, ax = 1 - cx - bx
  const cy = 3 * y1, by = 3 * (y2 - y1) - cy, ay = 1 - cy - by
  const sampleX = (t) => ((ax * t + bx) * t + cx) * t
  const sampleY = (t) => ((ay * t + by) * t + cy) * t
  let t = x
  for (let i = 0; i < 8; i++) {
    const dx = sampleX(t) - x
    const d = (3 * ax * t + 2 * bx) * t + cx
    if (Math.abs(d) < 1e-6) break
    t -= dx / d
  }
  return sampleY(t)
}
