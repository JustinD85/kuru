export function kuru(tagOrNodeFunction: any, attrs: any, ...children: any[]) {
    if (typeof tagOrNodeFunction === 'function') return tagOrNodeFunction({ ...attrs, ...children })//this allows for custom JSX functions(Components)
    if (Array.isArray(children[0])) children = children[0]//this allow for jsx to be put in array and rendered still

    return children.reduce((element, child) => (
        child instanceof HTMLElement && element.appendChild(child),
        (typeof child === 'string' || typeof child === 'number') && (element.appendChild(document.createTextNode(String(child)))),
        element),//returns the mutated element
        Object.assign(document.createElement(tagOrNodeFunction), attrs))//this allows attributes on elements, ie. class,id,etc..
}