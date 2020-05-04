export default queriesObj => {
  let queriesArr = [];
    for(const query in queriesObj) {
      if(queriesObj[query] && typeof queriesObj[query] === 'string') {
        queriesArr.push(`${query}=${queriesObj[query]}`);
      }
    }
    let queriesString = queriesArr.reduce((string, el, i) => {
      if(i === 0) return string += `?${el}`;
      return string += `&${el}`;
    }, '');

    return queriesString;
}