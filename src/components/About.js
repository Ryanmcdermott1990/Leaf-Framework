import Component from "../Component";
import DOMNode from "../Helpers/elements";
import Title from "./Title";
import Button from "./Button";
import {addEffect, createState} from "../Helpers/state";

export default function About(mountPoint, transition) {
    this.node = new DOMNode(mountPoint, transition, {
        title: new Component(Title, false, {
            text: 'This is the About page!'
        }),
        button: new Component(Button, 200, {
            callBack: changeState, text: 'Increase counter'
        })
    });

    this.node.expressions = {
        stateCount: () => `Count: <strong>${state?.count}</strong>`
    }

    let state =  this.node.createState({
          count: 0
        }
    );

    function changeState() {
        state.count = state.count + 1
    }

    function consoleCount() {
        console.log(state.count);
    }

    const renderTemplate = () => {
        const {title, button} = this.node.children;
        return new Promise(async (myResolve) => {
            this.node.setHTML(`
                    <span data-UUID=${title.target}></span>
                    <p state="count" template="stateCount">${this.node.expressions.stateCount()}</strong></p>
                    <span data-UUID=${button.target}></span>
                `).then(() => {
                this.node.renderChildren();
                myResolve();
            })
        });
    }

    return renderTemplate();
}
