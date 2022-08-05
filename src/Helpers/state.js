export const addEffect = (state, field, callBack) => {
    return new Proxy(state, {
        set(target, property, value) {
            Reflect.set(target, property, value)
            if (property === field) {
                callBack()
            }
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