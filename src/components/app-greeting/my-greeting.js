import { registerTemplate, registerComponent, LightningElement, registerDecorators } from '@lwc/engine';

function stylesheet(hostSelector, shadowSelector, nativeShadow) {
  return [".greet", shadowSelector, " {font-size: xx-large;}\n.fade-fast", shadowSelector, " {opacity: 0;animation: fade-in 1s;}\n.fade-slow", shadowSelector, " {opacity: 0;animation: fade-in 5s;}\n.fade-medium", shadowSelector, " {opacity: 0;animation: fade-in 2s;}\n@keyframes fade-in {0% {opacity: 0;}\n35% {opacity: 1;}\n65% {opacity: 1;}\n100% {opacity: 0;}\n}.hide", shadowSelector, " {opacity: 0;}\n"].join('');
}
var _implicitStylesheets = [stylesheet];

function tmpl($api, $cmp, $slotset, $ctx) {
  const {
    d: api_dynamic,
    h: api_element,
    b: api_bind
  } = $api;
  const {
    _m0
  } = $ctx;
  return [api_element("div", {
    className: $cmp.animationClass,
    key: 1,
    on: {
      "animationend": _m0 || ($ctx._m0 = api_bind($cmp.handleAnimationEnd))
    }
  }, [api_element("span", {
    classMap: {
      "greet": true
    },
    key: 0
  }, [api_dynamic($cmp.greeting)])])];
}

var _tmpl = registerTemplate(tmpl);
tmpl.stylesheets = [];

if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets);
}
tmpl.stylesheetTokens = {
  hostAttribute: "my-greeting_greeting-host",
  shadowAttribute: "my-greeting_greeting"
};

const greetings = ['Hello', 'Bonjour', '你好', 'Hola', 'Привет', 'こんにちは', 'Guten Tag', 'ጤና ይስጥልኝ', 'Ciao', 'नमस्ते', '안녕하세요'];
const SPEED_CLASS_MAP = {
  slow: 'fade-slow',
  fast: 'fade-fast',
  medium: 'fade-medium'
};
const DEFAULT_SPEED = 'medium';

class Greeting extends LightningElement {
  constructor(...args) {
    super(...args);
    this.animationSpeed = DEFAULT_SPEED;
    this.index = 0;
    this.isAnimating = true;
  }

  set speed(value) {
    if (SPEED_CLASS_MAP[value]) {
      this.animationSpeed = value;
    } else {
      this.animationSpeed = DEFAULT_SPEED;
    }

    this.isAnimating = true;
  } // Return the internal speed property


  get speed() {
    return this.animationSpeed;
  } // Get the current greeting


  get greeting() {
    return greetings[this.index];
  } // Map slow, medium, fast to CSS Animations


  get animationClass() {
    if (this.isAnimating) {
      return SPEED_CLASS_MAP[this.speed];
    }

    return 'hide';
  } //Handle the animation ending, update to next hello


  handleAnimationEnd() {
    this.isAnimating = false;
    this.index = (this.index + 1) % greetings.length;
    setTimeout(() => this.updateGreeting(), 500);
  } // Update to the next greeting and start animating


  updateGreeting() {
    this.isAnimating = true;
  }

}

registerDecorators(Greeting, {
  publicProps: {
    speed: {
      config: 3
    }
  },
  fields: ["animationSpeed", "index", "isAnimating"]
});

var Greeting$1 = registerComponent(Greeting, {
  tmpl: _tmpl
});

var index = Greeting$1.CustomElementConstructor;

export default index;
