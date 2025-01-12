
import { ArrowLeft,  Upload } from 'lucide-react';
import UserLayout from '../../UserLayout/UserLayout';
import BackButton from '../../../../componets/Back';


const BookingForm = () => {
  return (
    <UserLayout>

   
    <div className="max-w-4xl mx-auto px-4  rounded-lg">
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-6">
      <BackButton label='Book service' />
         
          <button className="ml-auto px-6 font-semibold py-2 bg-primary  text-secondary rounded-full hover:bg-green-500">
            Next
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Skill</label>
            <input
              type="text"
              value="Dog Walking"
              disabled
              className="w-full p-3 bg-input border border-gray rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              className="w-full p-3 bg-input border border-gray rounded-lg min-h-[100px]"
              placeholder="I want you to walk my dog for a few hours, he's a German Shepard and likes treats."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Location</label>
            <input
              type="text"
              placeholder="Search location"
              className="w-full p-3 bg-input border border-gray rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Date</label>
            <input
              type="text"
              placeholder="DD/MM/YY"
              className="w-full p-3 bg-input border border-gray rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Upload Image</label>
            <div className="bg-input border border-gray rounded-lg p-8 text-center">
              <Upload className="w-6 h-6 mx-auto mb-2 text-gray-400" />
              <p className="text-sm text-gray-600">Click to upload image</p>
              <p className="text-xs text-gray-400 mt-1">SVG, PNG, or JPG</p>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium mb-4">Summary</h3>
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="font-medium">Dog Walking</p>
                <p className="text-sm text-gray-600">23 Sept 2022 - 12:39 AM</p>
              </div>
              <p className="font-medium">£2,300</p>
            </div>
            <div className="flex justify-between items-center mb-4">
              <p>Service charge</p>
              <p>£400</p>
            </div>
            <div className="flex justify-between items-center font-medium">
              <p>Total</p>
              <p>£2,700</p>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-4">Payment method</h3>
            <div className="space-y-4">
              <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg cursor-pointer">
                <input type="radio" name="payment" className="w-4 h-4" />
                <span>Debit/Credit Card</span>
              </label>
              <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg cursor-pointer">
                <input type="radio" name="payment" className="w-4 h-4" />
                <span>Barter service</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
    </UserLayout>
  );
};

export default BookingForm