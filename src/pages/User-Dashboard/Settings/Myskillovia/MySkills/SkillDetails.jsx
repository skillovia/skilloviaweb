import { ChevronLeft, Edit, Star } from 'lucide-react';
import React from 'react'
import UserLayout from '../../../UserLayout/UserLayout';
import BackButton from '../../../../../componets/Back';

const SkillDetails = () => {
    return (
        <UserLayout>

        
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <header className="flex items-center justify-between mb-6">
           <BackButton label='Dog Walking' />
            <button className="px-4 py-2 text-white bg-red-600 rounded-md">
              Delete skill
            </button>
          </header>
    
          {/* Image Gallery */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="aspect-square rounded-lg overflow-hidden">
              <img
                src="https://res.cloudinary.com/dmhvsyzch/image/upload/v1733911582/958d3c3fcfaf510ff7bda481f103d10e_zqshfn.jpg"
                alt="Dog walking in forest"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-square rounded-lg overflow-hidden">
              <img
                src="https://res.cloudinary.com/dmhvsyzch/image/upload/v1736675545/49bb166c64fe8b5ed4a14b52d7fa0540_godgpk.jpg"
                alt="Person with dog"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-square rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
              <div className="text-center">
                <div className="w-8 h-8 mx-auto mb-2 text-gray-400">Add</div>
                <span className="text-gray-500">Add</span>
              </div>
            </div>
          </div>
    
          {/* Service Info */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-medium">Dog walking</h2>
              <Edit className="w-4 h-4 text-gray-500" />
            </div>
            <div className="flex items-center gap-1 mb-2">
              <span className="text-sm text-gray-600">Experience level: Expert</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4].map((n) => (
                  <Star key={n} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
                <Star className="w-4 h-4 text-gray-300" />
              </div>
            </div>
            <p className="text-gray-600 mb-4">
              Hey there! I&apos;m a dedicated dog lover ready to take your furry friend on exciting walks. With a genuine passion for pets and a commitment to their well-being, I&apos;ll ensure your pets the exercise and care they deserve. I may not be a designer, but I bring enthusiasm and...
            </p>
            
            {/* Hourly Rate */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium mb-2">Hourly rate</h3>
              <p className="text-gray-600">£20 - 2 spark tokens</p>
            </div>
          </div>
    
          {/* Reviews */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-medium">Reviews (120)</h2>
              <button className="text-secondary text-sm">See all</button>
            </div>
            {[1, 2].map((n) => (
              <div key={n} className="mb-4 p-4 bg-input border border-gray rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-medium">Winifred Stamm</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((star) => (
                      <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600">
                  Iure voluptatem dicta necessitatibus cupiditate ut. In nulla consequatur voluptatibus voluptatem fugiat non voluptas dicta. Animi commodi delectus sapiente Accusantus...
                </p>
              </div>
            ))}
          </div>
        </div>
        </UserLayout>
      );
}

export default SkillDetails


