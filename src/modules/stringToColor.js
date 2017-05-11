import R from 'ramda';

const stringToColor = (string, range = 360, saturation = 50, lightnes = 50) => {
  let hash_sum = 0;
  let reduced_hash = 0;

  switch (R.type(range)) {
    case 'Array': 
      if (range[0] < 0 || range[1] < 0 || range[1] <= range[0]) {
        throw new Error('Incorrect range passed as second argument to stringToColor. Values must be integer. Second value should be greater than first.');
      } break;
    case 'Number': 
      range = [0, range]; break;
    default: throw new Error('Incorrect range type passed as second argument to stringToColor. It can be only array or number type');
  }

  if ( string && R.type(string) === 'String' && string.length) {
    for ( var i = 0; i < string.length; i++ ) {
      hash_sum += string[i].charCodeAt() * i;
    }
  } else {
    throw new Error('Wrong string passed as first argument to stringToColor. It should be string type and has length');
  }

  if (R.type(saturation) !== 'Number' || saturation < 0 || saturation > 100) {
    throw new Error('Wrong saturation passed as third argument to stringToColor. It should be a number type and be in range 0 - 100');
  }

  if (R.type(lightnes) !== 'Number' || lightnes < 0 || lightnes > 100) {
    throw new Error('Wrong lightnes passed as fourth argument to stringToColor. It should be a number type and be in range 0 - 100');
  }

  reduced_hash = hash_sum % ((range[1] + 1) - range[0]) + range[0];

  return 'hsl(' + reduced_hash + ',' + saturation + '%,' + lightnes + '%)'
}

export default stringToColor;