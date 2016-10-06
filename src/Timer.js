class Timer {
    constructor({ms = 0, interval = 100} = {}) {
        this.ms = ms;
        this.interval = interval;
        this._timeout = null;
        this._previousTime = null;
    }

    start() {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(this._tick.bind(this), this._interval);
    }

    pause() {
        clearTimeout(this.timeout);
        this._update();
        this._previousTime = null;
    }

    reset() {
        clearTimeout(this.timeout);
        this.ms = 0;
    }

    getTime() {
        let ms = this.ms % 1000;
        let seconds = Math.floor(this.ms / 1000) % 60;
        let minutes = (Math.floor(Math.floor(this.ms / 1000) / 60) % 60);
        let hours = Math.floor(Math.floor(Math.floor(this.ms / 1000) / 60) / 60);
        return {
            ms,
            seconds,
            minutes,
            hours
        };
    }

    _update() {
        let time = (new Date()).getTime();
        if (this._previousTime) {
            this.ms += time - this._previousTime;
        } else {
            this.ms += this.interval;
        }
        return time;
    }

    _tick() {
        this._previousTime = this._update();
        this.timeout = setTimeout(this._tick.bind(this), this._interval);
    }
}
