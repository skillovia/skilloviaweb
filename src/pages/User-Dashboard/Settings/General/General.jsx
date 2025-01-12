
import {  Lock, UserCircle, ShieldCheck,  ArrowRight } from 'lucide-react';

const General = () => {

    const menuItems = [
        {
          icon: <Lock className="w-5 h-5" />,
          label: 'Security',
          link: '/settings/security'
        },
        {
          icon: <UserCircle className="w-5 h-5" />,
          label: 'Payment Settings',
          link: '/settings/payment'
        },
        {
          icon: <ShieldCheck className="w-5 h-5" />,
          label: 'Notification Settings',
          link: '/settings/notify'
        },

        // {
        //     icon: <ShieldCheck className="w-5 h-5" />,
        //     label: 'Apperance',
        //     link: '/settingsc'
        //   },


          {
            icon: <ShieldCheck className="w-5 h-5" />,
            label: 'Linked Devices',
            link: '/settings/devices'
          },
        
      ];
  return (
   
    <section>
    {menuItems.map((item, index) => (
            <a
              key={index}
              href={item.link}
              className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                {item.icon}
                <span className="text-gray-700">{item.label}</span>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 text-secondary" />
            </a>
          ))}
        
    </section>
  )
}

export default General
