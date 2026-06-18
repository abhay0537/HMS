const appointments=require("../model/appointments")
const doctor=require("../model/doctor")

const all_appointments = async (req, res) => {
    const id = req.id;
  
    try {

        const all_appointments = await appointments.find({doctor:id}).populate("user");
        if (!all_appointments) {
            return res
                .status(401)
                .json({ message: "no appointments found" });
        } else {
            return res.json({ all_appointments });
        }


    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}



const get_single_doctor=async(req,res)=>{
    const id=req.id
   
    try{
        const data=await doctor.findById(id)
        if(!data)
        {
          return res.status(401).json({
            message:"cannot find doctor"
           
          })
        }
        return  res.status(202).json({
          message:"find doctor successfully",
          data:data
  
        })
  
    }
    catch(e){
      return res.status(400).json({message:e.message})
  
  
  
    }
  }


  const update_doctor=async(req,res)=>{
    const id=req.id;
    const {name, image, contact, email, desc, ammount}=req.body;
    try{
        if(!name || !contact || !email || !desc || !ammount){
            return res.status(400).json({ message:"incomplete content" });
        }
        const data=await doctor.findById(id);
        if(!data){
            return res.status(401).json({ message:"cannot find doctor" });
        }
        const updateFields = {name, contact, email, desc, ammount};
        if(image) updateFields.image = image;
        const update=await doctor.findByIdAndUpdate(id, updateFields, {new:true});
        return res.status(200).json({ message:"update successfully", data:update });
    }
    catch(e){
        return res.status(400).json({message:e.message});
    }



}


const change_date = async (req, res) => {

    try {
        const {_id, date} = req.body;
        if (!_id || !date) {
            return res.status(400).json({ message: "incomplete content" });
        }
        await appointments.findByIdAndUpdate({ _id }, { date });
        return res.status(200).json({ message: "date updated" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }



}


module.exports={all_appointments,get_single_doctor,update_doctor,change_date}
