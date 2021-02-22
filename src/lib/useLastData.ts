import { useRef } from 'react'

export const useLastData = <S>(data: S) => {
  const ref = useRef(data)

  if (data != null) {
    ref.current = data
  }

  return ref.current
}
