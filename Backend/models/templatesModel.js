import mongoose from "mongoose";

const templateSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, "Template name is required"],
    unique: true,
    trim: true
  },
  thumbnail: { 
    type: String, 
    required: [true, "Cloudinary URL is required"] 
  },
  layoutId: { 
    type: String, 
    required: [true, "Layout ID is required for PDF generation"],
    unique: true 
  },
  description: { 
    type: String, 
    default: "Professional ATS-ready resume layout." 
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });
const templatesModel= mongoose.model('Template', templateSchema);
export default templatesModel;
