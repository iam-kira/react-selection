import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {
  ShapeEditor,
  ImageLayer,
  DrawLayer,
  wrapShape,
} from 'react-shape-editor';

function arrayReplace(arr, index, item) {
  return [
    ...arr.slice(0, index),
    ...(Array.isArray(item) ? item : [item]),
    ...arr.slice(index + 1),
  ];
}

const RectShape = wrapShape(({ width, height }) => (
  <rect width={width} height={height} fill="rgba(0,0,255,0.5)" />
));

let idIterator = 1;
const Editor = () => {
  const [items, setItems] = useState([
    { id: '1', x: 20, y: 120, width: 145, height: 140 },
    { id: '2', x: 15, y: 0, width: 150, height: 95 },
  ]);

  const [{ vectorHeight, vectorWidth }, setVectorDimensions] = useState({
    vectorHeight: 0,
    vectorWidth: 0,
  });

  return (
    <div>
      Click and drag to draw rects
      <br />
      <ShapeEditor vectorWidth={vectorWidth} vectorHeight={vectorHeight}>
        <ImageLayer id="hi"
          // Photo by Sarah Gualtieri on Unsplash
          // src="https://user-images.githubusercontent.com/4413963/70390894-a1880180-1a12-11ea-9901-e250d0f7bb2b.jpg"
          src="https://github.com/iam-kira/react-selection/blob/master/src/bg.jpg?raw=true"

          onLoad={({ naturalWidth, naturalHeight }) => {
            setVectorDimensions({
              vectorWidth: naturalWidth,
              vectorHeight: naturalHeight,
            });
          }}
        />
        <DrawLayer
          onAddShape={({ x, y, width, height }) => {
            setItems(currentItems => [
              ...currentItems,
              { id: `id${idIterator}`, x, y, width, height },
            ]);
            idIterator += 1;
          }}
        />
        {items.map((item, index) => {
          const { id, height, width, x, y } = item;
          return (
            <RectShape
              key={id}
              shapeId={id}
              height={height}
              width={width}
              x={x}
              y={y}
              onChange={newRect => {
                setItems(currentItems =>
                  arrayReplace(currentItems, index, {
                    ...item,
                    ...newRect,
                  })
                );
              }}
              onDelete={() => {
                setItems(currentItems => arrayReplace(currentItems, index, []));
              }}
            />
          );
        })}
      </ShapeEditor>
      <br />
    </div>
  );
};

const rootElement = document.getElementById('root');
ReactDOM.render(<Editor />, rootElement);
