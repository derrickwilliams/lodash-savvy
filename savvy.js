window._savvy = (() => {
  return { bootstrap };

  function bootstrap(document, _, CodeMirror) {
    const rawData = document.querySelector('.raw-data-in');
    const lodashCode = document.querySelector('.lodash-code');
    const results = document.querySelector('.processed-results');

    rawData.value = rawData.value.length > 0
      ? rawData.value
      : JSON.stringify(getTestData(), null, 2);

    lodashCode.value = lodashCode.value.length > 0
      ? lodashCode.value
      : [`function func(_, data) { `,
            `  // use lodash API to manipulate data.`,
            `  // returned value is displayed in results.`,
            `  return _.keys(data);`,
          `}`
        ].join(`\n`) ;

    const rawDataEditor = CodeMirror.fromTextArea(rawData, {
      mode: {
        name: 'javascript',
        json: true
      },
      viewportMargin: Infinity,
      lineNumbers: true
    });

    const lodashCodeEditor = CodeMirror.fromTextArea(lodashCode, {
      mode: 'javascript',
      viewportMargin: Infinity,
      lineNumbers: true
    });

    const resultsDisplay = CodeMirror.fromTextArea(results, {
      mode: {
        name: 'javascript',
        json: true
      },
      viewportMargin: Infinity,
      lineNumbers: true
    });

    const processBtn = document.querySelector('.process-btn');

    processBtn.addEventListener('click', (e) => {
      try {
        const rawDataIn = JSON.parse(rawDataEditor.getValue());
        const lodashCodeIn = lodashCodeEditor.getValue();

        /* func = */ eval(lodashCodeIn);

        return resultsDisplay.setValue(JSON.stringify(func(_, rawDataIn), null, 2));
      }
      catch(e) {
        return resultsDisplay.setValue(e.toString());
      }
    });
  };

  function getTestData() {
    return {
      "name": "Luke Skywalker",
      "height": "1.72 m",
      "mass": "77 Kg",
      "hair_color": "Blond",
      "skin_color": "Caucasian",
      "eye_color": "Blue",
      "birth_year": "19 BBY",
      "gender": "Male",
      "homeworld": "http://swapi.co/api/planets/1/",
      "films": [
        "http://swapi.co/api/films/1/",
        "http://swapi.co/api/films/2/",
        "http://swapi.co/api/films/3/"
      ],
      "species": [
        "http://swapi.co/api/species/1/"
      ],
      "vehicles": [
        "http://swapi.co/api/vehicles/14/",
        "http://swapi.co/api/vehicles/30/"
      ],
      "starships": [
        "http://swapi.co/api/starships/12/",
        "http://swapi.co/api/starships/22/"
      ],
      "created": "2014-12-09T13:50:51.644000Z",
      "edited": "2014-12-10T13:52:43.172000Z",
      "url": "http://swapi.co/api/people/1/"
    };
  }
})(window || {}, document);