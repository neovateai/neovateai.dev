import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css }) => ({
  container: css`

    .hotProductBox {
      width: 100%;
      position: absolute;
      bottom: 26px;
      height: auto;
      background-origin: content-box;

      // 动画区域

  `,
  hotcontainer: css`
    --bg: hsl(246deg 44% 7%);
    --border: hsl(280deg 10% 50% / 1);
    --card: hsl(237deg 36% 10%);
    --color: hsl(240deg 18% 80%);
    --border-width: 2px;
    --border-radius: 12px;
    // --gradient: conic-gradient(
    //   from 180deg at 50% 70%,
    //   hsla(0deg, 0%, 98%, 1) 0deg,
    //   #eec32d 72deg,
    //   #ec4b4b 144deg,
    //   #709ab9 216deg,
    //   #4dffbf 288deg,
    //   hsla(0deg, 0%, 98%, 1) 1turn
    // );
    @property --start-color {
      syntax: '<color>';
      inherits: true;
      initial-value: #3600ff;
    }
    @property --end-color {
      syntax: '<color>';
      inherits: true;
      initial-value: #a08bff;
    }

    --gradient: conic-gradient(
      from 180deg at 50% 70%,
      hsla(0deg, 0%, 98%, 1) 0deg,
      var(--start-color) 72deg,
      var(--end-color) 144deg,
      var(--end-color) 216deg,
      var(--start-color) 288deg,
      hsla(0deg, 0%, 98%, 1) 1turn
    );

    @property --start {
      syntax: '<number>';
      inherits: true;
      initial-value: 0;
    }

    box-sizing: border-box;

    --spread: 60;

    display: flex;
    // flex-wrap: wrap;
    flex-flow: wrap;
    flex-direction: var(--direction);
    gap: calc(var(--gap) * 1px);
    margin: 0 auto;
    justify-content: center;
    place-items: center;
    position: relative;
    touch-action: none;

    article {
      box-sizing: border-box;

      --active: 0.15;
      --start: 0;

      background: var(--card);
      border-radius: var(--border-radius);
      display: flex;
      flex-direction: column;
      gap: 12px;
      position: relative;
    }

    article:is(:hover, :focus-visible) {
      box-sizing: border-box;
      z-index: 2;
    }

    article::before {
      box-sizing: border-box;
      position: absolute;
      inset: 0;
      border: var(--border-width) solid transparent;
      content: '';
      border-radius: var(--border-radius);
      pointer-events: none;
      background: var(--border);
      background-attachment: fixed;
      mask: linear-gradient(#0000, #0000),
        conic-gradient(
          from
            calc(
              ((var(--start) + (var(--spread) * 0.25)) - (var(--spread) * 1.5)) *
                1deg
            ),
          hsl(0deg 0% 100% / 0.15) 0deg,
          white,
          hsl(0deg 0% 100% / 0.15) calc(var(--spread) * 2.5deg)
        );
      mask-clip: padding-box, border-box;
      mask-composite: intersect;
      opacity: var(--active);
      transition: opacity 1s;
    }

    article::after {
      box-sizing: border-box;

      --bg-size: 100%;

      content: '';
      pointer-events: none;
      position: absolute;
      background: var(--gradient);
      background-attachment: fixed;
      border-radius: var(--border-radius);
      opacity: var(--active, 0);
      transition: opacity 1s;

      --alpha: 0;

      inset: 0;
      border: var(--border-width) solid transparent;
      mask: linear-gradient(#0000, #0000),
        conic-gradient(
          from
            calc(
              ((var(--start) + (var(--spread) * 0.25)) - (var(--spread) * 0.5)) *
                1deg
            ),
          #0000 0deg,
          #fff,
          #0000 calc(var(--spread) * 0.5deg)
        );
      filter: brightness(1.5);
      mask-clip: padding-box, border-box;
      mask-composite: intersect;
    }
  `,
  hotAreaItem: css`
    cursor: pointer;
    background-image: linear-gradient(-29deg, #000000 3%, #1a1a1a 100%);
    border: 1px solid rgba(61, 61, 61, 0.38);
    box-shadow:
      0 32px 53px -21px rgba(0, 0, 0, 0.77),
      0 3px 29px -16px rgba(0, 0, 0, 0.18);
    border-radius: 12px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
  `,
  glows: css`
    box-sizing: border-box;
    pointer-events: none;
    position: absolute;
    inset: 0;
    filter: blur(calc(var(--blur) * 1px));

    &::after,
    &::before {
      box-sizing: border-box;

      --alpha: 0;

      content: '';
      background: var(--gradient);
      background-attachment: fixed;
      position: absolute;
      inset: -5px;
      border: 10px solid transparent;
      border-radius: var(--border-radius);
      mask: linear-gradient(#0000, #0000),
        conic-gradient(
          from calc((var(--start) - (var(--spread) * 0.5)) * 1deg),
          #000 0deg,
          #fff,
          #0000 calc(var(--spread) * 1deg)
        );
      mask-composite: intersect;
      mask-clip: padding-box, border-box;
      opacity: var(--active);
      transition: opacity 1s;
    }
  `,
}));
