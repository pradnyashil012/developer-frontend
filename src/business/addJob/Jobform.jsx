import React from "react";
import InputField from "../InputField";

import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw} from 'draft-js';
// import draftToHtml from 'draftjs-to-html';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const Jobform = ({formdata, setFormdata, handleSubmit}) => {

  // let editorState = EditorState.createEmpty();
  let editorState = EditorState.createEmpty();

  const onEditorStateChange = (editorState) => {
    setFormdata({...formdata, description: editorState})
  }

  // const onEditorStateChange = (editorState) => {
  //   formdata.setDescription(editorState);
  // }

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

  return (
    <div className="sm:px-4 bg-gray-50 md:py-12 md:px-36">
      <div className="w-full md:flex md:flex-row md:mb-8 justify-between ">
        <div className="my-8 md:my-0">
          <p className="ml-2">Job Title</p>
          <InputField value={formdata.title} onChange={handletitleChange} placeholder="Job Title" />
        </div>

        <div className="my-8 md:my-0">
          <p className="">Job Type</p>
          <select value={formdata.type} onChange={handletypeChange} className="w-[250px] pl-3 h-[45px] border outline-none rounded-md border-gray-200">
            <option value={1}>Part Time</option>
            <option value={2}>Full Time</option>
            <option value={3}>Contract</option>
          </select>
        </div>
      </div>

      {formdata.type===3 && 
        <div className="my-8 md:my-0 md:mb-8">
          <p className="ml-2">Contract Duration</p>
          <select
            placeholder="Contract Duration"
            value={formdata.contractDuration}
            onChange={handleCDurationChange}
            className="w-[250px] pl-3 h-[45px] border outline-none rounded-md border-gray-200"
          >
            <option value={1}>1 month</option>
            <option value={2}>2 months</option>
            <option value={3}>3 months</option>
            <option value={6}>6 months</option>
            <option value={9}>9 months</option>
            <option value={12}>1 year</option>
          </select>
        </div>
      }

      <div className="w-full md:flex md:flex-row md:mb-8 justify-between">
        <div className="my-8 md:my-0">
          <p className="ml-2">Location type</p>
        <select
          defaultValue="select Location Type"
          placeholder="Location type"
          className="w-[250px] pl-3 h-[45px] border outline-none rounded-md border-gray-200"
          value={formdata.locationType}
          onChange={handleLocTypeChange}
        >
          <option value={1}>Work From Home</option>
          <option value={2}>In Office</option>
        </select>
        </div>

        {formdata.locationType === 2 &&
          <div className="my-8 md:my-0">
            <p className="ml-2">Location</p>
            <InputField value={formdata.location} onChange={handleLocationChange} placeholder="Location" />
          </div>
        }


      </div>

      <div className="w-full md:flex md:mb-8 md:flex-row md:items-center justify-between ">
        <div className="my-8 md:my-0">
          <p className="ml-2">Number of openings</p>
          <InputField size="large" value={formdata.openings} onChange={handleOpnChange} placeholder="Openings" />
        </div>

        <div className="my-8 md:my-0">
          <p className="ml-2">Experience</p>
          <select
            defaultValue="Your Experience"
            placeholder="Experience"
            className="w-[250px] pl-3 h-[45px] border outline-none rounded-md border-gray-200"
            value={formdata.experience}
            onChange={handleExpChange}
          >
            <option value="Fresher">Fresher</option>
            <option value="3 months">3 Months</option>
            <option value="6 months">6 Months</option>
            <option value="1 year">1 Year</option>
            <option value="2 years">2 Year</option>
            <option value="3 years">3 Year</option>
            <option value="4 years">4 Year</option>
            <option value="5 years">5 Year</option>
          </select>
        </div>

        <div className="my-8 md:my-0">
          <p className="ml-2">CTC upto</p>
          <InputField size="large" value={formdata.ctc} onChange={handlectcChange} placeholder="CTC" />
        </div>
      </div>

      {/* <div className="md:mb-8">
        <p>Job Description</p>
        <InputField size="large" value={formdata.description} onChange={handleDescChange} placeholder="Job description" />
      </div> */}

      <div className='w-full my-4'>
            <p className='ml-2'>Job Description:</p>
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
        <p>Required Skills</p>
        <InputField size="large" value={formdata.skills} onChange={handleSkillChange} placeholder="Add comma seperated skills" />
      </div>

      <div className="w-full md:flex md:flex-row md:mb-8 justify-between">
        <div className="my-8 md:my-0">
          <p className="ml-2">Payment type</p>
          <select
            defaultValue="select payment Type"
            placeholder="Payment type"
            className="w-[250px] pl-3 h-[45px] border outline-none rounded-md border-gray-200"
            value={formdata.payType}
            onChange={handlePayTypeChange}
          >
            <option value={1}>Fixed Pay</option>
            <option value={2}>Variable Pay</option>
          </select>
        </div>

        <div className="my-8 md:my-0">
          <p>Salary</p>
          <InputField size="large" value={formdata.salary} onChange={handleSalaryChange} placeholder="Salary" />
        </div>

        
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
            <option value="No Probation">No probation</option>
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
        <button onClick={handleSubmit } className='border-2  mr-4 border-[#003979] text-[#003979] font-semibold px-12 py-2 mt-7 inline-block hover:bg-[#003979] hover:text-white'>ADD JOB</button>
      </div>
      
    </div>
  );
};

export default Jobform;