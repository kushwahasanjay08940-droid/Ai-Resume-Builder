// import {
//   FilePenLineIcon,
//   LoaderCircleIcon,
//   PencilIcon,
//   PlusIcon,
//   TrashIcon,
//   UploadCloud,
//   UploadCloudIcon,
//   XIcon,
// } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import api from "../configs/api.js";
// import toast from "react-hot-toast";
// import { pdfToText } from "../utils/pdfToText";

// const Dashboard = () => {

//   const [allResumes, setAllResumes] = useState([]);
//   const [showCreteResume, setShowCreteResume] = useState(false);
//   const [showUploadResume, setShowUploadResume] = useState(false);
//   const [title, setTitle] = useState("");
//   const [resume, setResume] = useState(null);
//   const [editResumeId, setEditResumeId] = useState("");
//   const [isLoading, setLoading] = useState(false);

//    const [file, setFile] = useState(null);
//   const [text, setText] = useState("");
//   // const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const { user, token } = useSelector((state) => state.auth);

//   const navigate = useNavigate();

//   const colors = ["#9333ea", "#d97706", "#dc2626", "#0284c7", "#16a34a"];

//   const loadAllResumes = async () => {
//     try {
//       const { data } = await api.get("/api/users/resumes", {
//         headers: { Authorization: token },
//       });
//       setAllResumes(data.resumes);
//     } catch (error) {
//       toast.error(error?.response?.data?.message || error.message);
//     }
//   };

//   const createResume = async (e) => {
//     try {
//       e.preventDefault();
//       const { data } = await api.post(
//         "/api/resumes/create",
//         { title },
//         { headers: { Authorization: token } }
//       );
//       setAllResumes([...allResumes, data.resume]); // ui update without page reload
//       setTitle("");
//       setShowCreteResume(false);
//       navigate(`/app/builder/${data.resume._id}`);
//     } catch (error) {
//       toast.error(error?.response?.data?.message || error.message);
//     }
//   };




//     const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//     setText("");
//     setError("");
//   };

//   let sendText = "";

// const uploadFile = async () => {
//   if (!file) {
//     setError("Please select a PDF file");
//     return;
//   }

//   try {
//     setLoading(true);
//     setError("");
//     setText("");

//     //  Extract text
//     let extractedText = await pdfToText(file);

//     if (!extractedText || extractedText.trim().length === 0) {
//       throw new Error("Could not extract text from PDF");
//     }

//     //  Optional: clean OCR noise
//     extractedText = extractedText.replace(/[^\x00-\x7F]/g, "");

//     console.log("Extracted Text:", extractedText);
//     setText(extractedText);

//     //  Send to backend (FIXED KEY )
//     const { data } = await api.post(
//       "/api/ai/upload-resume",
//       {
//         title,
//         resumeText: extractedText, 
//       },
//       {
//         headers: { Authorization: token },
//       }
//     );

//     //  Reset UI
//     setTitle("");
//     setFile(null);
//     setShowUploadResume(false);

//     //  Navigate
//     navigate(`/app/builder/${data.resumeId}`);

//   } catch (err) {
//     console.error(err);
//     setError(err.message);
//     toast.error(err?.response?.data?.message || err.message);
//   } finally {
//     setLoading(false);
//   }
// };



//   // const uploadResume = async (e) => {
//   //   e.preventDefault();
//   //   setIsLoading(true);

//   //   try {
//   //     // const resumeText = await pdfToText(resume);
//   //     console.log("Extracted text from PDF:", sendText); // Log the extracted text
//   //     const { data } = await api.post(
//   //       "/api/ai/upload-resume",
//   //       { title, sendText },
//   //       { headers: { Authorization: token } }
//   //     );
//   //     setTitle("");
//   //     setResume(null);
//   //     setShowUploadResume(false);
//   //     navigate(`/app/builder/${data.resumeId}`);
//   //   } catch (error) {
//   //     toast.error(error?.response?.data?.message || error.message);
//   //   }
//   //   setIsLoading(false);
//   // };




//   const editTitle = async (e) => {
//     try {
//       e.preventDefault();

//       if (confirm) {
//         const { data } = await api.put(
//           "/api/resumes/update",
//           { resumeId: editResumeId, resumeData: { title } },
//           {
//             headers: { Authorization: token },
//           }
//         );
//         setAllResumes(
//           allResumes.filter((resume) =>
//             resume._id !== editResumeId ? { ...resume, title } : resume
//           )
//         );
//         loadAllResumes();
//         setTitle("");
//         setEditResumeId("");
//         toast.success(data.message);
//       }
//     } catch (error) {
//       toast.error(error?.response?.data?.message || error.message);
//     }
//   };

//   const deleteResume = async (resumeId) => {
//     try {
//       const confirm = window.confirm(
//         "Are you sure you want to delete this resume"
//       );

//       if (confirm) {
//         const { data } = await api.delete(`/api/resumes/delete/${resumeId}`, {
//           headers: { Authorization: token },
//         });
//         setAllResumes(allResumes.filter((resume) => resume._id !== resumeId));
//         toast.success(data.message);
//       }
//     } catch (error) {
//       toast.error(error?.response?.data?.message || error.message);
//     }
//   };

//   useEffect(() => {
//     loadAllResumes();
//   }, []);

//   return (
//     <div>
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         <p className="text-2xl font-medium mb-6 bg-linear-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent sm:hidden">
//           Welcome, John Doe
//         </p>

//         <div className="flex gap-4">
//           <button
//             onClick={() => setShowCreteResume(true)}
//             className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg text-slate-600 border border-dashed border-slate-300 group hover:border-indigo-500 hover:shadow-lg transition-all duration-300 cursor-pointer"
//           >
//             <PlusIcon className="size-11 transition-all duration-300 p-2.5 bg-linear-to-br from-indigo-300 to-indigo-500 text-white rounded-full" />
//             <p className="text-sm group-hover:text-indigo-600 transition-all">
//               Create Resume
//             </p>
//           </button>
//           <button
//             onClick={() => setShowUploadResume(true)}
//             className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg text-slate-600 border border-dashed border-slate-300 group hover:border-purple-500 hover:shadow-lg transition-all duration-300 cursor-pointer"
//           >
//             <UploadCloudIcon className="size-11 transition-all duration-300 p-2.5 bg-linear-to-br from-purple-300 to-purple-500 text-white rounded-full" />
//             <p className="text-sm group-hover:text-purple-600 transition-all">
//               Upload Existing
//             </p>
//           </button>
//         </div>

//         <hr className="border-slate-300 my-6 sm:w-[305px]" />

//         <div className="grid grid-cols-2 sm:flex flex-wrap gap-4">
//           {allResumes.map((resume, index) => {     // map take two parameter one value , index
//             const baseColor = colors[index % colors.length];

//             return (
//               <button
//                 key={index}
//                 onClick={() => navigate(`/app/builder/${resume._id}`)}
//                 className="relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 border group hover:shadow-lg transition-all duration-300 cursor-pointer"
//                 style={{
//                   background: `linear-gradient(135deg, ${baseColor}10, ${baseColor}40) `,
//                   borderColor: baseColor + "40",
//                 }}
//               >
//                 <FilePenLineIcon
//                   className="size-11 group-hover:scale-105 transition-all px-2 text-center"
//                   style={{ color: baseColor }}
//                 />
//                 <p
//                   className="text-sm group-hover:scale-105 transition-all px-2 text-center"
//                   style={{ color: baseColor }}
//                 >
//                   {resume.title}
//                 </p>

//                 <p
//                   className="absolute bottom-1 text-[11px] text-slate-400 group-hover:text-slate-500 transition-all duration-300 px-2 text-center"
//                   style={{
//                     color: baseColor + "90",
//                   }}
//                 >
//                   Updated on {new Date(resume.updatedAt).toLocaleDateString()}
//                 </p>

//                 <div
//                   onClick={(e) => e.stopPropagation()}
//                   className="absolute top-1 right-1 group-hover:flex items-center hidden"
//                 >
//                   <TrashIcon
//                     onClick={() => deleteResume(resume._id)}
//                     className="size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors"
//                   />
//                   <PencilIcon
//                     onClick={() => {
//                       setEditResumeId(resume._id);
//                       setTitle(resume.title);
//                     }}
//                     className="size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors"
//                   />
//                 </div>
//               </button>
//             );
//           })}
//         </div>

//         {showCreteResume && (
//           <form
//             onSubmit={createResume}
//             onClick={() => setShowCreteResume(false)}
//             className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center"
//           >
//             <div
//               onClick={(e) => e.stopPropagation()}
//               className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6"
//             >
//               <h2 className="text-xl font-bold mb-4">Create a Resume</h2>
//               <input
//                 onChange={(e) => setTitle(e.target.value)}
//                 value={title}
//                 type="text"
//                 placeholder="Enter resume title"
//                 className="w-full py-2 mb-4 px-4 focus:border-green-600 ring-green-600"
//                 required
//               />

//               <button className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
//                 Create Resume
//               </button>
//               <XIcon
//                 className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
//                 onClick={() => {
//                   setShowCreteResume(false);
//                   setTitle("");
//                 }}
//               />
//             </div>
//           </form>
//         )}

//       {showUploadResume && (
//   <div
//     onClick={() => setShowUploadResume(false)}
//     className="fixed inset-0 bg-black/70 backdrop-blur z-10 flex items-center justify-center"
//   >
//     <form
//       onSubmit={(e) => {
//         e.preventDefault();
//         uploadFile();
//       }}
//       onClick={(e) => e.stopPropagation()}
//       className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6"
//     >
//       <h2 className="text-xl font-bold mb-4">Upload Resume</h2>

//       <input
//         type="text"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         placeholder="Enter resume title"
//         className="w-full py-2 mb-4 px-4 focus:border-green-600 ring-green-600"
//         required
//       />

//       <div>
//         <label
//           htmlFor="resume-input"
//           className="block text-sm text-slate-700"
//         >
//           Select resume file

//           <div className="flex flex-col items-center justify-center gap-2 border text-slate-400 border-slate-400 border-dashed rounded-md p-4 py-10 my-4 hover:border-green-500 hover:text-green-700 cursor-pointer transition-colors">
            
//             {file ? (
//               <p className="text-green-700">{file.name}</p>
//             ) : (
//               <>
//                 <UploadCloud className="size-14 stroke-1" />
//                 <p>Upload Resume</p>
//               </>
//             )}
//           </div>
//         </label>

//         <input
//           type="file"
//           id="resume-input"
//           accept="application/pdf"
//           hidden
//           onChange={handleFileChange}
//         />
//       </div>

//       <button
//         type="submit"
//         disabled={isLoading}
//         className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
//       >
//         {isLoading && (
//           <LoaderCircleIcon className="animate-spin size-4 text-white" />
//         )}
//         {isLoading ? "Uploading..." : "Upload Resume"}
//       </button>

//       <XIcon
//         className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
//         onClick={() => {
//           setShowUploadResume(false);
//           setTitle("");
//           setFile(null);
//         }}
//       />
//     </form>
//   </div>
// )}

//         {editResumeId && (
//           <form
//             onSubmit={editTitle}
//             onClick={() => setEditResumeId("")}
//             className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center"
//           >
//             <div
//               onClick={(e) => e.stopPropagation()}
//               className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6"
//             >
//               <h2 className="text-xl font-bold mb-4">Edit Resume Title</h2>
//               <input
//                 onChange={(e) => setTitle(e.target.value)}
//                 value={title}
//                 type="text"
//                 placeholder="Enter resume title"
//                 className="w-full py-2 mb-4 px-4 focus:border-green-600 ring-green-600"
//                 required
//               />

//               <button className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
//                 Update
//               </button>
//               <XIcon
//                 className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
//                 onClick={() => {
//                   setEditResumeId("");
//                   setTitle("");
//                 }}
//               />
//             </div>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;




import {
  FilePenLineIcon,
  LoaderCircleIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  UploadCloud,
  UploadCloudIcon,
  XIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../configs/api.js";
import toast from "react-hot-toast";
import { pdfToText } from "../utils/pdfToText";

const Dashboard = () => {

  const [allResumes, setAllResumes] = useState([]);
  const [showCreteResume, setShowCreteResume] = useState(false);
  const [showUploadResume, setShowUploadResume] = useState(false);
  const [title, setTitle] = useState("");
  const [resume, setResume] = useState(null);
  const [editResumeId, setEditResumeId] = useState("");
  const [isLoading, setLoading] = useState(false);

   const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  // const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { user, token } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const colors = ["#9333ea", "#d97706", "#dc2626", "#0284c7", "#16a34a"];

  const loadAllResumes = async () => {
    try {
      const { data } = await api.get("/api/users/resumes", {
        headers: { Authorization: token },
      });
      setAllResumes(data.resumes);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const createResume = async (e) => {
    try {
      e.preventDefault();
      const { data } = await api.post(
        "/api/resumes/create",
        { title },
        { headers: { Authorization: token } }
      );
      setAllResumes([...allResumes, data.resume]); // ui update without page reload
      setTitle("");
      setShowCreteResume(false);
      navigate(`/app/builder/${data.resume._id}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };




    const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setText("");
    setError("");
  };

  let sendText = "";

const uploadFile = async () => {
  if (!file) {
    setError("Please select a PDF file");
    return;
  }

  try {
    setLoading(true);
    setError("");
    setText("");

    //  Extract text
    let extractedText = await pdfToText(file);

    if (!extractedText || extractedText.trim().length === 0) {
      throw new Error("Could not extract text from PDF");
    }

    //  Optional: clean OCR noise
    extractedText = extractedText.replace(/[^\x00-\x7F]/g, "");

    console.log("Extracted Text:", extractedText);
    setText(extractedText);

    //  Send to backend (FIXED KEY )
    const { data } = await api.post(
      "/api/ai/upload-resume",
      {
        title,
        resumeText: extractedText, 
      },
      {
        headers: { Authorization: token },
      }
    );

    //  Reset UI
    setTitle("");
    setFile(null);
    setShowUploadResume(false);

    //  Navigate
    navigate(`/app/builder/${data.resumeId}`);

  } catch (err) {
    console.error(err);
    setError(err.message);
    toast.error(err?.response?.data?.message || err.message);
  } finally {
    setLoading(false);
  }
};



  // const uploadResume = async (e) => {
  //   e.preventDefault();
  //   setIsLoading(true);

  //   try {
  //     // const resumeText = await pdfToText(resume);
  //     console.log("Extracted text from PDF:", sendText); // Log the extracted text
  //     const { data } = await api.post(
  //       "/api/ai/upload-resume",
  //       { title, sendText },
  //       { headers: { Authorization: token } }
  //     );
  //     setTitle("");
  //     setResume(null);
  //     setShowUploadResume(false);
  //     navigate(`/app/builder/${data.resumeId}`);
  //   } catch (error) {
  //     toast.error(error?.response?.data?.message || error.message);
  //   }
  //   setIsLoading(false);
  // };




  const editTitle = async (e) => {
    try {
      e.preventDefault();

      if (confirm) {
        const { data } = await api.put(
          "/api/resumes/update",
          { resumeId: editResumeId, resumeData: { title } },
          {
            headers: { Authorization: token },
          }
        );
        setAllResumes(
          allResumes.filter((resume) =>
            resume._id !== editResumeId ? { ...resume, title } : resume
          )
        );
        loadAllResumes();
        setTitle("");
        setEditResumeId("");
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const deleteResume = async (resumeId) => {
    try {
      const confirm = window.confirm(
        "Are you sure you want to delete this resume"
      );

      if (confirm) {
        const { data } = await api.delete(`/api/resumes/delete/${resumeId}`, {
          headers: { Authorization: token },
        });
        setAllResumes(allResumes.filter((resume) => resume._id !== resumeId));
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    loadAllResumes();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-white to-slate-200">
      <div className="max-w-6xl mx-auto px-4 py-6">

        <p className="text-2xl font-bold mb-6 bg-gradient-to-r from-slate-700 via-slate-900 to-slate-600 bg-clip-text text-transparent sm:hidden">
          Welcome, John Doe
        </p>

        {/* ACTION CARDS */}
        <div className="flex gap-4 mb-6">

          <button
            onClick={() => setShowCreteResume(true)}
            className="w-full sm:max-w-56 h-40 flex flex-col items-center justify-center rounded-2xl bg-white/70 backdrop-blur-md border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group"
          >
            <PlusIcon className="size-10 p-2 bg-gradient-to-br from-indigo-400 to-indigo-600 text-white rounded-full group-hover:scale-110 transition" />
            <p className="text-sm font-medium mt-2 group-hover:text-indigo-600">
              Create Resume
            </p>
          </button>

          <button
            onClick={() => setShowUploadResume(true)}
            className="w-full sm:max-w-56 h-40 flex flex-col items-center justify-center rounded-2xl bg-white/70 backdrop-blur-md border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group"
          >
            <UploadCloudIcon className="size-10 p-2 bg-gradient-to-br from-purple-400 to-purple-600 text-white rounded-full group-hover:scale-110 transition" />
            <p className="text-sm font-medium mt-2 group-hover:text-purple-600">
              Upload Existing
            </p>
          </button>

        </div>

        <hr className="border-slate-200 my-5" />

        {/* RESUME GRID */}
        <div className="grid grid-cols-2 sm:flex flex-wrap gap-4">

          {allResumes.map((resume, index) => {
            const baseColor = colors[index % colors.length];

            return (
              <button
                key={index}
                onClick={() => navigate(`/app/builder/${resume._id}`)}
                className="relative w-full sm:max-w-56 h-40 flex flex-col items-center justify-center rounded-2xl bg-white/60 backdrop-blur-md border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group"
                style={{
                  background: `linear-gradient(135deg, ${baseColor}12, ${baseColor}30)`,
                  borderColor: baseColor + "40",
                }}
              >
                <FilePenLineIcon
                  className="size-10 group-hover:scale-110 transition"
                  style={{ color: baseColor }}
                />

                <p
                  className="text-sm font-semibold mt-2 group-hover:scale-105 transition"
                  style={{ color: baseColor }}
                >
                  {resume.title}
                </p>

                <p
                  className="absolute bottom-2 text-[10px] text-slate-500"
                  style={{ color: baseColor + "90" }}
                >
                  {new Date(resume.updatedAt).toLocaleDateString()}
                </p>

                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute top-2 right-2 hidden group-hover:flex gap-1"
                >
                  <TrashIcon
                    onClick={() => deleteResume(resume._id)}
                    className="size-7 p-1 hover:bg-white/70 rounded-lg text-slate-700 hover:text-red-500"
                  />
                  <PencilIcon
                    onClick={() => {
                      setEditResumeId(resume._id);
                      setTitle(resume.title);
                    }}
                    className="size-7 p-1 hover:bg-white/70 rounded-lg text-slate-700 hover:text-blue-500"
                  />
                </div>
              </button>
            );
          })}

        </div>

        {/* MODALS (UNCHANGED LOGIC, ONLY STYLES KEPT SAME) */}
        {showCreteResume && (
          <form
            onSubmit={createResume}
            onClick={() => setShowCreteResume(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur flex items-center justify-center z-10"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white/80 backdrop-blur-xl border shadow-2xl rounded-2xl w-full max-w-sm p-6"
            >
              <h2 className="text-xl font-bold mb-4">Create Resume</h2>

              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className="w-full px-4 py-2 mb-4 border rounded-lg"
                placeholder="Enter title"
              />

              <button className="w-full py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg">
                Create
              </button>

              <XIcon
                onClick={() => {
                  setShowCreteResume(false);
                  setTitle("");
                }}
                className="absolute top-4 right-4 text-slate-400 hover:text-red-500"
              />
            </div>
          </form>
        )}

         {showUploadResume && (
  <div
    onClick={() => setShowUploadResume(false)}
    className="fixed inset-0 bg-black/70 backdrop-blur z-10 flex items-center justify-center"
  >
    <form
      onSubmit={(e) => {
        e.preventDefault();
        uploadFile();
      }}
      onClick={(e) => e.stopPropagation()}
      className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6"
    >
      <h2 className="text-xl font-bold mb-4">Upload Resume</h2>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter resume title"
        className="w-full py-2 mb-4 px-4 focus:border-green-600 ring-green-600"
        required
      />

      <div>
        <label
          htmlFor="resume-input"
          className="block text-sm text-slate-700"
        >
          Select resume file

          <div className="flex flex-col items-center justify-center gap-2 border text-slate-400 border-slate-400 border-dashed rounded-md p-4 py-10 my-4 hover:border-green-500 hover:text-green-700 cursor-pointer transition-colors">
            
            {file ? (
              <p className="text-green-700">{file.name}</p>
            ) : (
              <>
                <UploadCloud className="size-14 stroke-1" />
                <p>Upload Resume</p>
              </>
            )}
          </div>
        </label>

        <input
          type="file"
          id="resume-input"
          accept="application/pdf"
          hidden
          onChange={handleFileChange}
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
      >
        {isLoading && (
          <LoaderCircleIcon className="animate-spin size-4 text-white" />
        )}
        {isLoading ? "Uploading..." : "Upload Resume"}
      </button>

      <XIcon
        className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
        onClick={() => {
          setShowUploadResume(false);
          setTitle("");
          setFile(null);
        }}
      />
    </form>
  </div>
)}
        {editResumeId && (
          <form
            onSubmit={editTitle}
            onClick={() => setEditResumeId("")}
            className="fixed inset-0 bg-black/60 backdrop-blur flex items-center justify-center z-10"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white/80 backdrop-blur-xl border shadow-2xl rounded-2xl w-full max-w-sm p-6"
            >
              <h2 className="text-xl font-bold mb-4">Edit Title</h2>

              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className="w-full px-4 py-2 mb-4 border rounded-lg"
              />

              <button className="w-full py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg">
                Update
              </button>

              <XIcon
                onClick={() => {
                  setEditResumeId("");
                  setTitle("");
                }}
                className="absolute top-4 right-4 text-slate-400 hover:text-red-500"
              />
            </div>
          </form>
        )}

      </div>
    </div>
  );
};

export default Dashboard;