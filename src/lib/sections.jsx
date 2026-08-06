import { createContext, useCallback, useContext, useMemo, useState } from 'react'

export const SECTION_IDS = ['manifesto', 'projeler', 'hizmetler', 'iletisim']

const noop = () => {}

const SectionsContext = createContext({
  openMap: {},
  toggle: noop,
  openSection: noop,
})

export function SectionsProvider({ children }) {
  const [openMap, setOpenMap] = useState(() =>
    SECTION_IDS.reduce((acc, id) => {
      acc[id] = true
      return acc
    }, {})
  )

  const toggle = useCallback((id) => {
    setOpenMap((prev) => ({ ...prev, [id]: !prev[id] }))
  }, [])

  const openSection = useCallback((id) => {
    setOpenMap((prev) => (prev[id] ? prev : { ...prev, [id]: true }))
  }, [])

  const value = useMemo(() => ({ openMap, toggle, openSection }), [openMap, toggle, openSection])

  return <SectionsContext.Provider value={value}>{children}</SectionsContext.Provider>
}

export function useSectionsContext() {
  return useContext(SectionsContext)
}

export function useSection(id) {
  const { openMap, toggle } = useSectionsContext()
  const isOpen = openMap[id] ?? true
  return [isOpen, useCallback(() => toggle(id), [toggle, id])]
}
