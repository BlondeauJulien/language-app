export default queriesObj => {
  let queriesArr = [];
    for(const query in queriesObj) {
      queriesArr.push(`${query}=${queriesObj[query]}`);
    }
    let queriesString = queriesArr.reduce((string, el, i) => {
      if(i === 0) return string += `?${el}`;
      return string += `&${el}`;
    }, '');

    return queriesString;
}