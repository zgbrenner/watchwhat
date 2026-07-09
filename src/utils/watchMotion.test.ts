import { describe, expect, it } from "vitest"
import { PART_MOTION, handAngle } from "./watchMotion"

const TAU = Math.PI * 2

describe("handAngle", () => {
  it("points the second hand at 3 o'clock at 15 seconds", () => {
    const date = new Date(2026, 0, 1, 10, 0, 15, 0)
    // 3 o'clock is a quarter turn clockwise → -TAU/4.
    expect(handAngle("second", date, "manual")).toBeCloseTo(-TAU / 4, 5)
  })

  it("sweeps the mechanical second hand smoothly between ticks", () => {
    const date = new Date(2026, 0, 1, 10, 0, 15, 500)
    expect(handAngle("second", date, "automatic")).toBeCloseTo(-(15.5 / 60) * TAU, 5)
  })

  it("ticks the quartz second hand in whole seconds", () => {
    const date = new Date(2026, 0, 1, 10, 0, 15, 500)
    expect(handAngle("second", date, "quartz")).toBeCloseTo(-(15 / 60) * TAU, 5)
  })

  it("advances the hour hand fractionally as minutes pass", () => {
    const date = new Date(2026, 0, 1, 3, 30, 0, 0)
    // 3:30 → hour hand 3.5/12 of a turn clockwise.
    expect(handAngle("hour", date, "manual")).toBeCloseTo(-(3.5 / 12) * TAU, 5)
  })
})

describe("PART_MOTION", () => {
  it("drives the three hands and the balance wheel", () => {
    expect(PART_MOTION["hand-hour"]).toEqual({ kind: "hand", unit: "hour" })
    expect(PART_MOTION["hand-minute"]).toEqual({ kind: "hand", unit: "minute" })
    expect(PART_MOTION["hand-second"]).toEqual({ kind: "hand", unit: "second" })
    expect(PART_MOTION["wheel-balance"].kind).toBe("oscillate")
  })
})
