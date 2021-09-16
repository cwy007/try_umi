import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

const type = 'DraggableBodyRow';

const DraggableBodyRow = ({
  index,
  moveRow,
  className,
  style,
  ...restProps
}: any) => {
  const ref = useRef();

  // dropTarget
  const [{ isOver, dropClassName }, drop] = useDrop({
    // 对应 useDrap 中的type
    accept: type,
    collect: (monitor) => {
      const { index: dragIndex } = monitor.getItem<{ index: number }>() || {};
      if (dragIndex === index) {
        return {};
      }

      // 返回值对应解构中的第一个元素
      return {
        isOver: monitor.isOver(),
        dropClassName:
          dragIndex < index ? ' drop-over-downward' : ' drop-over-upward',
      };
    },
    drop: (item: { index: number }) => {
      // dragIndex dropIndex
      moveRow(item.index, index);
    },
  });

  const [, drag] = useDrag({
    type,
    item: { index }, // index 为行标识
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drop(drag(ref));

  return (
    <tr
      ref={ref}
      className={`${className}${isOver ? dropClassName : ''}`}
      style={{ cursor: 'move', ...style }}
      {...restProps}
    />
  );
};

export default DraggableBodyRow;
