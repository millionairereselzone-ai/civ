# Animated five-bar chart

A six-second, 1920 × 1080 Remotion composition at 30 fps. Five independently editable bars rise in sequence; their counters animate to illustrative values 35, 52, 68, 81, and 95.

## Develop

```sh
npm ci
npm run dev
```

Select `FiveBars` in Remotion Studio. Edit each bar's label, value (0–100), and color in `src/Composition.tsx` or Studio.

## Validate

```sh
npm run typecheck
npm run build
```

No external credentials or assets are required. Node.js 24 is verified. The chart holds its final values from second 3 to second 6.
