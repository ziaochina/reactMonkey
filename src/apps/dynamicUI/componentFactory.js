 class ComponentFactory {
    constructor() {
        this.componentsById = {}
        this.defaultComponents = {}
    }

    registerComponent(id, component) {
        this.componentsById[id] = component;
    }

    registerComponents( components) {
        this.componentsById = {...this.componentsById, ...components}
    }

    getComponent(id) {
        var component = this.componentsById[id];

        if (!component) {
            debugger
            throw `没有组件. Id: ${id}`;
        }
        return this.componentsById[id];
    }

    getComponents() {
        return this.componentsById
    }
    

    getDefaultComponent(type) {

        if (!type) {
            debugger
            throw 'type没有值';
        }
        if (this.defaultComponents[type])
            return this.getComponent(this.defaultComponents[type]);
        debugger
        throw new Error(`没有组件. Type: ${type}`);
    }

    setDefaultComponents(components) {
        this.defaultComponents = components;
    }

}

export default new ComponentFactory()