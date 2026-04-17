import mongoose from 'mongoose';
import "dotenv/config"
import templatesModel from './models/templatesModel.js';



const templates = [
  {
    name: "EXECUTIVE_PRO", 
    layoutId: "Pro_v1",    
    thumbnail: "https://res.cloudinary.com/djsmx24lx/image/upload/q_auto/f_auto/v1776403788/SharedScreenshot_qaqxbc.jpg", 
    description: "A refined, high-performance layout optimized for ATS compatibility and executive-level readability."
  },
   {
    name: "Profesional", 
    layoutId: "profesional- v2",    
    thumbnail: "https://res.cloudinary.com/djsmx24lx/image/upload/q_auto/f_auto/v1773803366/SharedScreenshot_yjavhx.jpg", 
    description: "a more poffessional one "
  }
];

const importData = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}`);
    await templatesModel.deleteMany(); 
    await templatesModel.insertMany(templates);
    console.log('--- DATA_IMPORTED_SUCCESSFULLY ---');
    process.exit();
  } catch (error) {
    console.error('--- ERROR_IMPORTING_DATA ---', error);
    process.exit(1);
  }
};

importData(); 