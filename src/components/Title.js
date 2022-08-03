import uuidv4 from "../Helpers/uuid";
import DOMNode from "../Helpers/elements";

export default function Title(mountPoint, transition, data) {
    this.node = new DOMNode(mountPoint, transition);

    const renderTemplate = () => {
        return new Promise(async (myResolve) => {
            const id = uuidv4();
            this.node.setHTML(`
                <${data.element ?? 'h2'} data-UUID=${id} class=${data.class ?? ''}>${data.text}</${data.element ?? 'h2'}>`).then(() => {
            }).then(() => {
                myResolve();
            })
        });
    }

    return renderTemplate();
}
