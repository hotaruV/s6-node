const GetID = (model, id) =>{
    const cont = await model().findById(id).count() //1
    numID += cont
    
    
    return numID
}


export default GetID