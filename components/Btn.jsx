'use client'
import Link from 'next/link'
import React from 'react'

function Btn({title, href}) {
  return (
    <button className='btn rounded-2xl py-3 px-5 text-xl font-medium'>
        <Link href={href}>{title}</Link>
    </button>
  )
}

export default Btn