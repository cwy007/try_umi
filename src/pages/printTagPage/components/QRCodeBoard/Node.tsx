/* eslint-disable react/require-default-props */
import React, { CSSProperties } from 'react';
import { InteractNodeProps } from './type';
import InteractNode from './InteractNode';

const Node = ({
  mode,
  children,
  style,
  ...props
}: {
  mode?: 'display' | 'edit'; // 默认 display
  style?: CSSProperties;
} & InteractNodeProps) => {
  if (mode === 'edit') {
    return <InteractNode {...props}>{children}</InteractNode>;
  }
  const { position } = props;
  return (
    <div
      style={{
        display: 'flex',
        position: 'absolute',
        alignItems: 'center',
        ...position,
        ...(style || {}),
      }}
    >
      {children}
    </div>
  );
};

export default Node;
