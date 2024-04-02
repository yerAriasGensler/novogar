import AFRAME from 'aframe';

const scale = [1, 1, 1];
const scaleBig = [2, 2, 2];

AFRAME.registerComponent("waypoint", {
    schema: {
      to: {type: 'string', default: ""},
      pin_src_hover: { type: 'string', default: "" },
      src: { type: 'string', default: "" }
    },
    init: function() {
      // grab the "fading sphere"
      this.el.setAttribute("look-at", "#cam");
      // when clicked - emit the defined "startEvent"
      this.el.addEventListener("click", e => {
        let event = new CustomEvent("go-to", {'detail': {
          to: this.data.to,
        }});
        window.dispatchEvent(event);
      })

      this.el.addEventListener("click", e => {
        let event = new CustomEvent("go-to", {'detail': {
          to: this.data.to,
        }});
        window.dispatchEvent(event);
      })
      /*this.el.addEventListener('mouseenter', (e) => {
        console.log(this.data);
        this.el.setAttribute('scale', `${scaleBig[0]} ${scaleBig[1]} ${scaleBig[2]}`);
        this.el.setAttribute('src', this.data.pin_src_hover);
      })
      this.el.addEventListener('mouseleave', (e) => {
        this.el.setAttribute('scale', `${scale[0]} ${scale[1]} ${scale[2]}`);
        this.el.setAttribute('src', this.data.src);
      })*/
    }
})