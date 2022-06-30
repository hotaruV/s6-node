const getID = async (model, ocid = false) => {
  const cont = await model.count(); //1
  let numID = 0;
  numID = cont+1;

  console.log(numID);
  if (ocid){
     return setOCID(numID);

  }

  return numID;
};

const setOCID = (id) => {
    ocid = process.env.OCID
    ocid = ocid + id
    return ocid

}



module.exports = {getID};
