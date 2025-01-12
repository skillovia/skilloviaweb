import { ArrowLeft, Star } from 'lucide-react'
import React from 'react'
import UserLayout from '../../UserLayout/UserLayout'
import BackButton from '../../../../componets/Back'
import { Link } from 'react-router-dom'

const BookService = () => {
  return (
    <UserLayout>
          <div className="max-w-4xl mx-auto px-4 rounded-lg">
        <div className="flex items-center gap-4 mb-6">
        <BackButton   label=' Dog walking'/>
        
          <Link to ="/book-form" className="ml-auto px-4 py-1 bg-book rounded-full hover:bg-yellow-200">
            Book
          </Link>
        </div>
  
        <div className=" flex overflow-x-auto lg:grid lg:grid-cols-3  gap-4 mb-8">
          <img 
            src="https://res.cloudinary.com/dmhvsyzch/image/upload/v1736675548/958d3c3fcfaf510ff7bda481f103d10e_1_tl3nmj.jpg" 
            alt="Service 1"
            className="w-full h-48 object-cover rounded-lg"
          />
          <img 
            src="https://res.cloudinary.com/dmhvsyzch/image/upload/v1736675545/49bb166c64fe8b5ed4a14b52d7fa0540_godgpk.jpg" 
            alt="Service 2"
            className="w-full h-48 object-cover rounded-lg"
          />
          <img 
            src="https://res.cloudinary.com/dmhvsyzch/image/upload/v1736675544/35491114a5caefecbb4babd7d87e50a7_bpvbx5.jpg" 
            alt="Service 3"
            className="w-full h-48 object-cover rounded-lg"
          />
        </div>
  
        <div className="mb-8">
          <h2 className="font-semibold mb-2">Description</h2>
          <p className="text-gray-600">
            Passionate about creativity and innovation, this individual thrives on exploring
            new ideas and pushing boundaries. With a love for nature and travel, they find
            inspiration in the world around them. A dedicated lifelong learner, they are all...
          </p>
        </div>
  
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <span className="text-gray-600">Expert</span>
          </div>
          <div className="flex items-center gap-4 text-gray-600">
            <div className="flex items-center gap-2">
              <span>Hourly rate</span>
              <span className="font-semibold">£20</span>
            </div>
            <span>•</span>
            <span>2 spark tokens</span>
          </div>
        </div>
  
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Reviews (120)</h2>
            <button className="text-secondary hover:underline">See all</button>
          </div>
          <div className="space-y-4">
            {[1, 2].map((review) => (
              <div key={review} className="bg-input border-gray border  p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-medium">Winifred Stamm</span>
                  <div className="flex gap-1">
                    {[...Array(3)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600">
                  Iure voluptatem dicta necessitatibus cupiditate ut. In nulla consequatur voluptatibus
                  voluptatem fugiat non voluptas dicta. Animi commodi dolectus sapiente. Accusantiu...
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </UserLayout>
  )
}

export default BookService


