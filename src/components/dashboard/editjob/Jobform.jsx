import React from "react";
import Input from 'antd/lib/input/Input';
import Select from 'antd/lib/select';
import { Option } from 'antd/lib/mentions';

const Jobform = () => {
  return (
    <div className="sm:px-4 bg-gray-50 md:py-12 md:px-36">
      <div className="w-full md:flex md:flex-row md:mb-8 justify-between ">
        <div className="my-8 md:my-0">
          <p className="ml-2">Job Title</p>
          <Input size="large" placeholder="Job Title" />
        </div>

        <div className="my-8 md:my-0">
          <p className="ml-2">Job Type</p>
          <Select
            defaultValue="Select Job Type"
            placeholder="Job type"
            className="w-[210px]"
          >
            <Option value="Part time">Part Time</Option>
            <Option value="Full time">Full Time</Option>
            <Option value="Contract">Contract</Option>
          </Select>
        </div>
      </div>

      <div className="my-8 md:my-0 md:mb-8">
        <p className="ml-2">Location type</p>
        <Select
          defaultValue="Select Location Type"
          placeholder="Location type"
          className="w-[210px]"
        >
          <Option value="Work from home">Work From Home</Option>
          <Option value="In Office">In Office</Option>
        </Select>
      </div>

      <div className="w-full md:flex md:mb-8 md:flex-row md:items-center justify-between ">
        <div className="my-8 md:my-0">
          <p className="ml-2">Number of openings</p>
          <Input size="large" placeholder="Openings" />
        </div>

        <div className="my-8 md:my-0">
          <p className="ml-2">Experience</p>
          <Select
            defaultValue="Your Experience"
            placeholder="Experience"
            className="w-[210px]"
          >
            <Option value="Part time">Fresher</Option>
            <Option value="Full time">3 Months</Option>
            <Option value="Contract">6 Months</Option>
            <Option value="Contract">1 Year</Option>
            <Option value="Contract">2 Year</Option>
            <Option value="Contract">3 Year</Option>
            <Option value="Contract">4 Year</Option>
            <Option value="Contract">5 Year</Option>
          </Select>
        </div>

        <div className="my-8 md:my-0">
          <p className="ml-2">CTC upto</p>
          <Input size="large" placeholder="CTC" />
        </div>
      </div>

      <div className="md:mb-8">
        <p>Job Description</p>
        <Input size="large" placeholder="Job description" />
      </div>

      <div className="md:mb-8">
        <p>Required Skills</p>
        <Input size="large" placeholder="Add comma seperated skills" />
      </div>

      <div className="my-8 md:mb-8">
        <p className="ml-2">Payment type</p>
        <Select
          defaultValue="Select payment Type"
          placeholder="Payment type"
          className="w-[210px]"
        >
          <Option value="Fixed Pay">Fixed Pay</Option>
          <Option value="Variable pay">Variable Pay</Option>
        </Select>
      </div>

      <div className="w-full md:mb-8 md:flex md:flex-row justify-between ">
        <div className="my-8 md:my-0">
          <p className="ml-2">Incentives</p>
          <Select
            defaultValue="Incentives"
            placeholder="Incentives"
            className="w-[210px]"
          >
            <Option value="Yes">Yes</Option>
            <Option value="No">No</Option>
          </Select>
        </div>

        <div className="my-8 md:w-[300px] md:my-0">
          <p className="ml-2">Perks</p>
          <Input size="large" placeholder="Add comma seperated perks" />
        </div>
      </div>

      <div className="w-full md:flex md:flex-row md:items-center justify-between ">
        <div className="my-8 md:my-0">
          <p className="ml-2">Probation period</p>
          <Select
            defaultValue="Probation Period"
            placeholder="Probation Period"
            className="w-[210px]"
          >
            <Option value="No Probation">No probation</Option>
            <Option value="1 week">1 week</Option>
            <Option value="2 week">2 weeks</Option>
            <Option value="3 week">3 weeks</Option>
            <Option value="1 Month">1 month</Option>
          </Select>
        </div>

        <div className="my-8 md:my-0">
          <p className="ml-2">Probation salary</p>
          <Input size="large" placeholder="Probation salary" />
        </div>

        <div className="my-8 md:my-0">
          <p className="ml-2">Start Date</p>
          <Select
            defaultValue="Start Date"
            placeholder="Start Date"
            className="w-[210px]"
          >
            <Option value="Immediately">Immediately</Option>
            <Option value="Next week">Next week</Option>
            <Option value="After 2 weeks">After 2 weeks</Option>
            <Option value="Next month">Next month</Option>
          </Select>
        </div>
      </div>

      <div className="w-full flex justify-center py-8">
        <button className='border-2  mr-4 border-[#003979] text-[#003979] font-semibold px-12 py-2 mt-7 inline-block hover:bg-[#003979] hover:text-white'>ADD JOB</button>
      </div>
      
    </div>
  );
};

export default Jobform;