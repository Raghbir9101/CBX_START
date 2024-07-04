// import React from 'react';
// import { useDrag } from 'react-dnd';
// import { Box } from '@mui/material';

// const ItemTypes = {
//   ITEM: 'item',
// };

// function DraggableItem({ item, index, itemIndex }) {
//   const [{ isDragging }, drag] = useDrag({
//     type: ItemTypes.ITEM,
//     item: { index, itemIndex },
//     collect: (monitor) => ({
//       isDragging: monitor.isDragging(),
//     }),
//   });

//   return (
//     <Box
//       ref={drag}
//       sx={{
//         opacity: isDragging ? 0.5 : 1,
//         backgroundColor: 'white',
//         minHeight: '100px',
//         margin: '10px 0',
//       }}
//     >
//       {item.type}
//     </Box>
//   );
// }

// export default DraggableItem;


// DraggableItem.js
import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Box } from '@mui/material';
import { useSpring, animated } from '@react-spring/web';

const ItemTypes = {
  ITEM: 'item',
};

function DraggableItem({ item, index, itemIndex, moveItem, findItem }) {
  const originalIndex = findItem(index, itemIndex).itemIndex;

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.ITEM,
    item: { index, itemIndex, originalIndex },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      const { index: droppedIndex, itemIndex: droppedItemIndex } = findItem(item.index, item.itemIndex);
      if (!monitor.didDrop()) {
        moveItem(item.index, droppedIndex, item.originalIndex);
      }
    },
  });

  const [, drop] = useDrop({
    accept: ItemTypes.ITEM,
    hover({ index: draggedIndex, itemIndex: draggedItemIndex }) {
      if (draggedIndex !== index || draggedItemIndex !== itemIndex) {
        const { itemIndex: overIndex } = findItem(index, itemIndex);
        moveItem(draggedIndex, index, draggedItemIndex, overIndex);
      }
    },
  });

  const springProps = useSpring({
    opacity: isDragging ? 0.5 : 1,
    transform: isDragging ? 'scale(0.95)' : 'scale(1)',
  });

  return (
    <animated.div style={springProps}>
      <Box
        ref={(node) => drag(drop(node))}
        sx={{
          backgroundColor: 'white',
          minHeight: '100px',
          margin: '10px 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'move',
        }}
      >
        {item.type}
      </Box>
    </animated.div>
  );
}

export default DraggableItem;
