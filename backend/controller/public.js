const doctor = require("../model/doctor");
const service = require("../model/service");

const defaultServices = [
  {
    name: "Emergency Care",
    description: "24/7 emergency support for urgent medical needs.",
    features: ["Rapid triage", "Critical care team", "Ambulance coordination"],
    image: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Outpatient Consultation",
    description: "Book appointments with specialist doctors and general physicians.",
    features: ["Online appointment booking", "Specialist consultation", "Follow-up reports"],
    image: "https://images.unsplash.com/photo-1550831107-1553da8c8464?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Laboratory Services",
    description: "Reliable diagnostic testing and patient reports.",
    features: ["Blood tests", "Pathology reports", "Fast result processing"],
    image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Ambulance Service",
    description: "Request ambulance support for emergencies and patient transport.",
    features: ["Emergency booking", "Location details", "Patient transport"],
    image: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=900&q=80",
  },
];

const get_doctor= async(req, res)=>{
    try{
        const doctors = await doctor.find().lean();
        return res.status(200).json({doctors});
    }catch(e){
        return res.status(400).json({message:e.message});
    }
}

const get_single_doctor=async(req,res)=>{
  const {id}=req.params
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



const all_services = async (req, res) => {
    try {
      
        const user_service = await service
          .find()
          .lean()
        if (!user_service.length) {
          return res.status(200).json({user_service: defaultServices});
        }
          return res.status(200).json({user_service});
          
        
      }
    catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  

module.exports ={all_services,get_doctor,get_single_doctor} 
