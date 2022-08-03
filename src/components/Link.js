import uuidv4 from "../Helpers/uuid";
import DOMNode from "../Helpers/elements";
import Component from "../Component";
import Title from "./Title";

export default function Link(mountPoint, transition, data) {
    this.node = new DOMNode(mountPoint, transition, {
        ...data.children
    });

    const renderTemplate = () => {
        return new Promise(async (myResolve) => {
            const {text} = this.node.children;
            this.node.setHTML(`
                <div data-UUID=${text.target} class="link"></div>`).then(() => {
                this.node.getElement(text).addEventListener('click', text.data.callBack);
            }).then(() => {
                this.node.renderChildren();
                myResolve();
            })
        });
    }

    return renderTemplate();
}
