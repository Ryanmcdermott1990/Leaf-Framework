import Button from "./Button";
import Component from "../Component";
import DOMNode from "../Helpers/elements";
import Title from "./Title";
import {navigate} from "../index";

export default function Nav(mountPoint, transition) {
    this.node = new DOMNode(mountPoint, transition, {
        homeButton: new Component(Button, false, {
            callBack: goToHome, text: 'home'
        }),
        aboutButton: new Component(Button, false, {
            callBack: goToAbout, text: 'about'
        }),
        title: new Component(Title, false, {
            text: 'NavBar'
        })
    });

    function goToHome(){
        goTo('/')
    }

    function goToAbout(){
        goTo('about')
    }

    function goTo(path) {
        navigate({state: null, path: path} )
    }

    const renderTemplate = () => {
        const {homeButton, aboutButton, title} = this.node.children;
        return new Promise(async (myResolve) => {
            this.node.setHTML(`
                <div data-UUID="${title.target}"></div>
                <span data-UUID=${homeButton.target}></span>
                <span data-UUID=${aboutButton.target}></span>`).then(() => {
                this.node.renderChildren();
                myResolve();
            })
        });
    }

    return renderTemplate();
}
