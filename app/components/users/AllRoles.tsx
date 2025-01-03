'use client'

import { useGetRoles } from '@/app/hooks/auth'
import React, { useEffect } from 'react'

const AllRoles = () => {
  const { data: allRoles } = useGetRoles()
  useEffect(() => {
    console.log(`allRoles: ${JSON.stringify(allRoles)}`)
  }, [allRoles])
  return (
    <div>AllRoles</div>
  )
}

export default AllRoles