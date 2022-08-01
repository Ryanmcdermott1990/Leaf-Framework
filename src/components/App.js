import Button from "./Button";
import Component from "../Component";
import DOMNode from "../Helpers/elements";
import Title from "./Title";
import {navigate} from "../index";

export default function App(mountPoint, transition) {
    this.node = new DOMNode(mountPoint, transition, {
        button: new Component(Button, false, {
            callBack: goToAbout, text: 'Go to about page'
        }),
        title: new Component(Title, false, {
            text: 'Try clicking the button below!',
            element: 'h4'
        })
    });

    function goToAbout() {
        navigate({state: null, path: '/about'})
    }

    const renderTemplate = () => {
        const {button, title} = this.node.children;
        return new Promise(async (myResolve) => {
            this.node.setHTML(`
                <div id="header">
                        <h1>Nested Functional Component Rendering!</h1>
                        <p>
                          An experiment to render functions as components in a nested fashion.
                          Components are rendered asynchronously to allow for the returned html to rely on computed data!
                          <strong>(No JSX needed)</strong>
                        </p>
                </div>
                <h3>This is the App.js Component</h3>
                <p>Below is a component mounted to the custom mount-point: ${mountPoint}</p>
                <div data-UUID="${title.target}"></div>
                <span data-UUID=${button.target}></span>`).then(() => {
                this.node.renderChildren();
                myResolve();
            })
        });
    }

    return renderTemplate();
}
