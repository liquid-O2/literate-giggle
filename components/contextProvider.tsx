'use client'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../firebase/config'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import handleErrors from '../firebase/errorHandler'
import { UseFormResetField, UseFormSetError } from 'react-hook-form'
import { Inputs } from './authForm'
import { useRouter } from 'next/navigation'
import {
  arrayRemove,
  arrayUnion,
  doc,
  DocumentData,
  DocumentReference,
  getDoc,
  onSnapshot,
  setDoc,
  Unsubscribe,
  updateDoc,
} from 'firebase/firestore'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context'
import { id } from '../jest.config'

type GlobalContext = {
  signIn: (
    email: string,
    password: string,
    setError: UseFormSetError<Inputs>,
    resetField: UseFormResetField<Inputs>
  ) => Promise<void>
  signUp: (
    email: string,
    password: string,
    setError: UseFormSetError<Inputs>,
    resetField: UseFormResetField<Inputs>,
    setIsRegister: Dispatch<SetStateAction<boolean>>
  ) => Promise<void>
  isLoggedIn: boolean
  userDetails: UserDetails
  router: AppRouterInstance
  teas: Teas[]
  updateUser: (type: 'add' | 'delete', data: string, field: string) => void
}

export type Teas = {
  name: string
  id: string
  attributes: Array<string>
  image: string
  price: string
  featured?: boolean
  fullImage?: string
  description?: string
}

type UserDetails = {
  uid: string | null
  likedTeas: Array<string>
}

export const GlobalContext = React.createContext<GlobalContext>(null!)

const ContextProviders = ({ children, fetchedTeas }: { children: React.ReactNode; fetchedTeas: Teas[] }) => {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userDetails, setUserDetails] = useState<UserDetails>({ uid: null, likedTeas: [''] })

  const teas = fetchedTeas

  // user collection related
  useEffect(() => {
    let removeSnapshot: Unsubscribe = () => {}
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userRef = doc(db, 'users', `${user.uid}`)
        const checkIfExists = async () => {
          const docs = await getDoc(userRef)
          if (!docs.exists()) {
            setDoc(userRef, { userID: user.uid, likedTeas: arrayUnion('') }, { merge: true })
          }
        }
        removeSnapshot = onSnapshot(userRef, { includeMetadataChanges: true }, (data) => {
          const userInfo = data.data()
          setUserDetails((prevInfo) => ({ ...prevInfo, ...userInfo, uid: user.uid }))
        })
        checkIfExists()
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
      }

      return () => {
        removeSnapshot()
      }
    })
  }, [])

  const userRef = doc(db, 'users', `${userDetails.uid}`)
  const updateUser = (type: 'add' | 'delete', data: string, field: string) => {
    if (type === 'add') {
      return updateDoc(userRef, { [field]: arrayUnion(data) })
    }
    return updateDoc(userRef, { [field]: arrayRemove(data) })
  }

  // firebase auth helpers
  const signIn = async (
    email: string,
    password: string,
    setError: UseFormSetError<Inputs>,
    resetField: UseFormResetField<Inputs>
  ) => {
    await signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        router.push('/')
        resetField('email')
        resetField('password')
      })
      .catch((error) => {
        handleErrors(error.message, setError)
      })
  }

  const signUp = async (
    email: string,
    password: string,
    setError: UseFormSetError<Inputs>,
    resetField: UseFormResetField<Inputs>,
    setIsRegister: Dispatch<SetStateAction<boolean>>
  ) => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        setIsRegister(false)
        router.push('/')
        resetField('email')
        resetField('password')
      })
      .catch((error) => {
        handleErrors(error.message, setError)
      })
  }

  const globalContext = {
    signIn,
    signUp,
    isLoggedIn,
    userDetails,
    router,
    teas,
    updateUser,
  }

  return <GlobalContext.Provider value={globalContext}>{children}</GlobalContext.Provider>
}

export default ContextProviders
