module.exports = {
  sum_calories: (value) => {
    var sum = 0;
    for(var i = 0; i < value.length; i++){
      sum+=value[i].calories;
    }
    return sum;
  }
};
