import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import { iState } from '../models/State'
import { iTheme } from '../models/Theme'
import { changeTheme } from '../store/actions/theme'

const ThemeSwitch: FC = () => {
  const dispatch = useDispatch()
  const theme = useSelector<iState, iTheme>(state => state.theme)
  const isDark = theme === iTheme.dark
  const handlePressTheme = () => dispatch(changeTheme(isDark ? iTheme.light : iTheme.dark))

  return (
    <Switch>
      <Input
        type='checkbox'
        onChange={handlePressTheme}
        checked={isDark}
        data-testid='theme_switch_input'
      />
      <Slider />
    </Switch>
  )
}

const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 45px;
  height: 24px;
`

const Input = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
  outline: none;

  &:checked + span {
    background-color: ${props => props.theme.text};

    &::before {
      transform: translateX(20px);
    }
  }

  &:focus + span {
    box-shadow: 0 0 1px ${props => props.theme.text};
  }
`

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${props => props.theme.text};
  transition: .4s;
  border-radius: 34px;

  &::before {
    position: absolute;
    content: "";
    height: 20px;
    width: 20px;
    left: 2px;
    bottom: 2px;
    background-color: ${props => props.theme.background};
    border-radius: 50%;
    -webkit-transition: .4s;
    transition: .4s;
  }
`

export { ThemeSwitch }
