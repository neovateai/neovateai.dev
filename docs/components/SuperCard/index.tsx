import { CSSProperties, ReactNode, useEffect, useRef } from 'react';
import { useStyles } from './style';

interface SuperCardProps<T> {
  dataSources: T[];
  renderItem: (item: T) => ReactNode;
  gap?: number;
  spread?: number;
  proximity?: number;
  blur?: number;
  opacity?: number;
  startColor?: string;
  endColor?: string;
}

const SuperCard = ({
  dataSources,
  renderItem,
  proximity = 40,
  gap = 12,
  blur = 20,
  spread = 80,
  opacity = 0,
  startColor = '#3600ff',
  endColor = '#a08bff',
}: SuperCardProps<any>) => {
  const { styles, cx } = useStyles();
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const hotAreaDom = containerRef.current;
    const CARDS = document.querySelectorAll('article');

    const UPDATE = (event?: any) => {
      for (const CARD of CARDS) {
        const CARD_BOUNDS = CARD.getBoundingClientRect();
        if (
          event?.x > CARD_BOUNDS.left - proximity &&
          event?.x < CARD_BOUNDS.left + CARD_BOUNDS.width + proximity &&
          event?.y > CARD_BOUNDS.top - proximity &&
          event?.y < CARD_BOUNDS.top + CARD_BOUNDS.height + proximity
        ) {
          // If within proximity set the active opacity
          CARD.style.setProperty('--active', 1 as any);
        } else {
          CARD.style.setProperty('--active', opacity as any);
        }
        const CARD_CENTER = [
          CARD_BOUNDS.left + CARD_BOUNDS.width * 0.5,
          CARD_BOUNDS.top + CARD_BOUNDS.height * 0.5,
        ];
        let ANGLE =
          (Math.atan2(event?.y - CARD_CENTER[1], event?.x - CARD_CENTER[0]) *
            180) /
          Math.PI;
        ANGLE = isNaN(ANGLE) ? 90 : ANGLE < 0 ? ANGLE + 360 : ANGLE;
        CARD.style.setProperty('--start', (ANGLE + 90) as any);
      }
    };

    hotAreaDom?.addEventListener('pointermove', UPDATE, { passive: true });

    UPDATE();

    return () => {
      hotAreaDom?.removeEventListener('pointermove', UPDATE);
    };
  }, [gap]);

  return (
    <div
      ref={containerRef}
      className={styles.hotcontainer}
      style={
        {
          '--gap': gap,
          '--blur': blur,
          '--spread': spread,
          '--start-color': startColor,
          '--end-color': endColor,
        } as CSSProperties
      }
    >
      {dataSources.map((item, index) => {
        return (
          <article key={index}>
            <div className={styles.glows} />
            <div className={styles.hotAreaItem}>{renderItem(item)}</div>
          </article>
        );
      })}
    </div>
  );
};

export default SuperCard;
