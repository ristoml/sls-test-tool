const result = require('./models/result')
 
test('test', () => {
    expect(result.url).toBe('mongodb://user6WS:c3jaAQHqh3SCqaNk@mongodb/sampledb');
  });