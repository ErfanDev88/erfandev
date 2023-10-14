import React, { createContext, useState } from 'react'
import weblearn from '../public/assets/weblearn.png'

const workContext = createContext()

function WorkSample({children}) {
    
    const workSamplesData = useState([
        {
            imageSrc: weblearn,
            title: 'سایت وب لرن',
            description: 'یه سایت آموزش برنامه نویسی',
            btnTitle: 'مشاهده وب سایت',
            btnHref: 'weblearn.iran.liara.run'
        }
    ])

  return (
    <workContext.Provider value={workSamplesData}>
        {children}
    </workContext.Provider>
  )
}

export default WorkSample