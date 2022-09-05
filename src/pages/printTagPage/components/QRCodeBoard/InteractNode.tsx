import React, { useLayoutEffect, useRef, useState } from 'react';
import interact from 'interactjs';
import { InteractNodeProps, Position, Node } from './type';
import styles from './index.less';

const CELL_HEIGHT = 10;
const adjustLabel = (left, top) => {
  const xDiff = left % CELL_HEIGHT;
  let nx = left;
  if (xDiff < 5) {
    nx = Math.floor(left / CELL_HEIGHT) * CELL_HEIGHT;
  } else {
    nx = Math.ceil(left / CELL_HEIGHT) * CELL_HEIGHT;
  }
  const yDiff = top % CELL_HEIGHT;
  let ny = top;
  if (yDiff < 5) {
    ny = Math.floor(top / CELL_HEIGHT) * CELL_HEIGHT;
  } else {
    ny = Math.ceil(top / CELL_HEIGHT) * CELL_HEIGHT;
  }
  return { left: nx, top: ny };
};

const InteractNode = (props: InteractNodeProps) => {
  const {
    children,
    position,
    node,
    onChange,
    options,
    isActive,
    onChangeActive,
    openAutoAlignment,
  } = props;
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const interactObj = interact(ref.current!).draggable({
      listeners: {
        move(e) {
          const { target } = e;
          const { clientWidth: boardWidth, clientHeight: boardHeight } =
            target.parentNode;

          const maxTop = boardHeight - e.rect.height;
          const maxLeft = boardWidth - e.rect.width;
          let top = parseFloat(target.style.top) + e.dy;
          let left = parseFloat(target.style.left) + e.dx;
          top = Math.max(top, 0);
          top = Math.min(top, maxTop);
          left = Math.max(left, 0);
          left = Math.min(left, maxLeft);
          target.style.top = `${top}px`;
          target.style.left = `${left}px`;
        },
        end: (e) => {
          const { target } = e;
          const x = parseFloat(target.style.left);
          const y = parseFloat(target.style.top);
          const { left, top } = openAutoAlignment
            ? adjustLabel(x, y)
            : { left: x, top: y };
          target.style.top = `${top}px`;
          target.style.left = `${left}px`;

          if (onChange) {
            onChange({
              top,
              left,
            } as Position);
          }
        },
      },
    });

    const { ratio } = options || {};
    const modifiers: any[] = [
      interact.modifiers.restrictSize({
        min: { width: 10, height: 10 },
      }),
    ];
    if (ratio) {
      const aspectRatioModifier = interact.modifiers.aspectRatio({
        ratio,
      });
      modifiers.push(aspectRatioModifier);
    }
    interactObj
      .resizable({
        edges: {
          bottom: true,
          right: true,
        },
        margin: 3,
        modifiers,
      })
      .on('resizemove', (e) => {
        const { clientWidth: boardWidth, clientHeight: boardHeight } =
          e.target.parentNode;

        const { width, height } = e.rect;
        const top = parseFloat(e.target.style.top) + e.deltaRect.top;
        const left = parseFloat(e.target.style.left) + e.deltaRect.left;

        const maxTop = boardHeight - height;
        const maxLeft = boardWidth - width;

        if (top >= 0 && top <= maxTop) {
          Object.assign(e.target.style, {
            height: `${height}px`,
            top: `${top}px`,
          });
        }

        if (left >= 0 && left <= maxLeft) {
          Object.assign(e.target.style, {
            width: `${width}px`,
            left: `${left}px`,
          });
        }
      })
      .on('resizeend', (e) => {
        if (onChange) {
          onChange({
            width: parseFloat(e.rect.width),
            height: parseFloat(e.rect.height),
          } as Position);
        }
      });
  });

  useLayoutEffect(() => {
    const { left, width, top, height, style } = position;
    Object.assign(ref.current!.style, {
      left: `${left}px`,
      top: `${top}px`,
      width: `${width}px`,
      height: `${height}px`,
      ...style,
    });
  }, [position]);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleSaveLabel = (e: React.FocusEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange({ ...node, text: e.target.value } as Node);
    }
    setIsEdit(false);
  };
  const handleEnter = (event: any) => {
    if (event.key === 'Enter') {
      handleSaveLabel(event);
    }
  };
  const onDoubleClick = () => {
    if (node && node.type === 'label') {
      setIsEdit(true);
    }
  };
  const onClick = () => {
    if (onChangeActive && node) {
      onChangeActive(node);
    }
  };
  return (
    <div
      ref={ref}
      className={styles.labelStyle}
      style={{
        position: 'absolute',
        border: '1px solid #eaeaea',
        display: 'flex',
        alignItems: 'center',
        ...position,
        ...position.style,
        backgroundColor: isActive ? '#FFF566' : undefined,
      }}
      onDoubleClick={onDoubleClick}
      onClick={onClick}
    >
      {isEdit && isActive && node ? (
        <input
          className={styles.inputStyle}
          defaultValue={node.text}
          onBlur={handleSaveLabel}
          onKeyPress={handleEnter}
          onDragStart={(e) => e.stopPropagation()}
          style={{ outline: 'none' }}
        />
      ) : (
        children
      )}
    </div>
  );
};

export default InteractNode;
