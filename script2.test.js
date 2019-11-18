const fetch = require('node-fetch');
const swapi = require('./script2');

it('calls swapi to get people', (done) => {
  expect.assertions(1); // use this while working with async stuff, here test must have one assertion, line 7
  swapi.getPeople(fetch).then(data => {
    expect(data.count).toEqual(87);
    done(); //with async, one must use either done() or use a return to hold off functions being completed early
  });
});

it('calls swapi with a Prromise to get people', () => {
  expect.assertions(2); // use this while working with async stuff, expecting 2 assertions
  return swapi.getPeoplePromise(fetch).then(data => {
    expect(data.count).toEqual(87);
    expect(data.results.length).toBeGreaterThan(5);
  });
});

it('getPeople returns count and results', () => {
  const mockFetch = jest.fn().mockReturnValue(Promise.resolve({
    json: () => Promise.resolve({
      count: 87,
      results: [0,1,2,3,4,5]
    })
  }));

  expect.assertions(4);
  return swapi.getPeoplePromise(mockFetch).then(data => {
    expect(mockFetch.mock.calls.length).toBe(1);
    expect(mockFetch).toBeCalledWith('https://swapi.co/api/people');
    expect(data.count).toEqual(87);
    expect(data.results.length).toBeGreaterThan(5);
  });
});
