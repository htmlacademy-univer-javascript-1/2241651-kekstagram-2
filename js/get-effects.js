const Effect = {
  NONE: {
    id: 'effect-none',
  },

  CHROME: {
    id: 'effect-chrome',
    class: 'effects__preview--chrome',
    filter: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },

  SEPIA: {
    id: 'effect-sepia',
    class: 'effects__preview--sepia',
    filter: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },

  MARVIN: {
    id: 'effect-marvin',
    class: 'effects__preview--marvin',
    filter: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },

  PHOBOS: {
    id: 'effect-phobos',
    class: 'effects__preview--phobos',
    filter: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },

  HEAT: {
    id: 'effect-heat',
    class: 'effects__preview--heat',
    filter: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
  },
};

const getEffect = (evt) => {
  switch (evt.target.id) {
    case Effect.CHROME.id:
      return Effect.CHROME;
    case Effect.SEPIA.id:
      return Effect.SEPIA;
    case Effect.MARVIN.id:
      return Effect.MARVIN;
    case Effect.PHOBOS.id:
      return Effect.PHOBOS;
    case Effect.HEAT.id:
      return Effect.HEAT;
    default:
      return '';
  }
};

export {Effect, getEffect};
