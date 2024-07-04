// import React from 'react';
// import { useDrop } from 'react-dnd';
// import DraggableItem from './DraggableItem';
// import { Box } from '@mui/material';

// const ItemTypes = {
//   ITEM: 'item',
// };

// function DroppableArea({ items, index, moveItem }) {
//   const [{ isOver }, drop] = useDrop({
//     accept: ItemTypes.ITEM,
//     drop: (item) => {
//       moveItem(item.index, index, item.itemIndex);
//     },
//     collect: (monitor) => ({
//       isOver: monitor.isOver(),
//     }),
//   });

//   return (
//     <Box
//       ref={drop}
//       sx={{
//         backgroundColor: isOver ? '#0000004f' : '#0000001f',
//         flex: 1,
//         display: 'flex',
//         flexDirection: 'column',
//         gap: '10px',
//         minHeight: '500px',
//       }}
//     >
//       {items.map((item, itemIndex) => (
//         <DraggableItem key={itemIndex} item={item} index={index} itemIndex={itemIndex} />
//       ))}
//     </Box>
//   );
// }

// export default DroppableArea;


// DroppableArea.js
import React from 'react';
import { useDrop } from 'react-dnd';
import { Box } from '@mui/material';
import DraggableItem from './DraggableItem';
import { useSpring, animated } from '@react-spring/web';

const ItemTypes = {
  ITEM: 'item',
};

function DroppableArea({ items, index, moveItem, findItem }) {
  const [, drop] = useDrop({
    accept: ItemTypes.ITEM,
    drop: (item) => {
      const { index: fromBoxIndex, itemIndex: fromItemIndex } = item;
      moveItem(fromBoxIndex, index, fromItemIndex);
    },
  });

  const springProps = useSpring({
    backgroundColor: '#0000001f',
  });

  return (
    <animated.div style={springProps}>
      <Box
        ref={drop}
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          minHeight: '500px',
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '4px',
        }}
      >
        {items.map((item, itemIndex) => (
          <DraggableItem
            key={itemIndex}
            item={item}
            index={index}
            itemIndex={itemIndex}
            moveItem={moveItem}
            findItem={findItem}
          />
        ))}
      </Box>
    </animated.div>
  );
}

export default DroppableArea;
