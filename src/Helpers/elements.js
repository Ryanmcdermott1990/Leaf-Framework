import {refreshContent} from "./state";

export default function DOMNode(mountPoint, transition, components = null) {
    this.element = document.querySelector(`[data-UUID="${mountPoint}"]`);
    this.element.classList.add('active');
    this.setHTML = (markup) => new Promise(async (myResolve) => {
        if (transition) {
            this.element.classList.add('hide');
            setTimeout(() => {
                this.element.classList.remove('hide');
                this.element.innerHTML += markup;
                myResolve();
            }, transition)
        } else {
            this.element.innerHTML = markup;
            myResolve();
        }
    })
    this.renderChildren = () => {
    }
    if (components && Object.entries(components)) {
        this.children = components;
        this.renderChildren = () => {
            Object.values(this.children).forEach(child => {
                const element = this.getElement(child);
                if (element) {
                    child.component(child.target, child.transition, child.data)
                }
            })
        }
    }
    this.getElement = (target) => {
        let mountPoint = null;
        if (typeof target === 'object') {
            mountPoint = target.target;
        } else if (typeof target === 'string') {
            mountPoint = target;
        }
        return this.element.querySelector(`[data-UUID="${mountPoint}"]`);
    }
    this.createState = (state) => {
        const expressions = this.expressions;
        const template = this.element;
        return new Proxy(state, {
            set(target, property, value) {
                target[property] = value;
                refreshContent(Object.keys(state)[0], expressions, template);
                return true;
            }
        });
    };
    return this;
}

export const sanitizeHTML = function (str) {
    const temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
};