import imageKit from "../configs/imageKit.js";
import Resume from "../models/Resume.js";
import fs from "fs";

//controller for creating a new resume
// POST: /api/resumes/create
export const createResume = async (req, res) => {
  try {
    const userId = req.userId;

    const { title } = req.body;

    const newResume = await Resume.create({ userId, title });

    return res
      .status(201)
      .json({ message: "Resume create successfully", resume: newResume });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//controller for deleting a resume
// POST: /api/resumes/delete
export const deleteResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId } = req.params;

    await Resume.findOneAndDelete({ userId, _id: resumeId });

    return res.status(201).json({ message: "Resume deleted successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//get user resume by id
// POST: /api/resumes/get
export const getResumeById = async (req, res) => {
  try {
    const userId = req.userId;
                                            // Frontend token bhejta hai
                                            // Backend verify karta hai
                                            // Token se userId nikalta hai
    const { resumeId } = req.params;  //Ye URL se aata hai

    const resume = await Resume.findOne({ userId, _id: resumeId });

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    resume.__v = undefined;
    resume.createdAt = undefined;
    resume.updatedAt = undefined;

    return res.status(200).json({ resume });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//get resume by id public
// POST: /api/resumes/public
export const getPublicResumeById = async (req, res) => {
  try {
    const { resumeId } = req.params;

    const resume = await Resume.findOne({ public: true, _id: resumeId });  //Sirf public resumes hi milenge

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    return res.status(200).json({ resume });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// controller for updating a resume
// PUT: /api/resumes/update


export const updateResume = async (req, res) => { 
  try {
    const userId = req.userId;
    const { resumeId, resumeData, removeBackground } = req.body;  //headers
// small (userId, email)
    const image = req.file;

    let resumeDataCopy;

    // two from s me data ata hia string form me ya object form me

    if (typeof resumeData === "string") {
      resumeDataCopy = await JSON.parse(resumeData);   // JSON.parse() se object banaya
    } else {
      resumeDataCopy = structuredClone(resumeData);   //direct clone kiya (safe copy banane ke liye)
    }

    if (image) {
      const imageBufferData = fs.createReadStream(image.path); //File read karna

      const response = await imageKit.files.upload({   //ImageKit pe file upload karna
        file: imageBufferData,
        fileName: "resume.png",
        folder: "user-resumes",
        transformation: {
          pre:
            "w-300,h-300,fo-face,z-0.45" +
            (removeBackground ? ",e-bgremove" : ""),
        },
      });
      resumeDataCopy.personal_info.image = response.url;  //Uploaded image ka URL resume data me daal diya
    }

    const resume = await Resume.findOneAndUpdate(
      { userId, _id: resumeId },
      resumeDataCopy,
      { new: true }   //updated data return karega
    );

    return res.status(200).json({ message: "Saved successfully", resume });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};


