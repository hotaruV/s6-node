const getID = async (model) => {
  const cont = await model.count(); //1
  let numID = 0;
  numID = cont+1;
  console.log(numID);
  return numID;
};

module.exports = getID;
