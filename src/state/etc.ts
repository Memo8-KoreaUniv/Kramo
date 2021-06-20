import { atom } from 'recoil'

export const menuCollapsedState = atom<boolean>({
  key: 'menuCollapsed',
  default: false,
})

export const subTitleState = atom<string>({
  key: 'subTitleState',
  default: '',
})
