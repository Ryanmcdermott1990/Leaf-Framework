export const createState = (state, expressions, template, callBacks = null) => {
    return new Proxy(state, {
        set(target, property, value) {
            target[property] = value;
            refreshContent(Object.keys(state)[0], expressions, template);
            if (callBacks && Array.isArray(callBacks)) {
                callBacks.forEach(func => func(target[property]));
            }
            return true;
        }
    });
};

export const addEffect = (state, callBack) => {
    return new Proxy(state, {
        set(target, property, value) {
            Reflect.set(target, property, value)
            callBack()
            return true;
        }
    })
};

export const refreshContent = (state, expressions, template) => {
    const refreshElements = template.querySelectorAll(`[state="${state}"]`);
    if (refreshElements) {
        refreshElements.forEach(element => {
            element.innerHTML = expressions[element.getAttribute('template')]();
        })
    }
}