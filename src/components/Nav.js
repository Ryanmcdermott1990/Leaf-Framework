import Button from "./Button";
import Component from "../Component";
import DOMNode from "../Helpers/elements";
import Title from "./Title";
import {navigate} from "../index";
import Link from "./Link";

export default function Nav(mountPoint, transition) {
    this.node = new DOMNode(mountPoint, transition, {
        link: new Component(
            Link, false, {
                children: {
                    text: new Component(Title, false, {
                        text: 'Leaf',
                        callBack: () => navigate({state: null, path: '/'})
                    })
                }
            }
        ),
        homeButton: new Component(Button, false, {
            callBack: () => goTo('/'), text: 'home'
        }),
        aboutButton: new Component(Button, false, {
            callBack: () => goTo('about'), text: 'about'
        }),
        postsButton: new Component(Button, false, {
            callBack: () => goTo('posts'), text: 'posts'
        })
    });

    function goTo(path) {
        navigate({state: null, path: path})
    }

    const renderTemplate = () => {
        const {homeButton, aboutButton, link, postsButton} = this.node.children;
        return new Promise(async (myResolve) => {
            this.node.setHTML(`
                <span data-UUID=${link.target} class="logo-wrapper"></span>
                <span class="nav-links-wrapper">
                <ul class="nav-links">
                    <li data-UUID=${homeButton.target}></li>
                    <li data-UUID=${aboutButton.target}></li>
                    <li data-UUID=${postsButton.target}></li>
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
