class EventSystem {
    constructor() {
        this._actions = {};
    }

    bind(type, action) {
        if (!this._actions[type]) {
            this._actions[type] = [action];
        } else {
            this._actions[type].push(action);
        }
    }

    unbind(type, action) {
        let actionIndex;

        if (this._actions[type]) {
            actionIndex = this._actions[type].indexOf(action);
            if (actionIndex !== -1) {
                this._actions[type].splice(actionIndex);
                return true;
            }
        }

        return false;
    }

    trigger(type) {
        let triggerActions = this._actions[type];
        let argumentsAfterType = Array.prototype.slice.call(arguments).slice(1, arguments.length);

        if (triggerActions) {
            for (let i = 0; i < triggerActions.length; i++) {
                triggerActions[i].apply(this, argumentsAfterType);
            }
        }
    }
}

module.exports = EventSystem;