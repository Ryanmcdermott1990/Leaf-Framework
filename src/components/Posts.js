import Component from "../Component";
import DOMNode from "../Helpers/elements";
import Button from "./Button";
import {createState, refreshContent} from "../Helpers/state";

export default function Posts(mountPoint, transition) {
    this.node = new DOMNode(mountPoint, transition, {
        button: new Component(Button, false, {
            text: 'create posts', callBack: changeState
        })
    });

    this.expressions = {
        posts: () => `${state.posts && Array.isArray(state.posts) && state.posts.map(post => 
            `
                <h4>${post.name}</h4>
                <p>${post.body}</p>
            `
        ).join('')}`
    }

    let state = createState({
            posts: []
        },
        this.expressions,
        this.node.element
    )

    function changeState() {
        state.posts = [
            {name: 'test post 1', body: 'this is a test post'},
            {name: 'test post 2', body: 'this is another test post'}
        ]
    }

    const renderTemplate = () => {
        const {button} = this.node.children;
        return new Promise(async (myResolve) => {
            this.node.setHTML(`
                    <span data-UUID=${button.target}></span>
                    <div state="posts" template="posts"></div>
                `).then(() => {
                this.node.renderChildren();
                myResolve();
            })
        });
    }

    return renderTemplate();
}
