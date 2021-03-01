
export const selectElement = (array, find = true) => {
    let indices = [];
    let idx = array.indexOf(find);
    while (idx != -1) {
      indices.push(idx + '');
      idx = array.indexOf(find, idx + 1);
    }
    return indices;
  }
  
  export const filterArray = (array, number=999) => {
    return array.filter((item, index) => index < number);
  }
  
  
  