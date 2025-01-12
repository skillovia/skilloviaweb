import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserLayout from '../../../../UserLayout/UserLayout';
import BackButton from '../../../../../../componets/Back';

const skills = [
  "Electrical Services",
  "Laundry",
  "Fast Foods",
  "Food Bowls",
  "Make up",
  "Grocery Shopping",
  "Fashion Designer"
];

const experienceLevels = [
  { title: "Beginner", description: "I'm learning basics and exploring" },
  { title: "Intermediate", description: "I have some experience in the past" },
  { title: "Expert", description: "I've done thi for years" }
];

export default function AddSkill() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    skill: '',
    experienceLevel: '',
    description: '',
    hourlyRate: '5.00'
  });

  const handleSkillSelect = (skill) => {
    setFormData(prev => ({ ...prev, skill }));
  };

  const handleExperienceSelect = (level) => {
    setFormData(prev => ({ ...prev, experienceLevel: level }));
  };

  const handleNext = () => {
    setStep(prev => prev + 1);
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = async () => {
    try {
      // Add your API call here to submit the form data
      // For example:
      // await axios.post('/api/skills', formData);
      
      // Navigate to settings page after successful submission
      navigate('/settings/skills');
    } catch (error) {
      console.error('Error submitting form:', error);
      // Add error handling as needed
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="w-full">
            <div className="flex items-center mb-4">
              <button onClick={handleBack} className="p-2">
                <BackButton label='Add skill'/>
              </button>
              
              <button
                onClick={handleNext}
                className="ml-auto bg-primary text-secondary font-medium px-4 py-3 rounded-full text-sm"
              >
                Next, Experience level
              </button>
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search skills"
                className="w-full p-3 rounded-lg bg-input border-gray border"
              />
            </div>
            <h3 className="mb-4 text-lg font-medium">Select your skill</h3>
            <div className="space-y-2">
              {skills.map((skill) => (
                <div
                  key={skill}
                  onClick={() => handleSkillSelect(skill)}
                  className="flex items-center p-4 rounded-lg border border-gray bg-input cursor-pointer hover:bg-gray-100"
                >
                  <span>{skill}</span>
                  <div className={`ml-auto w-6 h-6 rounded-full border-2 ${
                    formData.skill === skill ? 'bg-green-500 border-green-500' : 'border-gray-300'
                  }`}>
                    {formData.skill === skill && (
                      <div className="flex items-center justify-center h-full">
                        <span className="text-white">✓</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="w-full">
            <div className="flex items-center mb-4">
              <button onClick={handleBack} className="p-2">
                <BackButton label='Select Experince'/>
              </button>
              
              <button
                onClick={handleNext}
                className="ml-auto bg-primary text-secondary font-medium px-4 py-3 rounded-full text-sm"
              >
                Next, Description
              </button>
            </div>
            <h3 className="mb-4 text-lg font-medium">What's your experience level?</h3>
            <div className="space-y-2">
              {experienceLevels.map((level) => (
                <div
                  key={level.title}
                  onClick={() => handleExperienceSelect(level.title)}
                  className="flex items-center p-4 rounded-lg border-gray bg-input border cursor-pointer hover:bg-gray-100"
                >
                  <div>
                    <div className="font-medium">{level.title}</div>
                    <div className="text-sm text-gray-500">{level.description}</div>
                  </div>
                  <div className={`ml-auto w-6 h-6 rounded-full border-2 ${
                    formData.experienceLevel === level.title ? 'bg-green-500 border-green-500' : 'border-gray-300'
                  }`}>
                    {formData.experienceLevel === level.title && (
                      <div className="flex items-center justify-center h-full">
                        <span className="text-white">✓</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="w-full">
            <div className="flex items-center mb-4">
              <button onClick={handleBack} className="p-2">
                <BackButton label='Add a Description' />
              </button>
            
              <button
                onClick={handleNext}
                className="ml-auto bg-primary px-4 py-2 text-secondary rounded-full text-sm"
              >
                Next, Hourly rate
              </button>
            </div>
            <h3 className="mb-4 text-lg font-medium">Sell yourself to clients</h3>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Enter a description..."
              className="w-full h-40 p-4 rounded-lg border border-gray bg-input resize-none"
            />
          </div>
        );

      case 4:
        return (
          <div className="w-full">
            <div className="flex items-center mb-4">
              <button onClick={handleBack} className="p-2">
                <BackButton label='Set your rate' />
              </button>
           
              <button
                onClick={handleSubmit}
                className="ml-auto bg-primary text-secondary px-4 py-2 rounded-full text-sm"
              >
                Done
              </button>
            </div>
            <h3 className="mb-4 text-lg font-medium">Set your hourly/token rate.</h3>
            <div className="relative">
              <input
                type="number"
                value={formData.hourlyRate}
                onChange={(e) => setFormData(prev => ({ ...prev, hourlyRate: e.target.value }))}
                className="w-full p-3 border border-gray bg-input rounded-lg bg-gray-50"
                step="0.01"
                min="0"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">/hr</span>
            </div>
            <div className="mt-2 text-sm text-gray-500">
              2.5 Spark tokens
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <UserLayout>
      <div className="max-w-4xl mx-auto px-4">
        {renderStep()}
      </div>
    </UserLayout>
  );
}