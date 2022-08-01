import Button from "./Button";
import Component from "../Component";
import DOMNode from "../Helpers/elements";
import Title from "./Title";
import {navigate} from "../index";

export default function Nav(mountPoint, transition) {
    this.node = new DOMNode(mountPoint, transition, {
        title: new Component(
            Title, false, {
                text: 'Leaf Framework',
                class: 'logo'
            }
        ),
        homeButton: new Component(Button, false, {
            callBack: goToHome, text: 'home'
        }),
        aboutButton: new Component(Button, false, {
            callBack: goToAbout, text: 'about'
        })
    });

    function goToHome() {
        goTo('/')
    }

    function goToAbout() {
        goTo('about')
    }

    function goTo(path) {
        navigate({state: null, path: path})
    }

    const renderTemplate = () => {
        const {homeButton, aboutButton, title} = this.node.children;
        return new Promise(async (myResolve) => {
            this.node.setHTML(`
                <span data-UUID=${title.target} class="logo-wrapper"></span>
                <span class="nav-links-wrapper">
                <ul class="nav-links">
                    <li data-UUID=${homeButton.target}></li>
                    <li data-UUID=${aboutButton.target}></li>
                </ul>
                </span>
               `).then(() => {
                this.node.renderChildren();
                myResolve();
            })
        });
    }

    return renderTemplate();
}
