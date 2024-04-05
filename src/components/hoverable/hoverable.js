import AFRAME from 'aframe';

const scale = [1, 1, 1];
const scaleBig = [1.2, 1.2, 1.2];

AFRAME.registerComponent('hoverable', {
    schema: {
      pin_src: { type: 'string' },
      pin_src_hover: { type: 'string' } 
    },
    init: function () {

      this.el.addEventListener('mouseenter', (e) => {
        this.el.setAttribute('scale', `${scaleBig[0]} ${scaleBig[1]} ${scaleBig[2]}`);
        this.el.setAttribute('src', this.data.pin_src_hover);
      })
      this.el.addEventListener('mouseleave', (e) => {
        this.el.setAttribute('scale', `${scale[0]} ${scale[1]} ${scale[2]}`);
        this.el.setAttribute('src', this.data.pin_src);
      })  
    }
  });
  