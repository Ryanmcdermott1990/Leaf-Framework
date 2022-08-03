import uuidv4 from "../Helpers/uuid";
import DOMNode from "../Helpers/elements";

export default function Button(mountPoint, transition, data) {
  this.node = new DOMNode(mountPoint, transition);

  const renderTemplate = () => {
    return new Promise(async (myResolve) => {
      const id = uuidv4();
      this.node.setHTML(`
                <button data-UUID=${id}>${data.text}</button>`).then(() => {
        this.node.element.querySelector(`[data-UUID="${id}"]`).addEventListener('click', data.callBack);
      }).then(() => {
        myResolve();
      })
    });
  }

  return renderTemplate();
}
