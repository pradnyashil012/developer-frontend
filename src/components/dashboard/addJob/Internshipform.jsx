import React from "react";
import InputField from "../InputField";

import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw} from 'draft-js';
// import draftToHtml from 'draftjs-to-html';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const Internshipform = ({formdata, setFormdata, handleSubmit}) => {

  let editorState = EditorState.createEmpty();

  const onEditorStateChange = (editorState) => {
    setFormdata({...formdata, description: editorState})
  }

  const handleBtn1Toggle = () => {
    setFormdata({...formdata, btnState: 1})
}

const handleBtn2Toggle = () => {
    setFormdata({...formdata, btnState: 2})
}

const handletitleChange = (event) => {
    setFormdata({...formdata, title: event.target.value})
};

const handletypeChange = (event) => {
    setFormdata({...formdata, type: event.target.value})
};

const handleCDurationChange = (event) => {
    setFormdata({...formdata, contractDuration: event.target.value})
};

const handleLocTypeChange = (event) => {
    setFormdata({...formdata, locationType: event.target.value})
};

const handleLocationChange = (event) => {
    setFormdata({...formdata, location: event.target.value})
};

const handleOpnChange = (event) => {
    setFormdata({...formdata, openings: event.target.value})
};

const handleExpChange = (event) => {
    setFormdata({...formdata, experience: event.target.value})
};

const handlectcChange = (event) => {
    setFormdata({...formdata, ctc: event.target.value})
};

const handleDescChange = (event) => {
    setFormdata({...formdata, description: event.target.value})
};

const handleSkillChange = (event) => {
    setFormdata({...formdata, skills: event.target.value})
};

const handlePayTypeChange = (event) => {
    setFormdata({...formdata, payType: event.target.value})
};

const handleSalaryChange = (event) => {
    setFormdata({...formdata, salary: event.target.value})
};

const handleIncentivesChange = (event) => {
    setFormdata({...formdata, incentives: event.target.value})
};

const handlePerksChange = (event) => {
    setFormdata({...formdata, perks: event.target.value})
};

const handleProbationChange = (event) => {
    setFormdata({...formdata, probation: event.target.value})
};

const handleProbSalaryChange = (event) => {
    setFormdata({...formdata, probationSalary: event.target.value})
};

const handleDateChange = (event) => {
    setFormdata({...formdata, startDate: event.target.value})
};

const handleRespChange = (event) => {
    setFormdata({...formdata, resp: event.target.value})
};

const handleStipendChange = (event) => {
    setFormdata({...formdata, stipend: event.target.value})
};

  return (
    <div className="sm:px-4 bg-gray-50 md:py-12 md:px-36">
      <div className="w-full md:flex md:flex-row md:mb-8 justify-between ">
        <div className="my-8 md:my-0">
          <p className="ml-2">Internship Title</p>
          <InputField size="large" onChange={handletitleChange} value={formdata.title} placeholder="Internship Title" />
        </div>

        <div className="my-8 md:my-0">
          <p className="ml-2">Internship Type</p>
          <select
            defaultValue="select Internship Type"
            placeholder="Internship type"
            className="w-[250px] pl-3 h-[45px] border outline-none rounded-md border-gray-200"
            onChange={handletypeChange}
            value={formdata.type}
          >
            <option value={1}>Part Time</option>
            <option value={2}>Full Time</option>
          </select>
        </div>
      </div>


      <div className="w-full md:flex md:flex-row md:mb-8 justify-between ">
        <div className="my-8 md:my-0">
          <p className="ml-2">Location type</p>
          <select
            defaultValue="select Location Type"
            placeholder="Location type"
            className="w-[250px] pl-3 h-[45px] border outline-none rounded-md border-gray-200"
            onChange={handleLocTypeChange}
            value={formdata.locationType}
          >
            <option value={1}>Work From Home</option>
            <option value={2}>In Office</option>
          </select>
        </div>

        {formdata.locationType === 2 && 
          <div className="my-8 md:my-0">
            <p className="ml-2">Location</p>
            <InputField size="large" onChange={handleLocationChange} value={formdata.location} placeholder="Openings" />
          </div>
        }

        <div className="my-8 md:my-0">
          <p className="ml-2">No. of Openings</p>
          <InputField size="large" onChange={handleOpnChange} value={formdata.openings} placeholder="Openings" />
        </div>
      </div>

      {/* <div className="md:mb-8">
        <p>Internship Description</p>
        <InputField size="large" onChange={handleDescChange} value={formdata.description} placeholder="Internship description" />
      </div> */}

      <div className='w-full my-4'>
            <p className='ml-2'>Internship Description:</p>
            <div className="border">
            <Editor
                editorState={formdata.description}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={onEditorStateChange}
            />
            </div>
        </div>

      <div className="md:mb-8">
        <p>Intern's day-to-day responsibility</p>
        <InputField size="large" onChange={handleRespChange} value={formdata.resp} placeholder="Intern's responsibilities" />
      </div>

      <div className=" mt-4 md:mt-0 md:mb-8">
        <p>Required Skills</p>
        <InputField size="large" onChange={handleSkillChange} value={formdata.skills} placeholder="Add comma seperated skills" />
      </div>

      <div className="w-full md:flex md:flex-row md:mb-8 justify-between">
        <div className="my-8 md:my-0"> 
          <p className="ml-2">Stipend</p>
          <select
            defaultValue="select payment Type"
           placeholder="Payment type"
            className="w-[250px] pl-3 h-[45px] border outline-none rounded-md border-gray-200"
            value={formdata.stipend}
            onChange={handleStipendChange}
          >
            <option value={1}>Unpaid</option>
            <option value={2}>Fixed Stipend</option>
            <option value={3}>Performance Based</option>
          </select>
        </div>

        {formdata.stipend != 1 && 
          <div className="my-8 md:my-0">
            <p className="ml-2">Internship Title</p>
            <InputField size="large" onChange={handleSalaryChange} value={formdata.salary} placeholder="Stipend amount" />
          </div>
        }

      </div>

      <div className="w-full md:mb-8 md:flex md:flex-row justify-between ">
        <div className="my-8 md:my-0">
          <p className="ml-2">Incentives</p>
          <select
            defaultValue="Incentives"
            placeholder="Incentives"
            className="w-[250px] pl-3 h-[45px] border outline-none rounded-md border-gray-200"
            value={formdata.incentives}
            onChange={handleIncentivesChange}
          >
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </div>

        <div className="my-8 md:w-[300px] md:my-0">
          <p className="ml-2">Perks</p>
          <InputField size="large" value={formdata.perks} onChange={handlePerksChange} placeholder="Add comma seperated perks" />
        </div>
      </div>

      <div className="w-full md:flex md:flex-row md:items-center justify-between ">
        <div className="my-8 md:my-0">
          <p className="ml-2">Probation period</p>
          <select
            defaultValue="Probation Period"
            placeholder="Probation Period"
            className="w-[250px] pl-3 h-[45px] border outline-none rounded-md border-gray-200"
            value={formdata.probation}
            onChange={handleProbationChange}
          >
            <option value="No probation">No probation</option>
            <option value="1 week">1 week</option>
            <option value="2 week">2 weeks</option>
            <option value="3 week">3 weeks</option>
            <option value="1 month">1 month</option>
          </select>
        </div>

        <div className="my-8 md:my-0">
          <p className="ml-2">Probation salary</p>
          <InputField size="large" value={formdata.probationSalary} onChange={handleProbSalaryChange} placeholder="Probation salary" />
        </div>

        <div className="my-8 md:my-0">
          <p className="ml-2">Start Date</p>
          <select
            defaultValue="Start Date"
            placeholder="Start Date"
            className="w-[250px] pl-3 h-[45px] border outline-none rounded-md border-gray-200"
            value={formdata.startDate}
            onChange={handleDateChange}
          >
            <option value={0}>Immediately</option>
            <option value={1}>Next week</option>
            <option value={2}>After 2 weeks</option>
            <option value={3}>Next month</option>
          </select>
        </div>
      </div>

      <div className="w-full flex justify-center py-8">
        <button onClick={handleSubmit } className='border-2  mr-4 border-[#003979] text-[#003979] font-semibold px-12 py-2 mt-7 inline-block hover:bg-[#003979] hover:text-white'>ADD INTERNSHIP</button>
      </div>

    </div>
  );
};

export default Internshipform;