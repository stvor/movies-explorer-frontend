function convertDuration(minutes) {
  const hours = Math.floor(minutes / 60);
  const min = minutes % 60;
  const result = hours > 0 ?
    `${hours}ч ${min}м` :
    `${min}м`;

  return result;
}

export default convertDuration;
