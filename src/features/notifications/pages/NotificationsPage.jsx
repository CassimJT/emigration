import React from 'react'
import NotificationsHeader from '../components/NotificationsHeader'
import NotificationsContent from '../components/NotificationsContent'


export function NotificationsPage() {

  // this has both use for just a popup bell and a full page
  //final choice will be made during deployment

  return (
    <div className="container mx-auto max-w-4xl px-4 py-6 sm:py-8 md:py-10">

      

      <NotificationsHeader />

      
      
      <div className="mt-6 sm:mt-8">
        <NotificationsContent />
      </div>
    </div>
  )

}

export default NotificationsPage;