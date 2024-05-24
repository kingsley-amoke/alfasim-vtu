import { alertPropsTypes } from '@/lib/types'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/lib/ui/alert-dialog'
import { Button } from '@/lib/ui/button'
import React from 'react'


const ConfirmationPopUp = ({info}: {info : alertPropsTypes}) => {

  return (
    <AlertDialog>
    <AlertDialogTrigger asChild>
      <Button
      onClick={() => info.buttonProps.onClick ? info.buttonProps.onClick : undefined}
        variant="outline"
        disabled={info.buttonProps.loading ? true : false}
        className={`text-teal-800 rounded-md md:w-1/5   ${
          info.buttonProps.loading
            ? "bg-gray-400"
            : "bg-white cursor-pointer hover:bg-teal-800 hover:border-white hover:text-white"
        }`}
      >
        {info.buttonProps.title}
      </Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>{info.headerProps.title}!!</AlertDialogTitle>
        <AlertDialogDescription>
          {info.headerProps.description}
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel
          onClick={() => info.onCancel()}
          className="mt-5"
        >
          Cancel
        </AlertDialogCancel>
        <AlertDialogAction
          onClick={() => info.onConfirm()}
          className="border rounded-md cursor-pointer bg-teal-800 hover:border-white text-white w-full"
        >
          Confirm
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
  )
}

export default ConfirmationPopUp
