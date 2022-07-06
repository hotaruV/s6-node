const getID = async (model, ocid = false) => {
  const cont = await model.count(); //1
  let numID = 0;
  numID = cont + 1;
  if (ocid) {
    return setOCID(numID);
  }else{
    return numID;
  } 
};

const setOCID = (id) => {
  let ocid = process.env.OCID;
  let idi = zfill(id, 5);
  ocid += `000-${idi}`;

  //console.log(ocid);
  return ocid;
};

function zfill(number, width) {
  var numberOutput = Math.abs(number); /* Valor absoluto del número */
  var length = number.toString().length; /* Largo del número */
  var zero = "0"; /* String de cero */

  if (width <= length) {
    if (number < 0) {
      return "-" + numberOutput.toString();
    } else {
      return numberOutput.toString();
    }
  } else {
    if (number < 0) {
      return "-" + zero.repeat(width - length) + numberOutput.toString();
    } else {
      return zero.repeat(width - length) + numberOutput.toString();
    }
  }
}

module.exports = getID;
