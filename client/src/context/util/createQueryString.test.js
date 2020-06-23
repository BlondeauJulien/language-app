import createQueriesString from './createQueryString';

describe('Create valid query string', () => {
  it('should return a empty string if no query', () => {
    let queries = {};
    expect(createQueriesString(queries)).toBe('');
  });

  it('should return a valid single query string', () => {
    let queries = {query1: 'somequery'};
    expect(createQueriesString(queries)).toBe('?query1=somequery');
  });

  it('should return a valid multiple query string', () => {
    let queries = {query1: 'somequery', query2: 'anotherquery'};
    expect(createQueriesString(queries)).toBe('?query1=somequery&query2=anotherquery');
    queries.query3 = 'lastquery';
    expect(createQueriesString(queries)).toBe('?query1=somequery&query2=anotherquery&query3=lastquery');
  });
})