import React from 'react';
import Button from './Button'; // Adjust the import path based on your file structure
import { Phone, Mail, Heart, Settings } from 'lucide-react'; // Import any icons you want to use

import { Home, User } from 'lucide-react'; // If you want to use icons
import FileUpload from './Upload';
import { Input, TextArea, Select } from './Input';
import {  Building } from 'lucide-react';



const ExamplePage = () => {
  // Example click handler
  const handleClick = () => {
    console.log('Button clicked!');
  };

  const handleFileSelect = (file) => {
    // Do something with the file
    console.log('Selected file:', file);
    
    // Example: Read the file as a data URL
    const reader = new FileReader();
    reader.onload = (e) => {
      console.log('File contents:', e.target.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
    <div className="grid grid-cols-6 gap-4 p-4">
      {/* Basic button */}
      <Button onClick={handleClick}>
        Click Me
      </Button>

      {/* Different variants */}
      <Button variant="primary">Primary Button</Button>
      <Button variant="secondary">Secondary Button</Button>
      <Button variant="danger">Danger Button</Button>

      {/* Outline Button */}
      <Button variant="outline">Outline Button</Button>

      {/* With icons */}
      <Button icon={<Phone className="h-4 w-4" />}>
        Call Now
      </Button>

      <Button icon={<Mail className="h-4 w-4" />} iconPosition="right">
        Send Email
      </Button>

      {/* Loading state */}
      <Button isLoading>
        Loading...
      </Button>

      {/* Disabled state */}
      <Button disabled>
        Can't Click Me
      </Button>

      {/* Full width button with custom className */}
      <Button className="w-full bg-purple-600 hover:bg-purple-700">
        Custom Styled Button
      </Button>
    </div>



 
    <div className="p-4">
      <Tabs defaultValue="home">
        {/* Tab Headers */}
        <TabsList>
          <TabsTrigger value="home">
            <Home className="w-4 h-4 mr-2" />
            Home
          </TabsTrigger>
          <TabsTrigger value="profile">
            <User className="w-4 h-4 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </TabsTrigger>
        </TabsList>

        {/* Tab Contents */}
        <TabsContent value="home">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">Welcome Home</h2>
            <p>This is your dashboard home content.</p>
          </div>
        </TabsContent>

        <TabsContent value="profile">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">User Profile</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input 
                  type="text" 
                  className="w-full p-2 border rounded"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input 
                  type="email" 
                  className="w-full p-2 border rounded"
                  placeholder="Enter your email"
                />
              </div>
            </form>
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">Settings</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Notifications</span>
                <input type="checkbox" />
              </div>
              <div className="flex items-center justify-between">
                <span>Dark Mode</span>
                <input type="checkbox" />
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>


    <FileUpload    onFileSelect={handleFileSelect} />

    {/* input */}

    <section className="bl px-[4rem] my-20">

  

    <Input
            label="Company"
            name="company"
            placeholder="Enter your company name"
         className='bg-green-600'
            icon={Building}
          />

<Input
            label="Full Name"
            name="fullName"
            placeholder="Enter your full name"
        
            icon={User}
            required
          />

          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="Enter your email"
        
            icon={Mail}
            required
          />
        

       
          <Input
            label="Phone Number"
            name="phone"
            placeholder="Enter your phone number"
        
            icon={Phone}
          />



    <TextArea
          label="Description"
          name="description"
          placeholder="Tell us about yourself or your project"
         
        />


<Select
          label="Role"
          name="role"
       
          options={[
            { value: '', label: 'Select your role' },
            { value: 'developer', label: 'Developer' },
            { value: 'designer', label: 'Designer' },
            { value: 'manager', label: 'Manager' },
            { value: 'other', label: 'Other' }
          ]}
        />

</section>

    </>
  );
};

export default ExamplePage;






