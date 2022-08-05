import Component from "../Component";
import DOMNode, {sanitizeHTML} from "../Helpers/elements";
import Button from "./Button";
import {addEffect, createState} from "../Helpers/state";
import uuidv4 from "../Helpers/uuid";

export default function Posts(mountPoint, transition) {
    this.node = new DOMNode(mountPoint, transition, {
        button: new Component(Button, false, {
            text: 'create post', callBack: createPost
        })
    });

    this.node.expressions = {
        posts: () => `${postState.posts && Array.isArray(postState.posts) && postState.posts.map(post =>
            `<div style="background-color: white; min-height: 30px; padding: 20px">
                <h4>${post?.name ?? ''}</h4>
                <p>${post?.body ?? ''}</p>
            </div>
            `
        ).join('')}`
    }

    let postState = this.node.createState({
        posts: []
    });
    let textState = this.node.createState({
        text: {name: null, body: null}
    });

    postState = addEffect(postState, 'posts', () => console.log('change posts'))
    textState = addEffect(textState, 'text', () => console.log('change text'))

    function createPost() {
        const newState = [...postState.posts];
        newState.push({...textState.text});
        postState.posts = newState;
    }

    function setText(e, field) {
        const newState = {...textState.text}
        newState[field] = sanitizeHTML(e.target.value);
        textState.text = newState;
    }

    const renderTemplate = () => {
        const {button} = this.node.children;
        return new Promise(async (myResolve) => {
            const nameId = uuidv4();
            const bodyID = uuidv4();
            this.node.setHTML(`
                    <div style="margin: 20px; display: flex; flex-direction: column; gap: 20px">
                    <div>
                        <label>name</label>
                        <input data-UUID="${nameId}"></input>
                    </div>
                    <div>
                        <label>body</label>
                        <input data-UUID="${bodyID}"></input>
                    </div>
                        <span data-UUID=${button.target}></span>
                    </div>
                    <div state="posts" template="posts"></div>
                `).then(() => {
                this.node.getElement(nameId).addEventListener('keyup', (e) => setText(e, 'name'));
                this.node.getElement(bodyID).addEventListener('keyup', (e) => setText(e, 'body'));
                this.node.renderChildren();
                myResolve();
            })
        });
    }

    return renderTemplate();
}
