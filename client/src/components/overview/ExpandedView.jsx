import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {PortalWithState} from 'react-portal';

const ModalContainer = styled.div `
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  max-height: 1000px;
  max-width: 1000px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;
`;

const ModalBody = styled.section `
  background-color: rgb(220, 245, 253);
  justify-content: center;
  align-items: center;
  padding: 10px;
  border: 1px solid black;
  border-radius: 10px;
  overflow: auto;
  display: flex;
  justify-content: center;
`;
const ModalImg = styled.img `
  object-fit: cover;
  background-position: ${(props) => (props.position)};
`;




// const handleMouseMove = (e) => {
//   const { left, top, width, height } = e.target.getBoundingClientRect();
//   const x = (e.pageX - left) / width * 100;
//   const y = (e.pageY - top) / height * 100;
//   setbackgroundPosition(`${x}% ${y}%`);
// };
// const ExpandedImageContainer = styled.img `
// width: 600px;
// background-repeat: no-repeat;
// background-position: ${(props) => (props.selected ? handleMouseMove() : '0% 0%')};

// &&:hover {
//   opacity: 0;
// }
// `;

// const ExpandedImage = styled.img `
//   display: block;
//   width: 100%;
//   pointer-events: none;
// `;
// const ExpandedContainer = styled.div `
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 100vh;
//   width: 100vw;
// `;

// class Zoom extends Component {
//   state = {
//     backgroundImage: `url(${src})`,
//     backgroundPosition: '0% 0%'
//   }




//   render = () =>
//     <figure onMouseMove={this.handleMouseMove} style={this.state}>
//       <img src={src} />
//     </figure>
// }

// ReactDOM.render(<Zoom />, document.getElementById('root'))
export default function CompareModal({ photo, open, close }) {

  const [background, setbackground] = useState('0% 0%');
  useEffect(() => {
    const mainEl = document.querySelector('main');

    if (open) {
      if (mainEl) {
        mainEl.style.filter = 'blur(3px)';
      }
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'auto';
      if (mainEl) {
        mainEl.style.filter = 'none';
      }
    };
  }, [open]);

  // const handleImageClick = (e) => {
  //   const { left, top, width, height } = e.target.getBoundingClientRect();
  //   const x = (e.pageX - left) / width * 100;
  //   const y = (e.pageY - top) / height * 100;
  //   console.log(x, y);
  //   setbackground(`${x}% ${y}%`);
  // };




  const renderPortal = ({ portal }) => {
    return portal(
      <div>
        <ModalContainer onClick={close}>
          <ModalBody>
            <ModalImg
              src={photo}
              // position={background}
              // onClick={(e) => handleImageClick(e)}
            ></ModalImg>
          </ModalBody>
        </ModalContainer>
      </div>
    );
  };
  if (open) {
    return (
      <PortalWithState defaultOpen closeOnEsc onClose={close}>
        {renderPortal}
      </PortalWithState>
    );
  } else {
    return null;
  }
}

// {imageClicked ? (
//   <ModalContainer>
//     <ModalBody><ModalImg
//       src={photo}
//       newPosition={renderNewPosition}
//     ></ModalImg></ModalBody></ModalContainer>

// ) : (
//   <ModalContainer>
//     <ModalBody><ModalImg
//       src={photo}
//       onClick={renderNewPosition}
//     ></ModalImg></ModalBody></ModalContainer>
// )}